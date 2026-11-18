import { Settings } from '@app/constants';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
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

  /** The scheduler sees the draw and updates the message, the same as for a timed or dashboard draw. */
  public async exec(interaction: CommandInteraction<'cached'>, args: { giveaway: string }) {
    try {
      const { data } = await api.giveaways.drawGiveaway({
        guildId: interaction.guildId,
        giveawayId: args.giveaway
      });
      return interaction.editReply(
        data.winners.length
          ? `Drawn. Winners: ${data.winners.map((id) => `<@${id}>`).join(', ')}`
          : 'Drawn. There were no valid entries.'
      );
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't draw this giveaway."));
    }
  }
}
