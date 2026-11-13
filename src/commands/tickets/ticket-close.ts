import { Collections } from '@app/constants';
import { TicketEntity } from '@app/entities';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  EmbedBuilder
} from 'discord.js';
import { Args, Command } from '../../lib/handlers.js';

export default class TicketCloseCommand extends Command {
  public constructor() {
    super('ticket-close', {
      category: 'tickets',
      channel: 'guild',
      userPermissions: ['ManageChannels'],
      clientPermissions: ['ManageChannels', 'EmbedLinks', 'SendMessages', 'ReadMessageHistory'],
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
      .findOne({ channelId: interaction.channelId, status: { $ne: 'closed' } });

    if (!ticket) {
      return interaction.editReply({
        content: 'This command can only be used inside an open ticket channel.'
      });
    }

    const confirmId = this.client.uuid(interaction.user.id);
    const cancelId = this.client.uuid(interaction.user.id);

    const embed = new EmbedBuilder()
      .setTitle('Close Ticket?')
      .setDescription('This will save a transcript to the log channel and delete this channel.')
      .setColor(0xeb3508);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(confirmId)
        .setLabel('Close Ticket')
        .setEmoji('🔒')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder().setCustomId(cancelId).setLabel('Cancel').setStyle(ButtonStyle.Secondary)
    );

    await interaction.editReply({ embeds: [embed], components: [row] });

    const action = await interaction
      .channel!.awaitMessageComponent({
        componentType: ComponentType.Button,
        filter: (a) =>
          [confirmId, cancelId].includes(a.customId) && a.user.id === interaction.user.id,
        time: 60_000
      })
      .catch(() => null);

    this.client.components.delete(confirmId);
    this.client.components.delete(cancelId);

    if (!action || action.customId === cancelId) {
      await (action ?? interaction).editReply({
        content: 'Cancelled.',
        embeds: [],
        components: []
      });
      return;
    }

    await action.deferUpdate();
    await this.client.tickets.closeTicket(ticket, interaction.user.id, (content) =>
      action.editReply({ content, embeds: [], components: [] })
    );
  }
}
