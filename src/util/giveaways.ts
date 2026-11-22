import { GiveawayEligibility, GiveawayMode, GiveawaysEntity } from '@app/entities';
import {
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  escapeMarkdown,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
  TimestampStyles,
  time
} from 'discord.js';
import { GiveawayDto, GiveawayEntryResultDto } from '../api/generated.js';

export const GIVEAWAY_BANNER_NAME = 'giveaway-banner.png';
export const DEFAULT_DESCRIPTION = 'Click the button below to enter. Good luck!';
export const MAX_TITLE = 100;
export const MAX_DESCRIPTION = 1000;
/** Mentions in the giveaway message show but never ping. The winner announcement pings. */
export const NO_PINGS = { parse: [] } as const;

export interface GiveawayView {
  id: string;
  prize: string;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  winnerCount: number;
  endsAtMs: number;
  eligibility: GiveawayEligibility;
  entryCount: number;
  hostUserId: string;
  /** Names of the chosen clans, when the host picked some instead of all the server's clans. */
  clanNames: string[];
}

export function viewFromEntity(giveaway: GiveawaysEntity, clanNames: string[] = []): GiveawayView {
  return {
    id: giveaway._id.toHexString(),
    prize: giveaway.prize,
    title: giveaway.title ?? null,
    description: giveaway.description ?? null,
    imageUrl: giveaway.imageUrl,
    winnerCount: giveaway.winnerCount,
    endsAtMs: giveaway.endsAt.getTime(),
    eligibility: giveaway.eligibility,
    entryCount: giveaway.entryCount,
    hostUserId: giveaway.hostUserId,
    clanNames
  };
}

export function viewFromDto(giveaway: GiveawayDto, clanNames: string[] = []): GiveawayView {
  return {
    id: giveaway.id,
    prize: giveaway.prize,
    title: giveaway.title,
    description: giveaway.description,
    imageUrl: giveaway.imageUrl,
    winnerCount: giveaway.winnerCount,
    endsAtMs: giveaway.endsAt,
    eligibility: {
      mode: giveaway.eligibility.mode as GiveawayMode,
      allGuildClans: giveaway.eligibility.allGuildClans,
      clanTags: giveaway.eligibility.clanTags,
      boostFactor: giveaway.eligibility.boostFactor ?? undefined
    },
    entryCount: giveaway.entryCount,
    hostUserId: giveaway.hostUserId,
    clanNames
  };
}

const GIVEAWAY_ERROR_TEXT: Record<string, string> = {
  GIVEAWAY_NOT_FOUND: 'This giveaway no longer exists.',
  GIVEAWAY_NOT_ACTIVE: 'This giveaway has already ended.',
  GIVEAWAY_ALREADY_DRAWN: 'This giveaway has already been drawn.',
  GIVEAWAY_ALREADY_ENTERED: "You're already in this giveaway.",
  GIVEAWAY_NO_LINKED_ACCOUNT:
    "You can't enter this one. It's for members of the server's clans. Link a Clash of Clans account in one of them, then try again.",
  GIVEAWAY_NOT_IN_CLAN:
    "You can't enter this one. It's for members of the server's clans. Link a Clash of Clans account in one of them, then try again."
};

export function giveawayErrorText(error: unknown, fallback = 'Something went wrong. Try again.') {
  const code = (error as { response?: { data?: { code?: string } } })?.response?.data?.code;
  return (code && GIVEAWAY_ERROR_TEXT[code]) || fallback;
}

const entriesLabel = (count: number) => `${count} ${count === 1 ? 'entry' : 'entries'}`;
const factor = (eligibility: GiveawayEligibility) => eligibility.boostFactor ?? 2;

/** "the server's clans", "Reddit Zero", "Reddit Zero or Reddit Delta", or a count past three. */
function clansLabel(view: Pick<GiveawayView, 'eligibility' | 'clanNames'>): string {
  if (view.eligibility.allGuildClans) return "the server's clans";
  const names = view.clanNames;
  if (!names.length) return 'the chosen clans';
  if (names.length > 3) return `${names.length} chosen clans`;
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} or ${names.at(-1)}`;
}

/** The line on the posted message saying who can enter. */
function eligibilityLine(view: Pick<GiveawayView, 'eligibility' | 'clanNames'>): string {
  const { mode } = view.eligibility;
  if (mode === 'boosted') {
    return `Open to all · ${factor(view.eligibility)}× odds for members of ${clansLabel(view)}`;
  }
  if (mode === 'restricted') return `Members of ${clansLabel(view)} only`;
  return 'Open to everyone · equal odds';
}

/** The host's summary before posting. */
export function eligibilitySummary(view: Pick<GiveawayView, 'eligibility' | 'clanNames'>): string {
  const { mode } = view.eligibility;
  if (mode === 'boosted') {
    return `Everyone can enter. Members of ${clansLabel(view)} get ${factor(view.eligibility)}× odds at the draw.`;
  }
  if (mode === 'restricted') return `Only linked members of ${clansLabel(view)} can enter.`;
  return 'Everyone can enter. Every entrant has equal odds.';
}

function oddsNote(eligibility: GiveawayEligibility): string {
  if (eligibility.mode === 'boosted') return `Members had ${factor(eligibility)}× odds`;
  if (eligibility.mode === 'restricted') return 'Clan members only';
  return 'Equal odds for all';
}

/** The host's own heading, or the default built from the prize. */
export function giveawayTitle(view: Pick<GiveawayView, 'title' | 'prize'>) {
  return view.title ?? `🎉 Giveaway · ${escapeMarkdown(view.prize)}`;
}

function enterButton(giveawayId: string, disabled = false) {
  // Stateless: the handler reloads the giveaway from its id, so the button survives restarts.
  return new ButtonBuilder()
    .setCustomId(JSON.stringify({ cmd: 'giveaway-enter', giveaway: giveawayId, ephemeral: true }))
    .setLabel('Enter Giveaway')
    .setEmoji('🎉')
    .setStyle(ButtonStyle.Success)
    .setDisabled(disabled);
}

/** The posted message. A preview shows the same layout with the button switched off. */
export function buildActiveGiveaway(view: GiveawayView, { preview = false } = {}) {
  const container = new ContainerBuilder().setAccentColor(0xd99a2b);
  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      `## ${giveawayTitle(view)}\n${view.description ?? DEFAULT_DESCRIPTION}`
    )
  );
  if (view.imageUrl) {
    container.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(
        new MediaGalleryItemBuilder().setURL(`attachment://${GIVEAWAY_BANNER_NAME}`)
      )
    );
  }
  const endsAt = new Date(view.endsAtMs);
  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      [
        `🏆 **Winners** ${view.winnerCount} · ⏰ **Ends** ${time(endsAt, TimestampStyles.RelativeTime)}`,
        eligibilityLine(view),
        `-# Hosted by <@${view.hostUserId}> · ${entriesLabel(view.entryCount)}`
      ].join('\n')
    )
  );
  container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));
  container.addActionRowComponents((row) =>
    row.addComponents(enterButton(preview ? 'preview' : view.id, preview))
  );
  return container;
}

export function buildEndedGiveaway(
  view: Pick<GiveawayView, 'id' | 'prize' | 'entryCount' | 'eligibility'>,
  winners: string[]
) {
  const container = new ContainerBuilder();
  const mentions = winners.map((id) => `<@${id}>`);
  const winnerLine = mentions.length
    ? `Winner${mentions.length === 1 ? '' : 's'}: ${joinAnd(mentions)}`
    : 'No valid entries.';
  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      [
        `## 🏆 Giveaway ended · ${escapeMarkdown(view.prize)}`,
        winnerLine,
        `-# ${entriesLabel(view.entryCount)} · ${oddsNote(view.eligibility)}`
      ].join('\n')
    )
  );
  container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));
  container.addActionRowComponents((row) => row.addComponents(enterButton(view.id, true)));
  return container;
}

export function buildCancelledGiveaway(prize: string) {
  return new ContainerBuilder().addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      `## 🚫 Giveaway cancelled · ${escapeMarkdown(prize)}\n-# No winners were drawn.`
    )
  );
}

export function winnerAnnouncement(prize: string, winners: string[]): string | null {
  if (!winners.length) return null;
  const mentions = joinAnd(winners.map((id) => `<@${id}>`));
  return `🎉 Congratulations ${mentions}! You won **${escapeMarkdown(prize)}**. A host will be in touch.`;
}

/** The private reply after clicking Enter. */
export function enterReply(
  result: GiveawayEntryResultDto,
  view: Pick<GiveawayView, 'eligibility' | 'clanNames'>
): string {
  const player = result.player
    ? `${escapeMarkdown(result.player.name ?? result.player.tag)} (${result.player.tag})`
    : null;
  const clan = result.clan ? escapeMarkdown(result.clan.name) : null;
  let detail = 'Entered. Anyone can join this giveaway.';
  if (result.tickets > 1 && player && clan) {
    detail = `Entered with ${player} from ${clan}. Your clan membership gives you ${result.tickets}× odds.`;
  } else if (player && clan) {
    detail = `Entered with ${player} from ${clan}.`;
  } else if (view.eligibility.mode === 'boosted') {
    detail = `Entered. Members of ${clansLabel(view)} get ${factor(view.eligibility)}× odds.`;
  }
  return `You're in! 🎉\n-# ${detail}`;
}

function joinAnd(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`;
}
