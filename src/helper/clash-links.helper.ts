import { Settings } from '@app/constants';
import { ClashLinkType, LinkParsingConfig, LinkParsingMode } from '@app/entities';
import {
  ActionRowBuilder,
  APIEmbed,
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
  /** Type and value, the same for every spelling of one link. */
  key: string;
}

/** Cards per message, so a pasted list can't flood a channel. */
export const MAX_LINKS_PER_MESSAGE = 3;

const ACTIONS: Record<string, { type: ClashLinkType; param: string }> = {
  openplayerprofile: { type: 'player', param: 'tag' },
  openclanprofile: { type: 'clan', param: 'tag' },
  copyarmy: { type: 'army', param: 'army' },
  openlayout: { type: 'base', param: 'id' }
};

// Not global, so `.test()` keeps no state between messages.
const CLASH_LINK_HINT = /link\.clashofclans\.com/i;
const OTHER_LINK = /https?:\/\/(?!link\.clashofclans\.com)\S/i;
const CLASH_LINK_URL = /https?:\/\/link\.clashofclans\.com\/\S+/gi;

const CHANNEL_WINDOW_MS = 10_000;
const CHANNEL_LIMIT = 5;
const MEMBER_COOLDOWN_MS = 5_000;
const REPEAT_WINDOW_MS = 2 * 60_000;
const LOOKUP_TTL_MS = 60_000;
const MAX_LOOKUPS = 1000;
const SWEEP_INTERVAL_MS = 60_000;

const channelReplies = new Map<string, number[]>();
const memberReplies = new Map<string, number>();
const shownLinks = new Map<string, number>();
const lookups = new Map<string, { expires: number; body: unknown }>();

/** Text Discord would preview: no code, no spoilers, no `<link>` (Discord's "don't preview"). */
function previewableText(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\|\|[\s\S]*?\|\|/g, ' ')
    .replace(/<https?:\/\/[^\s>]+>/gi, ' ');
}

/** Share links from the game (`link.clashofclans.com/<lang>?action=...`), deduped, in order. */
export function findClashLinks(content: string, limit = MAX_LINKS_PER_MESSAGE): ClashLink[] {
  if (!CLASH_LINK_HINT.test(content)) return [];

  const links = new Map<string, ClashLink>();
  // A fresh regex per call: a shared global one keeps lastIndex between messages.
  for (const [text] of previewableText(content).matchAll(
    /https?:\/\/link\.clashofclans\.com\/[^\s<>]+/gi
  )) {
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
    if (!links.has(key)) links.set(key, { type: action.type, value, url: url.href, key });
    if (links.size >= limit) break;
  }
  return [...links.values()];
}

/** True when every link in the message is a game link, so hiding its previews hides nothing else. */
export function onlyClashLinks(content: string) {
  return !OTHER_LINK.test(content);
}

/** Link types that are on in this channel, with how each posts. Threads follow their channel. */
export function linkModesFor(client: Client, channel: GuildTextBasedChannel) {
  const modes = new Map<ClashLinkType, LinkParsingMode>();
  const config = client.settings.get<LinkParsingConfig | null>(
    channel.guild,
    Settings.LINK_PARSING,
    null
  );
  const parent = channel.isThread() ? channel.parent : channel;
  if (!config || !parent) return modes;

  for (const type of Object.keys(config) as ClashLinkType[]) {
    const rule = config[type];
    const covered =
      rule?.channelIds.includes(parent.id) ||
      (!!parent.parentId && rule?.categoryIds.includes(parent.parentId));
    if (rule?.enabled && covered) modes.set(type, rule.mode ?? 'reply');
  }
  return modes;
}

/** True when the text is nothing but game links, so deleting it loses nothing else. */
export function isOnlyClashLinks(content: string) {
  return !content.replace(CLASH_LINK_URL, '').trim();
}

/** Links this channel already got a card for in the last 2 minutes are left out. */
export function splitRepeats(channelId: string, links: ClashLink[]) {
  const now = Date.now();
  const repeated = links.filter(
    (link) => now - (shownLinks.get(`${channelId}:${link.key}`) ?? 0) < REPEAT_WINDOW_MS
  );
  return { fresh: links.filter((link) => !repeated.includes(link)), repeated };
}

/** At most 5 link replies per channel every 10 seconds, and one per member every 5 seconds. */
export function canReply(channelId: string, memberKey: string) {
  const now = Date.now();
  const recent = (channelReplies.get(channelId) ?? []).filter((at) => now - at < CHANNEL_WINDOW_MS);
  channelReplies.set(channelId, recent);
  return (
    recent.length < CHANNEL_LIMIT && now - (memberReplies.get(memberKey) ?? 0) >= MEMBER_COOLDOWN_MS
  );
}

/** Takes the channel's and member's slot before the cards are built, so racing messages can't both pass. */
export function recordReply(channelId: string, memberKey: string) {
  const now = Date.now();
  channelReplies.set(channelId, [...(channelReplies.get(channelId) ?? []), now]);
  memberReplies.set(memberKey, now);
}

export function markShown(channelId: string, links: ClashLink[]) {
  const now = Date.now();
  for (const link of links) shownLinks.set(`${channelId}:${link.key}`, now);
}

setInterval(() => {
  const now = Date.now();
  for (const [channelId, recent] of channelReplies) {
    if (recent.every((at) => now - at >= CHANNEL_WINDOW_MS)) channelReplies.delete(channelId);
  }
  for (const [key, at] of memberReplies) {
    if (now - at >= MEMBER_COOLDOWN_MS) memberReplies.delete(key);
  }
  for (const [key, at] of shownLinks) {
    if (now - at >= REPEAT_WINDOW_MS) shownLinks.delete(key);
  }
  for (const [key, entry] of lookups) {
    if (now >= entry.expires) lookups.delete(key);
  }
}, SWEEP_INTERVAL_MS).unref();

/** Game API answers for a minute, so a link pasted again doesn't call the API again. */
async function cachedLookup<T>(
  key: string,
  fetch: () => Promise<{ body: T; res: { ok: boolean } }>
) {
  const hit = lookups.get(key);
  if (hit && Date.now() < hit.expires) return hit.body as T;

  const { body, res } = await fetch();
  if (!res.ok) return null;
  if (lookups.size >= MAX_LOOKUPS) lookups.delete(lookups.keys().next().value!);
  lookups.set(key, { expires: Date.now() + LOOKUP_TTL_MS, body });
  return body;
}

/** Player, clan and army cards, the same embeds as `/player`, `/clan` and `/army`. Base links go through `/layout`'s post instead. */
export async function renderClashLinks(
  client: Client,
  guild: Guild,
  locale: string,
  links: ClashLink[]
) {
  const embeds: (EmbedBuilder | APIEmbed)[] = [];
  const components: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];
  const shown: ClashLink[] = [];
  const failed: ClashLink[] = [];
  const color = client.embed(guild.id);

  for (const link of links) {
    if (link.type === 'player') {
      const body = await cachedLookup(link.key, () => client.coc.getPlayer(link.value));
      if (!body) {
        failed.push(link);
        continue;
      }
      const command = client.commandHandler.getCommand('player') as unknown as PlayerCommand;
      embeds.push((await command.embed(body)).setColor(color));
    }

    if (link.type === 'clan') {
      const body = await cachedLookup(link.key, () => client.coc.getClan(link.value));
      if (!body) {
        failed.push(link);
        continue;
      }
      const command = client.commandHandler.getCommand('clan') as unknown as ClanCommand;
      embeds.push(await command.embed(guild.id, body));
    }

    if (link.type === 'army') {
      const command = client.commandHandler.getCommand('army') as unknown as ArmyCommand;
      const payload = command.embed(guild, locale, { link: link.url });
      if (!payload.embeds.length) {
        failed.push(link);
        continue;
      }
      embeds.push(...payload.embeds);
      if ('components' in payload) components.push(...(payload.components ?? []));
    }

    shown.push(link);
  }

  return { embeds, components: components.slice(0, 5), shown, failed };
}
