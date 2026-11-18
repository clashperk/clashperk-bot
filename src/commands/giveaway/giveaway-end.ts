import { Settings } from '@app/constants';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
import { refFromDto } from '../../struct/giveaway-manager.js';
import { giveawayAutocomplete } from '../../util/giveaway-autocomplete.js';
import { giveawayErrorText } from '../../util/giveaways.js';

export default class GiveawayEndCommand extends Command {
  public constructor() {
    super('giveaway-end', {
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
      const { data: result } = await api.giveaways.drawGiveaway({
        guildId,
        giveawayId: args.giveaway
      });
      await this.client.giveawayManager.renderEnded(
        refFromDto(giveaway),
        result.winners,
        result.entryCount
      );
      return interaction.editReply(
        result.winners.length
          ? `Drawn. Winners: ${result.winners.map((id) => `<@${id}>`).join(', ')}`
          : 'Drawn. There were no valid entries.'
      );
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't draw this giveaway."));
    }
  }
}
