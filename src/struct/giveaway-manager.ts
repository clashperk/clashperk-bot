import { GiveawayEligibility, GiveawaysEntity } from '@app/entities';
import {
  AttachmentBuilder,
  DiscordAPIError,
  GuildTextBasedChannel,
  Message,
  MessageFlags,
  PermissionsString,
  RESTJSONErrorCodes
} from 'discord.js';
import { api } from '../api/axios.js';
import { GiveawayDto } from '../api/generated.js';
import {
  buildActiveGiveaway,
  buildEndedGiveaway,
  GIVEAWAY_BANNER_NAME,
  GiveawayView,
  viewFromDto,
  viewFromEntity,
  winnerAnnouncement
} from '../util/giveaways.js';
import { Client } from './client.js';

/** How long the live entry count may lag, so a busy giveaway doesn't hit Discord's rate limits. */
const COUNT_EDIT_DELAY = 5_000;

/** Posting failures that retrying can't fix, so the giveaway is cancelled instead. */
const UNPOSTABLE = new Set<number>([
  RESTJSONErrorCodes.UnknownChannel,
  RESTJSONErrorCodes.MissingAccess,
  RESTJSONErrorCodes.MissingPermissions
]);

export interface GiveawayRef {
  guildId: string;
  giveawayId: string;
  channelId: string;
  messageId: string | null;
  prize: string;
  eligibility: GiveawayEligibility;
}

export function refFromDto(giveaway: GiveawayDto): GiveawayRef {
  return {
    guildId: giveaway.guildId,
    giveawayId: giveaway.id,
    channelId: giveaway.channelId,
    messageId: giveaway.messageId,
    prize: giveaway.prize,
    eligibility: viewFromDto(giveaway).eligibility
  };
}

export class GiveawayManager {
  private readonly posting = new Set<string>();
  private readonly countEdits = new Map<string, NodeJS.Timeout>();

  public constructor(private readonly client: Client) {}

  /** Names of the chosen clans in the server's order. Empty when it's all clans or open. */
  public async clanNames(guildId: string, eligibility: GiveawayEligibility) {
    if (eligibility.mode === 'open' || eligibility.allGuildClans || !eligibility.clanTags?.length) {
      return [];
    }
    const chosen = new Set(eligibility.clanTags);
    const clans = await this.client.storage.find(guildId, { name: 1, tag: 1 });
    return clans.filter((clan) => chosen.has(clan.tag)).map((clan) => clan.name);
  }

  /** A channel ClashPerk can post in, or null. A banner also needs Attach Files, but it's optional. */
  public postableChannel(channelId: string): GuildTextBasedChannel | null {
    const channel = this.client.channels.cache.get(channelId);
    if (!channel?.isTextBased() || channel.isDMBased()) return null;
    const needed: PermissionsString[] = [
      'ViewChannel',
      channel.isThread() ? 'SendMessagesInThreads' : 'SendMessages'
    ];
    return channel.permissionsFor(this.client.user!)?.has(needed) ? channel : null;
  }

  /** Posts a giveaway that has no message yet, whether it came from Discord or the dashboard. */
  public async post(giveaway: GiveawaysEntity) {
    const giveawayId = giveaway._id.toHexString();
    if (giveaway.messageId || this.posting.has(giveawayId)) return;
    this.posting.add(giveawayId);

    const ref = { guildId: giveaway.guild, giveawayId };
    try {
      const channel = this.postableChannel(giveaway.channelId);
      if (!channel) return await this.cancelUnpostable(ref, 'no channel or permission');

      const view = viewFromEntity(
        giveaway,
        await this.clanNames(giveaway.guild, giveaway.eligibility)
      );
      const message = await this.send(channel, view);
      await api.giveaways.updateGiveaway(ref, { messageId: message.id });
    } catch (error) {
      if (error instanceof DiscordAPIError && UNPOSTABLE.has(Number(error.code))) {
        return await this.cancelUnpostable(ref, error.message);
      }
      // Anything else is retried by the scheduler's sweep while the message id is still unset.
      this.client.logger.error(error, { label: 'GIVEAWAY' });
    } finally {
      this.posting.delete(giveawayId);
    }
  }

  private async send(channel: GuildTextBasedChannel, view: GiveawayView) {
    if (view.imageUrl) {
      const posted = await channel
        .send({
          components: [buildActiveGiveaway(view)],
          files: [new AttachmentBuilder(view.imageUrl, { name: GIVEAWAY_BANNER_NAME })],
          flags: MessageFlags.IsComponentsV2
        })
        .catch(() => null);
      // A broken link, a non-image or a file too big: post without the banner rather than not at all.
      if (posted) return posted;
    }
    return channel.send({
      components: [buildActiveGiveaway({ ...view, imageUrl: null })],
      flags: MessageFlags.IsComponentsV2
    });
  }

  private async cancelUnpostable(ref: { guildId: string; giveawayId: string }, reason: string) {
    await api.giveaways.cancelGiveaway(ref).catch(() => null);
    this.client.logger.warn(`Giveaway ${ref.giveawayId} cancelled, can't post: ${reason}`, {
      label: 'GIVEAWAY'
    });
  }

  /** Updates the posted message's entry count, at most once per `COUNT_EDIT_DELAY`. */
  public scheduleCountUpdate(guildId: string, giveawayId: string) {
    if (this.countEdits.has(giveawayId)) return;
    const timeout = setTimeout(() => {
      this.countEdits.delete(giveawayId);
      this.refreshCount(guildId, giveawayId).catch((error) =>
        this.client.logger.error(error, { label: 'GIVEAWAY' })
      );
    }, COUNT_EDIT_DELAY);
    this.countEdits.set(giveawayId, timeout.unref());
  }

  private async refreshCount(guildId: string, giveawayId: string) {
    const { data: giveaway } = await api.giveaways.getGiveaway({ guildId, giveawayId });
    if (giveaway.status !== 'active' || !giveaway.messageId) return;
    const message = await this.fetchMessage(giveaway.channelId, giveaway.messageId);
    if (!message) return;

    const base = viewFromDto(giveaway);
    const view = { ...base, clanNames: await this.clanNames(guildId, base.eligibility) };
    // The edit sends no files, so the message keeps its banner. Point at it only if it was posted.
    const hasBanner = message.attachments.some((file) => file.name === GIVEAWAY_BANNER_NAME);
    await message.edit({
      components: [buildActiveGiveaway({ ...view, imageUrl: hasBanner ? view.imageUrl : null })],
      flags: MessageFlags.IsComponentsV2
    });
  }

  private async fetchMessage(channelId: string, messageId: string): Promise<Message | null> {
    const channel = this.client.channels.cache.get(channelId);
    if (!channel?.isTextBased() || channel.isDMBased()) return null;
    return channel.messages.fetch(messageId).catch(() => null);
  }

  /** Edits the posted message to its ended state and announces the winners. */
  public async renderEnded(ref: GiveawayRef, winners: string[], entryCount: number) {
    const channel = this.client.channels.cache.get(ref.channelId);
    if (!channel?.isTextBased() || channel.isDMBased()) return;

    const message = ref.messageId ? await this.fetchMessage(ref.channelId, ref.messageId) : null;
    await message
      ?.edit({
        components: [
          buildEndedGiveaway(
            { id: ref.giveawayId, prize: ref.prize, entryCount, eligibility: ref.eligibility },
            winners
          )
        ],
        attachments: [],
        flags: MessageFlags.IsComponentsV2
      })
      .catch(() => null);

    const text = winnerAnnouncement(ref.prize, winners);
    if (text) {
      await channel.send({ content: text, allowedMentions: { users: winners } }).catch(() => null);
    }
  }
}
