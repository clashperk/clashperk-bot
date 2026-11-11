import { Collections } from '@app/constants';
import { TicketEntity, TicketGuildSettingsEntity, TicketPanelEntity } from '@app/entities';
import {
  CategoryChannel,
  ContainerBuilder,
  Guild,
  MessageFlags,
  TextChannel,
  TextDisplayBuilder
} from 'discord.js';
import { ObjectId, WithId } from 'mongodb';
import type { Client } from './client.js';

const REDIS_KEY = (channelId: string) => `ticket:autosleep:${channelId}`;

const STAFF_ALLOW = {
  ViewChannel: true,
  SendMessages: true,
  AttachFiles: true,
  EmbedLinks: true,
  ReadMessageHistory: true,
  ManageMessages: true,
  ManageChannels: true
};
const VIEWER_ALLOW = { ViewChannel: true, SendMessages: true, ReadMessageHistory: true };

export class TicketHandler {
  public constructor(private readonly client: Client) {}

  public init() {
    setInterval(() => this.processSleepQueue(), 5 * 60 * 1000);
  }

  private get tickets() {
    return this.client.db.collection<TicketEntity>(Collections.TICKETS);
  }

  public async getPanel(guildId: string, name: string) {
    return this.client.db
      .collection<TicketPanelEntity>(Collections.TICKET_PANELS)
      .findOne({ guildId, name });
  }

  private async getPanelAndType(ticket: TicketEntity) {
    const panel = await this.client.db
      .collection<TicketPanelEntity>(Collections.TICKET_PANELS)
      .findOne({ _id: new ObjectId(ticket.panelId) });
    return { panel, btn: panel?.ticketTypes.find((t) => t.id === ticket.buttonId) };
  }

  /** Atomic per-guild counter. `$max` seeds it from existing tickets the first time. */
  public async nextTicketCount(guildId: string) {
    const latest = await this.tickets.findOne(
      { guildId },
      { sort: { count: -1 }, projection: { count: 1 } }
    );
    const settings = await this.client.db
      .collection<TicketGuildSettingsEntity>(Collections.TICKET_SETTINGS)
      .findOneAndUpdate(
        { guildId },
        [
          {
            $set: {
              guildId,
              ticketCount: {
                $add: [{ $max: [{ $ifNull: ['$ticketCount', 0] }, latest?.count ?? 0] }, 1]
              }
            }
          }
        ],
        { upsert: true, returnDocument: 'after' }
      );
    return settings!.ticketCount!;
  }

  public async setAutoSleepCache(channelId: string, creatorId: string, autoSleepHours: number) {
    await this.client.redis.connection.set(REDIS_KEY(channelId), `${creatorId}:${autoSleepHours}`, {
      EX: autoSleepHours * 60 * 60
    });
  }

  public async resetAutoSleep(channelId: string, userId: string) {
    const raw = await this.client.redis.connection.get(REDIS_KEY(channelId));
    if (!raw) return;

    const [creatorId, hoursStr] = raw.split(':');
    if (creatorId !== userId) return;

    const hours = Number(hoursStr);
    await this.client.redis.connection.expire(REDIS_KEY(channelId), hours * 60 * 60);
  }

  /** Closes the record of a ticket whose channel was deleted outside the bot. */
  public async markChannelDeleted(channelId: string) {
    const ticket = await this.tickets.findOneAndUpdate(
      { channelId, status: { $ne: 'closed' } },
      {
        $set: { status: 'closed', closedAt: new Date(), updatedAt: new Date() },
        $unset: { autoSleepAt: '' }
      }
    );
    if (!ticket) return;

    await this.client.redis.connection.del(REDIS_KEY(channelId));
    const guild = this.client.guilds.cache.get(ticket.guildId);
    const { panel, btn } = await this.getPanelAndType(ticket);
    await this.logStatusChange(panel, ticket, 'Closed', ticket.status, 'closed', null);
    if (!guild) return;
    await this.revertCreatorRoles(guild, ticket, btn);
    await this.notifySubscribers(guild, ticket, 'was closed (its channel was deleted)');
  }

  public async closeTicket(
    ticket: WithId<TicketEntity>,
    channel: TextChannel,
    closedBy: string,
    reply: (text: string) => Promise<unknown>
  ) {
    const { panel, btn } = await this.getPanelAndType(ticket);
    await reply('Closing ticket… generating transcript.');

    const transcript = await this.generateTranscript(channel);
    await this.tickets.updateOne(
      { _id: ticket._id },
      {
        $set: { status: 'closed', closedAt: new Date(), closedBy, updatedAt: new Date() },
        $unset: { autoSleepAt: '' }
      }
    );
    await this.client.redis.connection.del(REDIS_KEY(ticket.channelId));
    await this.revertCreatorRoles(channel.guild, ticket, btn);

    const logChannel = panel?.logChannels.ticketClose
      ? (channel.guild.channels.cache.get(panel.logChannels.ticketClose) as TextChannel | undefined)
      : undefined;
    await logChannel
      ?.send({
        components: [
          new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
              [
                `## Ticket Closed — #${this.ticketNumber(ticket)}`,
                `**Created by:** <@${ticket.creatorId}>`,
                `**Closed by:** <@${closedBy}>`,
                `**Created at:** <t:${Math.floor(ticket.createdAt.getTime() / 1000)}:F>`
              ].join('\n')
            )
          )
        ],
        flags: MessageFlags.IsComponentsV2,
        files: [
          { attachment: Buffer.from(transcript, 'utf-8'), name: `ticket-${ticket.count}.txt` }
        ],
        allowedMentions: { parse: [] }
      })
      .catch(() => null);

    await this.logStatusChange(panel, ticket, 'Closed', ticket.status, 'closed', closedBy);
    await this.notifySubscribers(channel.guild, ticket, 'was closed');
    setTimeout(() => channel.delete('Ticket closed').catch(() => null), 3000);
  }

  /** `sleptBy` is null for auto-sleep. */
  public async sleepTicket(
    ticket: WithId<TicketEntity>,
    channel: TextChannel,
    sleptBy: string | null
  ) {
    const { panel, btn } = await this.getPanelAndType(ticket);

    await channel.permissionOverwrites
      .edit(ticket.creatorId, { SendMessages: false, ViewChannel: true })
      .catch(() => null);

    const sleepCat = btn?.sleepCategoryId
      ? (channel.guild.channels.cache.get(btn.sleepCategoryId) as CategoryChannel | undefined)
      : undefined;
    if (sleepCat) await channel.setParent(sleepCat, { lockPermissions: false }).catch(() => null);

    await this.tickets.updateOne(
      { _id: ticket._id },
      { $set: { status: 'sleep', updatedAt: new Date() }, $unset: { autoSleepAt: '' } }
    );
    await this.client.redis.connection.del(REDIS_KEY(ticket.channelId));

    await channel
      .send({
        content: sleptBy
          ? `Ticket put to sleep by <@${sleptBy}>. Staff can use \`/ticket reopen\` to restore access.`
          : `Ticket automatically put to sleep. No reply from <@${ticket.creatorId}> in ${btn?.autoSleepHours ?? 24} hours.`,
        allowedMentions: { parse: [] }
      })
      .catch(() => null);

    await this.logStatusChange(panel, ticket, 'Slept', 'open', 'sleep', sleptBy);
    await this.notifySubscribers(channel.guild, ticket, 'was put to sleep');
  }

  public async reopenTicket(
    ticket: WithId<TicketEntity>,
    channel: TextChannel,
    reopenedBy: string
  ) {
    const { panel, btn } = await this.getPanelAndType(ticket);

    await channel.permissionOverwrites
      .edit(ticket.creatorId, { SendMessages: true, ViewChannel: true })
      .catch(() => null);

    const openCat = btn?.openCategoryId
      ? (channel.guild.channels.cache.get(btn.openCategoryId) as CategoryChannel | undefined)
      : undefined;
    if (openCat) await channel.setParent(openCat, { lockPermissions: false }).catch(() => null);

    if (ticket.claimedBy) {
      await this.removeClaimerAccess(channel, ticket);
      await this.restoreStaffAccess(channel, btn);
    }

    const autoSleepHours = btn?.autoSleepHours;
    await this.tickets.updateOne(
      { _id: ticket._id },
      {
        $set: {
          status: 'open',
          updatedAt: new Date(),
          ...(autoSleepHours
            ? { autoSleepAt: new Date(Date.now() + autoSleepHours * 60 * 60 * 1000) }
            : {})
        },
        $unset: { claimedBy: '', ...(autoSleepHours ? {} : { autoSleepAt: '' }) }
      }
    );
    if (autoSleepHours) {
      await this.setAutoSleepCache(ticket.channelId, ticket.creatorId, autoSleepHours);
    }

    await channel
      .send({ content: `Ticket reopened by <@${reopenedBy}>.`, allowedMentions: { parse: [] } })
      .catch(() => null);
    await this.logStatusChange(panel, ticket, 'Reopened', 'sleep', 'open', reopenedBy);
    await this.notifySubscribers(channel.guild, ticket, 'was reopened');
  }

  /** A claimer who opened the ticket keeps their creator access, minus the staff permissions. */
  public async removeClaimerAccess(channel: TextChannel, ticket: TicketEntity) {
    if (!ticket.claimedBy) return;
    if (ticket.claimedBy === ticket.creatorId) {
      await channel.permissionOverwrites
        .edit(ticket.creatorId, { ManageChannels: null, ManageMessages: null })
        .catch(() => null);
    } else {
      await channel.permissionOverwrites.delete(ticket.claimedBy).catch(() => null);
    }
  }

  public async restoreStaffAccess(
    channel: TextChannel,
    btn: { pingRoleIds?: string[]; viewOnlyRoleIds?: string[] } | undefined
  ) {
    for (const roleId of btn?.pingRoleIds ?? []) {
      await channel.permissionOverwrites.edit(roleId, STAFF_ALLOW).catch(() => null);
    }
    for (const roleId of btn?.viewOnlyRoleIds ?? []) {
      await channel.permissionOverwrites.edit(roleId, VIEWER_ALLOW).catch(() => null);
    }
  }

  /** Undoes the role changes the ticket type made when the ticket opened. */
  private async revertCreatorRoles(
    guild: Guild,
    ticket: TicketEntity,
    btn: { addRoleIds?: string[]; removeRoleIds?: string[] } | undefined
  ) {
    if (!btn?.addRoleIds?.length && !btn?.removeRoleIds?.length) return;
    const member = await guild.members.fetch(ticket.creatorId).catch(() => null);
    if (!member) return;

    for (const roleId of btn.addRoleIds ?? []) {
      await member.roles.remove(roleId).catch(() => null);
    }
    for (const roleId of btn.removeRoleIds ?? []) {
      await member.roles.add(roleId).catch(() => null);
    }
  }

  private async notifySubscribers(guild: Guild, ticket: TicketEntity, change: string) {
    const content = `Ticket #${this.ticketNumber(ticket)} in **${guild.name}** ${change}.`;
    for (const userId of ticket.notifyMeUserIds ?? []) {
      await this.client.users.send(userId, { content }).catch(() => null);
    }
  }

  public ticketNumber(ticket: TicketEntity) {
    return String(ticket.count).padStart(4, '0');
  }

  /** `byUserId` is null when the bot acted on its own. */
  public async logStatusChange(
    panel: TicketPanelEntity | null,
    ticket: TicketEntity,
    action: string,
    oldStatus: string | null,
    newStatus: string,
    byUserId: string | null
  ) {
    if (!panel?.logChannels.statusChange) return;

    const guild = this.client.guilds.cache.get(ticket.guildId);
    const logChannel = guild?.channels.cache.get(panel.logChannels.statusChange) as
      TextChannel | undefined;
    if (!logChannel) return;

    await logChannel
      .send({
        components: [
          new ContainerBuilder().addTextDisplayComponents(
            new TextDisplayBuilder().setContent(
              [
                `## Ticket ${action}`,
                `**Ticket:** #${this.ticketNumber(ticket)} <#${ticket.channelId}>`,
                `**By:** ${byUserId ? `<@${byUserId}>` : 'ClashPerk'} | **Status:** ${oldStatus ? `${oldStatus} → ${newStatus}` : newStatus}`
              ].join('\n')
            )
          )
        ],
        flags: MessageFlags.IsComponentsV2,
        allowedMentions: { parse: [] }
      })
      .catch(() => null);
  }

  private async generateTranscript(channel: TextChannel) {
    const messages = await channel.messages.fetch({ limit: 100 }).catch(() => null);
    if (!messages) return '(could not fetch messages)';

    const lines = [...messages.values()].reverse().map((m) => {
      const time = m.createdAt.toISOString();
      const content = m.content || (m.embeds.length ? '[embed]' : '[attachment/sticker]');
      return `[${time}] ${m.author.username}: ${content}`;
    });

    return [
      `Transcript for #${channel.name}`,
      `Generated: ${new Date().toISOString()}`,
      '='.repeat(60),
      ...lines
    ].join('\n');
  }

  private async processSleepQueue() {
    const guildIds = [...this.client.guilds.cache.keys()];
    const tickets = await this.tickets
      .find({ guildId: { $in: guildIds }, status: 'open', autoSleepAt: { $lte: new Date() } })
      .toArray();

    for (const ticket of tickets) {
      const raw = await this.client.redis.connection.get(REDIS_KEY(ticket.channelId));

      if (raw) {
        // The creator replied, which pushed the Redis TTL out. Move autoSleepAt to match.
        const hours = Number(raw.split(':')[1]);
        const ttl = await this.client.redis.connection.ttl(REDIS_KEY(ticket.channelId));
        await this.tickets.updateOne(
          { _id: ticket._id },
          {
            $set: {
              autoSleepAt: new Date(Date.now() + (ttl > 0 ? ttl : hours * 60 * 60) * 1000),
              updatedAt: new Date()
            }
          }
        );
        continue;
      }

      const guild = this.client.guilds.cache.get(ticket.guildId);
      if (!guild?.available) continue;

      const channel = guild.channels.cache.get(ticket.channelId) as TextChannel | undefined;
      if (!channel) {
        await this.markChannelDeleted(ticket.channelId).catch(() => null);
        continue;
      }
      await this.sleepTicket(ticket, channel, null).catch(() => null);
    }
  }
}
