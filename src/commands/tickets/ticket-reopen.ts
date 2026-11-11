import { Collections } from '@app/constants';
import { TicketEntity } from '@app/entities';
import { CommandInteraction, TextChannel } from 'discord.js';
import { Command } from '../../lib/handlers.js';

export default class TicketReopenCommand extends Command {
  public constructor() {
    super('ticket-reopen', {
      category: 'tickets',
      channel: 'guild',
      userPermissions: ['ManageChannels'],
      clientPermissions: ['ManageChannels', 'EmbedLinks', 'SendMessages'],
      defer: true,
      ephemeral: true
    });
  }

  public async exec(interaction: CommandInteraction<'cached'>) {
    const ticket = await this.client.db
      .collection<TicketEntity>(Collections.TICKETS)
      .findOne({ channelId: interaction.channelId, status: 'sleep' });

    if (!ticket) {
      return interaction.editReply({
        content: 'This command can only be used inside a sleeping ticket channel.'
      });
    }

    await this.client.tickets.reopenTicket(
      ticket,
      interaction.channel as TextChannel,
      interaction.user.id
    );
    await interaction.editReply({ content: 'Ticket has been reopened.' });
  }
}
