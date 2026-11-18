import { Settings } from '@app/constants';
import {
  AutocompleteInteraction,
  CommandInteraction,
  ContainerBuilder,
  MessageFlags,
  TextDisplayBuilder,
  escapeMarkdown
} from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
import { giveawayAutocomplete } from '../../util/giveaway-autocomplete.js';
import { giveawayErrorText } from '../../util/giveaways.js';

export default class GiveawayCancelCommand extends Command {
  public constructor() {
    super('giveaway-cancel', {
      category: 'setup',
      channel: 'guild',
      userPermissions: ['ManageGuild'],
      roleKey: Settings.GIVEAWAY_MANAGER_ROLE,
      defer: true,
      ephemeral: true
    });
  }

  public autocomplete(interaction: AutocompleteInteraction<'cached'>) {
    return giveawayAutocomplete(interaction, 'active');
  }

  public async exec(interaction: CommandInteraction<'cached'>, args: { giveaway: string }) {
    const guildId = interaction.guildId;
    try {
      const { data: giveaway } = await api.giveaways.getGiveaway({
        guildId,
        giveawayId: args.giveaway
      });
      await api.giveaways.cancelGiveaway({ guildId, giveawayId: args.giveaway });

      const channel = this.client.channels.cache.get(giveaway.channelId);
      if (channel?.isTextBased() && !channel.isDMBased() && giveaway.messageId) {
        const message = await channel.messages.fetch(giveaway.messageId).catch(() => null);
        const container = new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            `# 🚫 Giveaway cancelled\n## ${escapeMarkdown(giveaway.prize)}`
          )
        );
        await message
          ?.edit({ components: [container], attachments: [], flags: MessageFlags.IsComponentsV2 })
          .catch(() => null);
      }
      return interaction.editReply('Giveaway cancelled.');
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't cancel this giveaway."));
    }
  }
}
