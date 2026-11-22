import { CommandInteraction } from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
import { enterReply, giveawayErrorText, viewFromDto } from '../../util/giveaways.js';

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
    const params = { guildId: interaction.guildId, giveawayId: args.giveaway };

    let result;
    try {
      ({ data: result } = await api.giveaways.enterGiveaway(params, {
        userId: interaction.user.id,
        displayName: interaction.member.displayName
      }));
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't enter you. Try again."));
    }
    this.client.giveawayManager.scheduleRefresh(params.guildId, params.giveawayId);

    // The reply's wording depends on the mode. If that lookup fails, the entry still counts.
    const giveaway = await api.giveaways
      .getGiveaway(params)
      .then((res) => res.data)
      .catch(() => null);
    if (!giveaway) return interaction.editReply("You're in! 🎉");

    const view = viewFromDto(giveaway);
    view.clanNames = await this.client.giveawayManager.clanNames(params.guildId, view.eligibility);
    return interaction.editReply(enterReply(result, view));
  }
}
