import { Collections } from '@app/constants';
import { TicketEntity } from '@app/entities';
import { CommandInteraction, TextChannel } from 'discord.js';
import { Args, Command } from '../../lib/handlers.js';

export default class TicketSleepCommand extends Command {
  public constructor() {
    super('ticket-sleep', {
      category: 'tickets',
      channel: 'guild',
      userPermissions: ['ManageChannels'],
      clientPermissions: ['ManageChannels', 'EmbedLinks', 'SendMessages'],
      defer: true,
      ephemeral: true
    });
  }

  public args(): Args {
    return {};
  }

  public async exec(interaction: CommandInteraction<'cached'>) {
    const ticket = await this.client.db
      .collection<TicketEntity>(Collections.TICKETS)
      .findOne({ channelId: interaction.channelId, status: 'open' });

    if (!ticket) {
      return interaction.editReply({
        content: 'This command can only be used inside an open ticket channel.'
      });
    }

    await this.client.tickets.sleepTicket(
      ticket,
      interaction.channel as TextChannel,
      interaction.user.id
    );
    await interaction.editReply({ content: 'Ticket is now sleeping.' });
  }
}
