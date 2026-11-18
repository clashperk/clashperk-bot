import { GiveawayEligibility } from '@app/entities';
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

export const GIVEAWAY_BANNER_NAME = 'giveaway-banner.png';

export interface GiveawayView {
  id: string;
  prize: string;
  imageUrl: string | null;
  winnerCount: number;
  endsAtMs: number;
  eligibility: GiveawayEligibility;
  entryCount: number;
  hostUserId: string;
}

export const GIVEAWAY_ERROR_TEXT: Record<string, string> = {
  GIVEAWAY_NOT_FOUND: 'This giveaway no longer exists.',
  GIVEAWAY_NOT_ACTIVE: 'This giveaway has already ended.',
  GIVEAWAY_ALREADY_DRAWN: 'This giveaway has already been drawn.',
  GIVEAWAY_ALREADY_ENTERED: "You're already in this giveaway.",
  GIVEAWAY_NO_LINKED_ACCOUNT: 'Link a Clash of Clans account first, then try again.',
  GIVEAWAY_NOT_IN_CLAN:
    "This giveaway is for members of the server's clans. Join one with a linked account, then try again."
};

export function giveawayErrorText(
  error: unknown,
  fallback = 'Something went wrong. Try again.'
): string {
  const code = (error as { response?: { data?: { code?: string } } })?.response?.data?.code;
  return (code && GIVEAWAY_ERROR_TEXT[code]) || fallback;
}

const entriesLabel = (count: number) => `${count} ${count === 1 ? 'entry' : 'entries'}`;

export function eligibilityLine(eligibility: GiveawayEligibility): string {
  const where = eligibility.allGuildClans ? "the server's clans" : 'the chosen clans';
  if (eligibility.mode === 'boosted') {
    return `Open to everyone. Members of ${where} get ${eligibility.boostFactor ?? 2}× the winning chance.`;
  }
  if (eligibility.mode === 'restricted') {
    return `Only members of ${where} can enter.`;
  }
  return 'Open to everyone with equal chances.';
}

export function enterButton(giveawayId: string, disabled = false) {
  const button = new ButtonBuilder()
    .setLabel('Enter Giveaway')
    .setEmoji('🎉')
    .setStyle(ButtonStyle.Success)
    .setDisabled(disabled);
  // A stateless custom id: the handler reloads the giveaway from the id, so it survives restarts.
  button.setCustomId(
    JSON.stringify({ cmd: 'giveaway-enter', giveaway: giveawayId, ephemeral: true })
  );
  return button;
}

export function buildActiveGiveaway(view: GiveawayView): ContainerBuilder {
  const container = new ContainerBuilder();
  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(`# 🎉 Giveaway\n## ${escapeMarkdown(view.prize)}`)
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
        `🏆 **Winners:** ${view.winnerCount}`,
        `⏰ **Ends:** ${time(endsAt, TimestampStyles.RelativeTime)} (${time(endsAt, TimestampStyles.ShortDateTime)})`,
        eligibilityLine(view.eligibility),
        `-# Hosted by <@${view.hostUserId}> · Click Enter to join`
      ].join('\n')
    )
  );
  container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));
  container.addActionRowComponents((row) => row.addComponents(enterButton(view.id)));
  return container;
}

export function buildEndedGiveaway(
  view: Pick<GiveawayView, 'id' | 'prize' | 'entryCount'>,
  winners: string[]
): ContainerBuilder {
  const container = new ContainerBuilder();
  const names = winners.length ? winners.map((id) => `<@${id}>`).join(', ') : null;
  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(
      [
        `# 🏆 Giveaway ended\n## ${escapeMarkdown(view.prize)}`,
        '',
        names ? `**Winner${winners.length === 1 ? '' : 's'}:** ${names}` : 'No valid entries.',
        `-# ${entriesLabel(view.entryCount)}`
      ].join('\n')
    )
  );
  container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small));
  container.addActionRowComponents((row) => row.addComponents(enterButton(view.id, true)));
  return container;
}

export function winnerAnnouncement(prize: string, winners: string[]): string | null {
  if (!winners.length) return null;
  const mentions = winners.map((id) => `<@${id}>`).join(', ');
  return `🎉 Congratulations ${mentions}! You won **${escapeMarkdown(prize)}**.`;
}
