import { Settings } from '@app/constants';
import { ClashLinkType, LinkParsingConfig } from '@app/entities';
import {
  ActionRowBuilder,
  APIEmbed,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  Guild,
  GuildTextBasedChannel,
  MessageActionRowComponentBuilder
} from 'discord.js';
import type ArmyCommand from '../commands/search/army.js';
import type ClanCommand from '../commands/search/clan.js';
import type PlayerCommand from '../commands/search/player.js';
import type { Client } from '../struct/client.js';

export type { ClashLinkType };

export interface ClashLink {
  type: ClashLinkType;
  value: string;
  url: string;
}

/** Cards per message, so a pasted list can't flood a channel. */
export const MAX_LINKS_PER_MESSAGE = 3;

const ACTIONS: Record<string, { type: ClashLinkType; param: string }> = {
  openplayerprofile: { type: 'player', param: 'tag' },
  openclanprofile: { type: 'clan', param: 'tag' },
  copyarmy: { type: 'army', param: 'army' },
  openlayout: { type: 'base', param: 'id' }
};

/** Share links from the game (`link.clashofclans.com/<lang>?action=...`), deduped, in order. */
export function findClashLinks(content: string, limit = MAX_LINKS_PER_MESSAGE): ClashLink[] {
  const links = new Map<string, ClashLink>();
  // A fresh regex per call: a shared global one keeps lastIndex between messages.
  for (const [text] of content.matchAll(/https?:\/\/link\.clashofclans\.com\/[^\s<>]+/gi)) {
    let url: URL;
    try {
      url = new URL(text);
    } catch {
      continue;
    }
    const action = ACTIONS[url.searchParams.get('action')?.toLowerCase() ?? ''];
    const value = action && url.searchParams.get(action.param);
    if (!action || !value) continue;

    const key = `${action.type}:${value.toUpperCase()}`;
    if (!links.has(key)) links.set(key, { type: action.type, value, url: url.href });
    if (links.size >= limit) break;
  }
  return [...links.values()];
}

/** Link types that are on in this channel. Threads follow their channel, categories cover theirs. */
export function linkTypesFor(client: Client, channel: GuildTextBasedChannel) {
  const config = client.settings.get<LinkParsingConfig | null>(
    channel.guild,
    Settings.LINK_PARSING,
    null
  );
  if (!config) return new Set<ClashLinkType>();

  const parent = channel.isThread() ? channel.parent : channel;
  if (!parent) return new Set<ClashLinkType>();
  const types = (Object.keys(config) as ClashLinkType[]).filter((type) => {
    const rule = config[type];
    return (
      rule?.enabled &&
      (rule.channelIds.includes(parent.id) ||
        (!!parent.parentId && rule.categoryIds.includes(parent.parentId)))
    );
  });
  return new Set(types);
}

const RATE_WINDOW_MS = 10_000;
const RATE_LIMIT = 5;
const recentReplies = new Map<string, number[]>();

/** At most `RATE_LIMIT` link replies per channel every 10 seconds. Counts the reply when allowed. */
export function takeLinkReply(channelId: string) {
  const now = Date.now();
  const recent = (recentReplies.get(channelId) ?? []).filter((at) => now - at < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    recentReplies.set(channelId, recent);
    return false;
  }
  recent.push(now);
  recentReplies.set(channelId, recent);
  return true;
}

setInterval(() => {
  const now = Date.now();
  for (const [channelId, recent] of recentReplies) {
    if (recent.every((at) => now - at >= RATE_WINDOW_MS)) recentReplies.delete(channelId);
  }
}, 60_000).unref();

/** One card per link, using the same embeds as `/player`, `/clan` and `/army`. Failed lookups are skipped. */
export async function renderClashLinks(
  client: Client,
  guild: Guild,
  locale: string,
  links: ClashLink[]
) {
  const embeds: (EmbedBuilder | APIEmbed)[] = [];
  const components: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];
  const color = client.embed(guild.id);

  for (const link of links) {
    if (link.type === 'player') {
      const { body, res } = await client.coc.getPlayer(link.value);
      if (!res.ok) continue;
      const command = client.commandHandler.getCommand('player') as unknown as PlayerCommand;
      embeds.push((await command.embed(body)).setColor(color));
    }

    if (link.type === 'clan') {
      const { body, res } = await client.coc.getClan(link.value);
      if (!res.ok) continue;
      const command = client.commandHandler.getCommand('clan') as unknown as ClanCommand;
      embeds.push(await command.embed(guild.id, body));
    }

    if (link.type === 'army') {
      const command = client.commandHandler.getCommand('army') as unknown as ArmyCommand;
      const payload = command.embed(guild, locale, { link: link.url });
      if (!payload.embeds.length) continue;
      embeds.push(...payload.embeds);
      if ('components' in payload) components.push(...(payload.components ?? []));
    }

    if (link.type === 'base') {
      const [, hall, level] = /^(TH|BH)(\d+)/i.exec(link.value) ?? [];
      const title = hall
        ? `${hall.toUpperCase() === 'BH' ? 'Builder Hall' : 'Town Hall'} ${level} base`
        : 'Base layout';
      embeds.push(new EmbedBuilder().setColor(color).setTitle(title));
      components.push(
        new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
          new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Open in game').setURL(link.url)
        )
      );
    }
  }

  return { embeds, components: components.slice(0, 5) };
}
