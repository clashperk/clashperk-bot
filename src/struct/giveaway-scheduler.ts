import { Collections } from '@app/constants';
import { GiveawaysEntity } from '@app/entities';
import { Collection } from 'mongodb';
import { api } from '../api/axios.js';
import { Client } from './client.js';
import { refFromDto } from './giveaway-manager.js';

/** A new giveaway is posted from its insert event. The sweep only catches ones that missed it. */
const UNPOSTED_GRACE = 30 * 1000;

export class GiveawayScheduler {
  private readonly giveaways: Collection<GiveawaysEntity>;
  private readonly refreshRate = 5 * 60 * 1000;
  private readonly queued = new Map<string, NodeJS.Timeout>();

  public constructor(private readonly client: Client) {
    this.giveaways = this.client.db.collection(Collections.GIVEAWAYS);
  }

  public async init() {
    this.client.changeStreams.on<GiveawaysEntity>(
      Collections.GIVEAWAYS,
      { operationType: { $in: ['insert', 'update', 'delete'] } },
      (change) => {
        if (change.operationType === 'delete') {
          this.clear(change.documentKey._id.toHexString());
          return;
        }
        if (change.operationType !== 'insert' && change.operationType !== 'update') return;

        this.clear(change.documentKey._id.toHexString());
        const giveaway = change.fullDocument;
        if (giveaway?.status !== 'active' || !this.owns(giveaway.guild)) return;

        if (!giveaway.messageId) this.client.giveawayManager.post(giveaway);
        if (giveaway.endsAt.getTime() < Date.now() + this.refreshRate) this.queue(giveaway);
      }
    );

    await this._refresh();
    setInterval(this._refresh.bind(this), this.refreshRate).unref();
  }

  /** Only the cluster that holds the server acts, and a custom bot takes over from the main one. */
  private owns(guildId: string) {
    if (!this.client.guilds.cache.has(guildId)) return false;
    return !(this.client.settings.hasCustomBot(guildId) && !this.client.isCustom());
  }

  private queue(giveaway: GiveawaysEntity) {
    const id = giveaway._id.toHexString();
    this.queued.set(
      id,
      setTimeout(
        () => this.trigger(id, giveaway.guild),
        Math.max(0, giveaway.endsAt.getTime() - Date.now())
      )
    );
  }

  private clear(id: string) {
    const timeout = this.queued.get(id);
    if (timeout) clearTimeout(timeout);
    this.queued.delete(id);
  }

  private async trigger(giveawayId: string, guildId: string) {
    this.clear(giveawayId);
    try {
      const { data } = await api.giveaways.drawGiveaway({ guildId, giveawayId });
      // Read it again: the timer can be armed before the message was posted.
      const { data: giveaway } = await api.giveaways.getGiveaway({ guildId, giveawayId });
      await this.client.giveawayManager.renderEnded(
        refFromDto(giveaway),
        data.winners,
        data.entryCount
      );
    } catch (error) {
      // 409 means a manual /giveaway end already drew it. Nothing to do.
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status !== 409) this.client.logger.error(error, { label: 'GIVEAWAY' });
    }
  }

  private async _refresh() {
    if (this.client.inMaintenance) return;

    const now = Date.now();
    const cursor = this.giveaways.find({
      status: 'active',
      $or: [
        { endsAt: { $lt: new Date(now + this.refreshRate) } },
        { messageId: null, createdAt: { $lt: new Date(now - UNPOSTED_GRACE) } }
      ]
    });

    for await (const giveaway of cursor) {
      if (!this.owns(giveaway.guild)) continue;
      if (!giveaway.messageId) this.client.giveawayManager.post(giveaway);
      if (this.queued.has(giveaway._id.toHexString())) continue;

      if (giveaway.endsAt.getTime() < now) this.trigger(giveaway._id.toHexString(), giveaway.guild);
      else if (giveaway.endsAt.getTime() < now + this.refreshRate) this.queue(giveaway);
    }
  }
}
