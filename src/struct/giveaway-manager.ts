import { MessageFlags } from 'discord.js';
import { buildEndedGiveaway, winnerAnnouncement } from '../util/giveaways.js';
import { Client } from './client.js';

export interface GiveawayRef {
  guildId: string;
  giveawayId: string;
  channelId: string;
  messageId: string | null;
  prize: string;
}

export class GiveawayManager {
  public constructor(private readonly client: Client) {}

  /** Edits the posted message to its ended state and announces the winners. */
  public async renderEnded(ref: GiveawayRef, winners: string[], entryCount: number) {
    const channel = this.client.channels.cache.get(ref.channelId);
    if (!channel?.isTextBased() || channel.isDMBased()) return;

    if (ref.messageId) {
      const message = await channel.messages.fetch(ref.messageId).catch(() => null);
      await message
        ?.edit({
          components: [
            buildEndedGiveaway({ id: ref.giveawayId, prize: ref.prize, entryCount }, winners)
          ],
          attachments: [],
          flags: MessageFlags.IsComponentsV2
        })
        .catch(() => null);
    }

    const text = winnerAnnouncement(ref.prize, winners);
    if (text) {
      await channel.send({ content: text, allowedMentions: { users: winners } }).catch(() => null);
    }
  }
}
