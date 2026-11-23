import { Collections } from '@app/constants';
import { GiveawaysEntity } from '@app/entities';
import { Collection } from 'mongodb';
import { api } from '../api/axios.js';
import { Client } from './client.js';

/** A new giveaway is posted from its insert event. The sweep only catches ones that missed it. */
const UNPOSTED_GRACE = 30 * 1000;

/** Fields an edit can change that the posted message shows. */
const SHOWN_FIELDS = ['prize', 'title', 'description', 'winnerCount', 'endsAt', 'eligibility'];

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
        if (!giveaway || !this.owns(giveaway)) return;

        // Every draw, reroll and cancel renders here, whether the bot or the dashboard made it.
        const updated =
          change.operationType === 'update' ? change.updateDescription.updatedFields : {};
        if (giveaway.status === 'ended' && updated && 'winners' in updated) {
          this.client.giveawayManager.renderEnded(giveaway);
        }
        if (giveaway.status === 'cancelled' && updated?.status === 'cancelled') {
          this.client.giveawayManager.renderCancelled(giveaway);
        }
        if (giveaway.status !== 'active') return;

        if (!giveaway.messageId) this.client.giveawayManager.post(giveaway);
        else if (Object.keys(updated ?? {}).some(isShownField)) {
          this.client.giveawayManager.scheduleRefresh(giveaway.guild, giveaway._id.toHexString());
        }
        if (giveaway.endsAt.getTime() < Date.now() + this.refreshRate) this.queue(giveaway);
      }
    );

    await this._refresh();
    setInterval(this._refresh.bind(this), this.refreshRate).unref();
  }

  /**
   * Only the cluster that holds the server acts. A giveaway made in Discord belongs to the bot that
   * made it. A dashboard one goes to the server's custom bot, or to ClashPerk.
   */
  private owns(giveaway: Pick<GiveawaysEntity, 'guild' | 'applicationId'>) {
    if (!this.client.guilds.cache.has(giveaway.guild)) return false;
    if (giveaway.applicationId) return giveaway.applicationId === this.client.user.id;
    return !(this.client.settings.hasCustomBot(giveaway.guild) && !this.client.isCustom());
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

  /** Draws it. The draw's update event renders the result, like any other draw. */
  private async trigger(giveawayId: string, guildId: string) {
    this.clear(giveawayId);
    try {
      await api.giveaways.drawGiveaway({ guildId, giveawayId });
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
      if (!this.owns(giveaway)) continue;
      if (!giveaway.messageId) this.client.giveawayManager.post(giveaway);
      if (this.queued.has(giveaway._id.toHexString())) continue;

      if (giveaway.endsAt.getTime() < now) this.trigger(giveaway._id.toHexString(), giveaway.guild);
      else if (giveaway.endsAt.getTime() < now + this.refreshRate) this.queue(giveaway);
    }
  }
}

/** Matches `eligibility` and dotted paths under it, such as `eligibility.clanTags`. */
function isShownField(path: string) {
  return SHOWN_FIELDS.some((field) => path === field || path.startsWith(`${field}.`));
}
