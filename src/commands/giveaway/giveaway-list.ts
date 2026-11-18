import { Settings } from '@app/constants';
import { CommandInteraction, time, TimestampStyles } from 'discord.js';
import { api } from '../../api/axios.js';
import { Command } from '../../lib/handlers.js';
import { giveawayErrorText } from '../../util/giveaways.js';

export default class GiveawayListCommand extends Command {
  public constructor() {
    super('giveaway-list', {
      category: 'setup',
      channel: 'guild',
      userPermissions: ['ManageGuild'],
      roleKey: Settings.GIVEAWAY_MANAGER_ROLE,
      defer: true,
      ephemeral: true
    });
  }

  public async exec(interaction: CommandInteraction<'cached'>) {
    try {
      const { data } = await api.giveaways.listGiveaways({
        guildId: interaction.guildId,
        status: 'active'
      });
      if (!data.giveaways.length) {
        return interaction.editReply('No active giveaways right now.');
      }

      const lines = data.giveaways.slice(0, 20).map((giveaway) => {
        const ends = time(new Date(giveaway.endsAt), TimestampStyles.RelativeTime);
        const entries = `${giveaway.entryCount} ${giveaway.entryCount === 1 ? 'entry' : 'entries'}`;
        const where = giveaway.messageId
          ? `https://discord.com/channels/${interaction.guildId}/${giveaway.channelId}/${giveaway.messageId}`
          : `<#${giveaway.channelId}>`;
        return `**${giveaway.prize}** — ends ${ends} · ${entries}\n${where}`;
      });

      return interaction.editReply(lines.join('\n\n'));
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't list the giveaways."));
    }
  }
}
