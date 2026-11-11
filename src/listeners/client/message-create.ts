import { Settings } from '@app/constants';
import { Message, PermissionFlagsBits } from 'discord.js';
import {
  findClashLinks,
  linkTypesFor,
  renderClashLinks,
  takeLinkReply
} from '../../helper/clash-links.helper.js';
import { Command, Listener } from '../../lib/handlers.js';

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

    const links = findClashLinks(message.content);
    if (links.length) return this.expandLinks(message, links);

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
      this.client.logger.log(`${command.id}`, {
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

  /** A mention asks for every link. Otherwise each link type follows its own channels. */
  private async expandLinks(message: Message<true>, found: ReturnType<typeof findClashLinks>) {
    if (this.client.settings.hasCustomBot(message.guild) && !this.client.isCustom()) return;

    const mentioned = message.mentions.users.has(this.client.user.id);
    const types = mentioned ? null : linkTypesFor(this.client, message.channel);
    const links = types ? found.filter((link) => types.has(link.type)) : found;
    if (!links.length || !takeLinkReply(message.channelId)) return;

    const payload = await renderClashLinks(
      this.client,
      message.guild,
      message.guild.preferredLocale,
      links
    );
    if (!payload.embeds.length) return;
    return message.reply({ ...payload, allowedMentions: { repliedUser: false } }).catch(() => null);
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
