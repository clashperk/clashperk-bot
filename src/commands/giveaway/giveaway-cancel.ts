import { Settings } from '@app/constants';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
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

  /** The scheduler sees the cancel and updates the message. */
  public async exec(interaction: CommandInteraction<'cached'>, args: { giveaway: string }) {
    try {
      await api.giveaways.cancelGiveaway({
        guildId: interaction.guildId,
        giveawayId: args.giveaway
      });
      return interaction.editReply('Giveaway cancelled.');
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't cancel this giveaway."));
    }
  }
}
