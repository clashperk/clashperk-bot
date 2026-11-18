import { Settings } from '@app/constants';
import { GiveawayMode } from '@app/entities';
import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  GuildTextBasedChannel,
  MessageFlags
} from 'discord.js';
import ms from 'ms';
import { api } from '../../api/axios.js';
import { GiveawayEligibilityInput } from '../../api/generated.js';
import { Command } from '../../lib/handlers.js';
import {
  buildActiveGiveaway,
  GIVEAWAY_BANNER_NAME,
  giveawayErrorText,
  GiveawayView
} from '../../util/giveaways.js';

const MAX_DURATION = 60 * 24 * 60 * 60 * 1000;

export default class GiveawayCreateCommand extends Command {
  public constructor() {
    super('giveaway-create', {
      category: 'setup',
      channel: 'guild',
      userPermissions: ['ManageGuild'],
      roleKey: Settings.GIVEAWAY_MANAGER_ROLE,
      defer: true,
      ephemeral: true
    });
  }

  public async exec(interaction: ChatInputCommandInteraction<'cached'>) {
    const channel = (interaction.options.getChannel('channel') ??
      interaction.channel) as GuildTextBasedChannel | null;
    if (!channel?.isTextBased()) {
      return interaction.editReply('Pick a text channel to post the giveaway in.');
    }

    const duration = ms(interaction.options.getString('duration', true));
    if (!duration || duration < 60_000 || duration > MAX_DURATION) {
      return interaction.editReply('Set a duration between 1 minute and 60 days, such as `24h`.');
    }

    const image = interaction.options.getAttachment('image');
    if (image && !image.contentType?.startsWith('image/')) {
      return interaction.editReply('The banner must be an image file.');
    }

    const mode = (interaction.options.getString('mode') ?? 'open') as GiveawayMode;
    const clan = interaction.options.getString('clan') ?? undefined;
    const winnerCount = interaction.options.getInteger('winners') ?? 1;
    const boostFactor = interaction.options.getInteger('boost_factor') ?? 2;

    let created;
    try {
      const { data } = await api.giveaways.createGiveaway(
        { guildId: interaction.guildId },
        {
          channelId: channel.id,
          hostUserId: interaction.user.id,
          prize: interaction.options.getString('prize', true),
          winnerCount,
          endsAt: new Date(Date.now() + duration).toISOString(),
          eligibility: this.buildEligibility(mode, clan, boostFactor),
          ...(image ? { imageUrl: image.url } : {})
        }
      );
      created = data;
    } catch (error) {
      return interaction.editReply(giveawayErrorText(error, "I couldn't create the giveaway."));
    }

    const view: GiveawayView = {
      id: created.id,
      prize: created.prize,
      imageUrl: created.imageUrl,
      winnerCount: created.winnerCount,
      endsAtMs: created.endsAt,
      hostUserId: created.hostUserId,
      entryCount: created.entryCount,
      eligibility: {
        mode: created.eligibility.mode as GiveawayMode,
        allGuildClans: created.eligibility.allGuildClans,
        clanTags: created.eligibility.clanTags,
        boostFactor: created.eligibility.boostFactor ?? undefined
      }
    };

    try {
      const message = await channel.send({
        components: [buildActiveGiveaway(view)],
        files: image ? [new AttachmentBuilder(image.url, { name: GIVEAWAY_BANNER_NAME })] : [],
        flags: MessageFlags.IsComponentsV2
      });
      await api.giveaways
        .updateGiveaway(
          { guildId: interaction.guildId, giveawayId: created.id },
          { messageId: message.id }
        )
        .catch(() => null);
      return interaction.editReply(`Giveaway posted in ${channel.toString()}.`);
    } catch {
      await api.giveaways
        .cancelGiveaway({ guildId: interaction.guildId, giveawayId: created.id })
        .catch(() => null);
      return interaction.editReply(
        `I couldn't post in ${channel.toString()}. Check my permission to send messages and attach files there.`
      );
    }
  }

  private buildEligibility(
    mode: GiveawayMode,
    clan: string | undefined,
    boostFactor: number
  ): GiveawayEligibilityInput {
    if (mode === 'open') return { mode } as GiveawayEligibilityInput;
    const base = clan ? { clanTags: [clan] } : { allGuildClans: true };
    return {
      mode,
      ...base,
      ...(mode === 'boosted' ? { boostFactor } : {})
    } as GiveawayEligibilityInput;
  }
}
