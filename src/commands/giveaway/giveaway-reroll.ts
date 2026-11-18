import { Settings } from '@app/constants';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
import { giveawayAutocomplete } from '../../util/giveaway-autocomplete.js';
import { giveawayErrorText } from '../../util/giveaways.js';

export default class GiveawayRerollCommand extends Command {
  public constructor() {
    super('giveaway-reroll', {
      category: 'setup',
      channel: 'guild',
      userPermissions: ['ManageGuild'],
      roleKey: Settings.GIVEAWAY_MANAGER_ROLE,
      defer: true,
      ephemeral: true
    });
  }

  public autocomplete(interaction: AutocompleteInteraction<'cached'>) {
    return giveawayAutocomplete(interaction, 'ended');
  }

  public async exec(interaction: CommandInteraction<'cached'>, args: { giveaway: string }) {
    const guildId = interaction.guildId;
    try {
      const { data: giveaway } = await api.giveaways.getGiveaway({
        guildId,
        giveawayId: args.giveaway
      });
      const { data: result } = await api.giveaways.rerollGiveaway({
        guildId,
        giveawayId: args.giveaway
      });
      await this.client.giveawayManager.renderEnded(
        {
          guildId,
          giveawayId: giveaway.id,
          channelId: giveaway.channelId,
          messageId: giveaway.messageId,
          prize: giveaway.prize
        },
        result.winners,
        result.entryCount
      );
      return interaction.editReply(
        result.winners.length
          ? `Rerolled. New winners: ${result.winners.map((id) => `<@${id}>`).join(', ')}`
          : 'Rerolled. There were no valid entries left.'
      );
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't reroll this giveaway."));
    }
  }
}
