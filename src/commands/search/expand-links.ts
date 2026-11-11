import { CommandInteraction } from 'discord.js';
import { findClashLinks, renderClashLinks } from '../../helper/clash-links.helper.js';
import { Command } from '../../lib/handlers.js';

/** Right-click a message → Apps → Expand Clash link. Works without reading every message. */
export default class ExpandLinksCommand extends Command {
  public constructor() {
    super('expand-links', {
      aliases: ['Expand Clash link'],
      category: 'search',
      channel: 'guild',
      clientPermissions: ['EmbedLinks', 'UseExternalEmojis'],
      defer: true,
      ephemeral: true
    });
  }

  public async exec(interaction: CommandInteraction<'cached'>, args: { message?: string }) {
    const links = findClashLinks(args.message ?? '');
    if (!links.length) {
      return interaction.editReply({
        content: 'There is no Clash of Clans player, clan, army or base link in this message.'
      });
    }

    const payload = await renderClashLinks(
      this.client,
      interaction.guild,
      interaction.locale,
      links
    );
    if (!payload.embeds.length) {
      return interaction.editReply({
        content: 'Could not load those links from Clash of Clans. Please try again.'
      });
    }
    return interaction.editReply(payload);
  }
}
