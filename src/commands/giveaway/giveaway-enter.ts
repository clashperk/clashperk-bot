import { CommandInteraction } from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
import { GIVEAWAY_ERROR_TEXT } from '../../util/giveaways.js';

export default class GiveawayEnterCommand extends Command {
  public constructor() {
    super('giveaway-enter', {
      category: 'setup',
      channel: 'guild',
      defer: true,
      ephemeral: true
    });
  }

  public async exec(interaction: CommandInteraction<'cached'>, args: { giveaway: string }) {
    try {
      const { data } = await api.giveaways.enterGiveaway(
        { guildId: interaction.guildId, giveawayId: args.giveaway },
        { userId: interaction.user.id }
      );
      const label = data.entryCount === 1 ? 'entry' : 'entries';
      return interaction.editReply(`You're in! 🎉 ${data.entryCount} ${label} so far.`);
    } catch (error) {
      const code = (error as { response?: { data?: { code?: string } } })?.response?.data?.code;
      return interaction.editReply(
        (code && GIVEAWAY_ERROR_TEXT[code]) || "I couldn't enter you. Try again."
      );
    }
  }
}
