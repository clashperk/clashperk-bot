import { DMChannel, NonThreadGuildBasedChannel } from 'discord.js';
import { Listener } from '../../lib/handlers.js';

export default class TicketChannelDeleteListener extends Listener {
  public constructor() {
    super('ticketChannelDelete', {
      event: 'channelDelete',
      emitter: 'client',
      category: 'client'
    });
  }

  public async exec(channel: DMChannel | NonThreadGuildBasedChannel) {
    if (channel.isDMBased()) return;
    await this.client.tickets.markChannelDeleted(channel.id).catch(() => null);
  }
}
