import { Collections } from '@app/constants';
import { GiveawaysEntity } from '@app/entities';
import { Collection } from 'mongodb';
import { api } from '../api/axios.js';
import { Client } from './client.js';

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
          const id = change.documentKey._id.toHexString();
          if (this.queued.has(id)) this.clear(id);
          return;
        }

        if (change.operationType === 'insert' || change.operationType === 'update') {
          const id = change.documentKey._id.toHexString();
          if (this.queued.has(id)) this.clear(id);

          const giveaway = change.fullDocument;
          if (
            giveaway &&
            giveaway.status === 'active' &&
            giveaway.endsAt.getTime() < Date.now() + this.refreshRate
          ) {
            this.queue(giveaway);
          }
        }
      }
    );

    await this._refresh();
    setInterval(this._refresh.bind(this), this.refreshRate).unref();
  }

  private queue(giveaway: GiveawaysEntity) {
    if (this.client.settings.hasCustomBot(giveaway.guild) && !this.client.isCustom()) return;
    if (!this.client.guilds.cache.has(giveaway.guild)) return;

    this.queued.set(
      giveaway._id.toHexString(),
      setTimeout(() => this.trigger(giveaway), Math.max(0, giveaway.endsAt.getTime() - Date.now()))
    );
  }

  private clear(id: string) {
    const timeout = this.queued.get(id);
    if (timeout) clearTimeout(timeout);
    this.queued.delete(id);
  }

  private async trigger(giveaway: GiveawaysEntity) {
    const giveawayId = giveaway._id.toHexString();
    this.clear(giveawayId);
    try {
      const { data } = await api.giveaways.drawGiveaway({ guildId: giveaway.guild, giveawayId });
      await this.client.giveawayManager.renderEnded(
        {
          guildId: giveaway.guild,
          giveawayId,
          channelId: giveaway.channelId,
          messageId: giveaway.messageId,
          prize: giveaway.prize
        },
        data.winners,
        data.entryCount
      );
    } catch (error) {
      // 409 means a manual /giveaway end or another cluster already drew it. Nothing to do.
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status !== 409) this.client.logger.error(error, { label: 'GIVEAWAY' });
    }
  }

  private async _refresh() {
    if (this.client.inMaintenance) return;

    const cursor = this.giveaways.find({
      status: 'active',
      endsAt: { $lt: new Date(Date.now() + this.refreshRate) }
    });

    const now = Date.now();
    for await (const giveaway of cursor) {
      if (!this.client.guilds.cache.has(giveaway.guild)) continue;
      if (this.queued.has(giveaway._id.toHexString())) continue;
      if (this.client.settings.hasCustomBot(giveaway.guild) && !this.client.isCustom()) continue;

      if (giveaway.endsAt.getTime() < now) this.trigger(giveaway);
      else this.queue(giveaway);
    }
  }
}
