import { Settings } from '@app/constants';
import { ClashLinkType, LinkParsingMode } from '@app/entities';
import { BaseMessageOptions, Message, PermissionFlagsBits } from 'discord.js';
import {
  canReply,
  ClashLink,
  findClashLinks,
  isOnlyClashLinks,
  linkModesFor,
  markShown,
  onlyClashLinks,
  recordReply,
  renderClashLinks,
  splitRepeats
} from '../../helper/clash-links.helper.js';
import { Command, Listener } from '../../lib/handlers.js';
import { countLinkCards } from '../../util/metrics.js';
import type LayoutCommand from '../../commands/search/layout-post.js';

export default class MessageCreateListener extends Listener {
  public constructor() {
    super('messageCreate', {
      event: 'messageCreate',
      emitter: 'client',
      category: 'client'
    });
  }

  public async exec(message: Message) {
    if (!message.inGuild()) return;
    if (message.author.bot) return;

    void this.client.tickets.resetAutoSleep(message.channelId, message.author.id);

    // Most messages stop here: nothing below runs unless ClashPerk is mentioned or links are on.
    const mentioned = message.mentions.users.has(this.client.user.id);
    const linkModes = mentioned ? null : linkModesFor(this.client, message.channel);
    if (!mentioned && !linkModes?.size) return;

    if (this.inhibitor(message)) return;

    if (
      message.channel.isThread() &&
      !message.channel
        .permissionsFor(this.client.user)
        ?.has(PermissionFlagsBits.SendMessagesInThreads)
    )
      return;

    if (
      !message.channel
        .permissionsFor(this.client.user)
        ?.has([PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel])
    )
      return;

    const found = findClashLinks(message.content);
    const links = linkModes ? found.filter((link) => linkModes.has(link.type)) : found;
    if (links.length) return this.expandLinks(message, links, linkModes);
    if (!mentioned) return;

    const parsed = [`<@${this.client.user.id}>`, `<@!${this.client.user.id}>`]
      .map((mention) => this.parseWithPrefix(message.content, mention))
      .find((_) => _);
    if (!parsed) return;

    const { command, content, contents } = parsed;
    if (!command) return;

    const resolved: Record<string, string> = {};
    const args = command.args();
    const keys = Object.keys(args);
    keys.forEach((key, idx) => (resolved[key] = contents[idx]));
    if (!keys.length) resolved.message = content;

    return this.executeCommand(message, command, resolved);
  }

  private async executeCommand(
    message: Message<true>,
    command: Command,
    args: Record<string, string>
  ) {
    if (command.ownerOnly && !this.client.isOwner(message.author.id)) {
      this.client.logger.log(`${command.id} ~ text-command`, {
        label: `${message.guild.name}/${message.author.displayName}`
      });
      return;
    }

    try {
      this.client.logger.debug(`${command.id}`, {
        label: `${message.guild.name}/${message.author.displayName}`
      });
      await command.run(message, args);
    } catch (error) {
      this.client.logger.error(`${command.id} ~ ${error.message}`, {
        label: `${message.guild.name}/${message.author.displayName}`
      });
      await message.channel.send('**Something went wrong while executing this command.**');
    }
  }

  /**
   * A mention asks for every link and always replies. Otherwise each type follows its own rule:
   * reply, post on its own, or post on its own and delete the member's message.
   */
  private async expandLinks(
    message: Message<true>,
    links: ClashLink[],
    modes: Map<ClashLinkType, LinkParsingMode> | null
  ) {
    if (this.client.settings.hasCustomBot(message.guild) && !this.client.isCustom()) return;

    const source = modes ? 'channel' : 'mention';
    const { fresh, repeated } = splitRepeats(message.channelId, links);
    countLinkCards(repeated, source, 'repeated');
    if (!fresh.length) return;

    const memberKey = `${message.guildId}:${message.author.id}`;
    if (!canReply(message.channelId, memberKey)) {
      return countLinkCards(fresh, source, 'rate_limited');
    }
    recordReply(message.channelId, memberKey);

    const permissions = message.channel.permissionsFor(this.client.user);
    const modeOf = (link: ClashLink) => modes?.get(link.type) ?? 'reply';
    const screenshot = message.attachments.find((file) => file.contentType?.startsWith('image/'));
    const baseLinks = fresh.filter((link) => link.type === 'base');
    // Every link must get a card and the text must be only links. A screenshot is kept by its layout post.
    const replace =
      !!modes &&
      fresh.every((link) => modeOf(link) === 'replace') &&
      !!permissions?.has(PermissionFlagsBits.ManageMessages) &&
      isOnlyClashLinks(message.content) &&
      findClashLinks(message.content, Infinity).length === fresh.length &&
      message.attachments.every((file) => file === screenshot && baseLinks.length > 0);

    const send = async (group: ClashLink[], payload: BaseMessageOptions) => {
      const shared = `-# Shared by <@${message.author.id}>`;
      // A Replace rule that can't delete this message replies instead.
      if (!replace && group.some((link) => modeOf(link) !== 'message')) {
        return message.reply({ ...payload, allowedMentions: { repliedUser: false } });
      }
      return message.channel.send({
        ...payload,
        content: [payload.content, shared].filter(Boolean).join('\n'),
        allowedMentions: { parse: [] }
      });
    };

    const sent: ClashLink[] = [];
    const cards = fresh.filter((link) => link.type !== 'base');
    if (cards.length) {
      const { shown, failed, ...payload } = await renderClashLinks(
        this.client,
        message.guild,
        message.guild.preferredLocale,
        cards
      );
      countLinkCards(failed, source, 'lookup_failed');
      if (payload.embeds.length) {
        const reply = await send(shown, payload).catch(() => null);
        if (reply) sent.push(...shown);
        else countLinkCards(shown, source, 'send_failed');
      }
    }

    // Base links get the same post as /layout, so Copy Layout, downloads and voting work.
    const layouts = this.client.commandHandler.getCommand(
      'layout-post'
    ) as unknown as LayoutCommand;
    for (const link of baseLinks) {
      const reply = await layouts
        .postLayout({
          guild: message.guild,
          link: link.url,
          screenshot: screenshot?.url ?? null,
          userId: message.author.id,
          canReact: !!permissions?.has(PermissionFlagsBits.AddReactions),
          send: (payload) => send([link], payload)
        })
        .catch(() => null);
      if (reply) sent.push(link);
      else countLinkCards([link], source, 'send_failed');
    }
    if (!sent.length) return;

    if (replace && sent.length === fresh.length) {
      await message.delete().catch(() => null);
    } else if (
      permissions?.has(PermissionFlagsBits.ManageMessages) &&
      onlyClashLinks(message.content)
    ) {
      await message.suppressEmbeds(true).catch(() => null);
    }

    markShown(message.channelId, sent);
    countLinkCards(sent, source, 'sent');
    const linkTypes = sent.map((link) => link.type);
    this.client.logger.debug(`${linkTypes.map((type) => `link-${type}`).join(', ')} ~ ${source}`, {
      label: `${message.guild.name}/${message.author.displayName}`
    });
    void this.client.stats.links(linkTypes);
  }

  private parseWithPrefix(messageContent: string, prefix: string) {
    const lowerContent = messageContent.toLowerCase();
    if (!lowerContent.startsWith(prefix.toLowerCase())) return null;

    const endOfPrefix = lowerContent.indexOf(prefix.toLowerCase()) + prefix.length;
    const startOfArgs = messageContent.slice(endOfPrefix).search(/\S/) + prefix.length;
    const alias = messageContent.slice(startOfArgs).split(/\s{1,}|\n{1,}/)[0];

    const command = this.client.commandHandler.getCommand(alias);
    const content = messageContent.slice(startOfArgs + alias.length + 1).trim();
    const contents = content.split(/\s+/g);

    return { command, content, contents };
  }

  private inhibitor(message: Message) {
    const guilds = this.client.settings.get<string[]>('global', Settings.GUILD_BLACKLIST, []);
    const users = this.client.settings.get<string[]>('global', Settings.USER_BLACKLIST, []);
    return guilds.includes(message.guild!.id) || users.includes(message.author.id);
  }
}
