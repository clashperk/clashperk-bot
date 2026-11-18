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

  /** The scheduler sees the new winners, updates the message and announces them. */
  public async exec(interaction: CommandInteraction<'cached'>, args: { giveaway: string }) {
    try {
      const { data } = await api.giveaways.rerollGiveaway({
        guildId: interaction.guildId,
        giveawayId: args.giveaway
      });
      return interaction.editReply(
        data.winners.length
          ? `Rerolled. New winners: ${data.winners.map((id) => `<@${id}>`).join(', ')}`
          : 'Rerolled. There were no valid entries left.'
      );
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't reroll this giveaway."));
    }
  }
}
