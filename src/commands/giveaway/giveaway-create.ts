import { Settings } from '@app/constants';
import { GiveawayEligibility, GiveawayMode } from '@app/entities';
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  ContainerBuilder,
  LabelBuilder,
  MessageFlags,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextDisplayBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import ms from 'ms';
import { api } from '../../api/axios.js';
import { GiveawayEligibilityInput } from '../../api/generated.js';
import { Command } from '../../lib/handlers.js';
import { createInteractionCollector, createModalCollector } from '../../util/collectors.js';
import {
  buildActiveGiveaway,
  DEFAULT_DESCRIPTION,
  giveawayTitle,
  eligibilitySummary,
  GIVEAWAY_BANNER_NAME,
  giveawayErrorText,
  GiveawayView,
  MAX_DESCRIPTION,
  MAX_TITLE
} from '../../util/giveaways.js';

const MAX_DURATION = 60 * 24 * 60 * 60 * 1000;
const ALL_CLANS = '*';
/** A select menu holds 25 options, and one is "All server clans". */
const MENU_CLANS = 24;

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
    const target = interaction.options.getChannel('channel') ?? interaction.channel;
    const channel = target && this.client.giveawayManager.postableChannel(target.id);
    if (!channel) {
      return interaction.editReply(
        "I can't post in that channel. Check that I can see it and send messages there."
      );
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
    const clans =
      mode === 'open'
        ? []
        : await this.client.storage.find(interaction.guildId, { name: 1, tag: 1 });
    if (mode !== 'open' && !clans.length) {
      return interaction.editReply(
        'Add a clan to this server first. Boosted and restricted giveaways count clan members.'
      );
    }

    const prize = interaction.options.getString('prize', true);
    const winnerCount = interaction.options.getInteger('winners') ?? 1;
    const boostFactor = interaction.options.getInteger('boost_factor') ?? 2;
    let picked = [ALL_CLANS];
    let title: string | null = null;
    let description: string | null = null;

    const eligibility = (): GiveawayEligibility => {
      if (mode === 'open') return { mode };
      const base = picked.includes(ALL_CLANS) ? { allGuildClans: true } : { clanTags: picked };
      return { mode, ...base, ...(mode === 'boosted' ? { boostFactor } : {}) };
    };

    const view = (): GiveawayView => ({
      id: 'preview',
      prize,
      title,
      description,
      imageUrl: image?.url ?? null,
      winnerCount,
      endsAtMs: Date.now() + duration,
      eligibility: eligibility(),
      entryCount: 0,
      hostUserId: interaction.user.id,
      clanNames: clans.filter((clan) => picked.includes(clan.tag)).map((clan) => clan.name)
    });

    const dashboardLink =
      clans.length > MENU_CLANS
        ? await this.client.util.createDashboardUrl({
            userId: interaction.user.id,
            guildId: interaction.guildId,
            path: '/giveaways/new'
          })
        : null;

    const customIds = {
      clans: this.client.uuid(interaction.user.id),
      post: this.client.uuid(interaction.user.id),
      edit: this.client.uuid(interaction.user.id),
      cancel: this.client.uuid(interaction.user.id)
    };

    const preview = (notice?: string) => {
      const current = view();
      const header =
        notice ?? `**Ready to post in ${channel.toString()}.** ${eligibilitySummary(current)}`;
      const components: (
        | TextDisplayBuilder
        | ContainerBuilder
        | ActionRowBuilder<StringSelectMenuBuilder>
        | ActionRowBuilder<ButtonBuilder>
      )[] = [
        new TextDisplayBuilder().setContent(
          [
            header,
            ...(dashboardLink
              ? [
                  `This server has ${clans.length} clans. The menu lists the first ${MENU_CLANS}. To pick others, create the giveaway on the dashboard.`
                ]
              : []),
            '-# Only you can see this preview.'
          ].join('\n')
        ),
        buildActiveGiveaway(current, { preview: true })
      ];
      if (mode !== 'open') {
        components.push(
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId(customIds.clans)
              .setPlaceholder('Clans that count')
              .setMinValues(1)
              .setMaxValues(Math.min(clans.length, MENU_CLANS) + 1)
              .addOptions(
                {
                  label: 'All server clans',
                  value: ALL_CLANS,
                  default: picked.includes(ALL_CLANS)
                },
                ...clans.slice(0, MENU_CLANS).map((clan) => ({
                  label: clan.name,
                  description: clan.tag,
                  value: clan.tag,
                  default: picked.includes(clan.tag)
                }))
              )
          )
        );
      }
      components.push(
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId(customIds.post)
            .setLabel('Post giveaway')
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId(customIds.edit)
            .setLabel('Edit message')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId(customIds.cancel)
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary),
          ...(dashboardLink
            ? [
                new ButtonBuilder()
                  .setURL(dashboardLink)
                  .setLabel('Open dashboard')
                  .setStyle(ButtonStyle.Link)
              ]
            : [])
        )
      );
      return {
        components,
        files: image ? [new AttachmentBuilder(image.url, { name: GIVEAWAY_BANNER_NAME })] : [],
        attachments: [],
        flags: MessageFlags.IsComponentsV2 as const
      };
    };

    const finish = (text: string) => ({
      components: [new TextDisplayBuilder().setContent(text)],
      attachments: [],
      flags: MessageFlags.IsComponentsV2 as const
    });

    const editMessage = async (action: ButtonInteraction<'cached'>) => {
      const modalId = this.client.uuid(interaction.user.id);
      const titleInput = new TextInputBuilder()
        .setCustomId('title')
        .setStyle(TextInputStyle.Short)
        .setMaxLength(MAX_TITLE)
        .setPlaceholder(giveawayTitle({ prize, title: null }))
        .setRequired(false);
      const descriptionInput = new TextInputBuilder()
        .setCustomId('description')
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(MAX_DESCRIPTION)
        .setPlaceholder(DEFAULT_DESCRIPTION)
        .setRequired(false);
      if (title) titleInput.setValue(title);
      if (description) descriptionInput.setValue(description);

      await action.showModal(
        new ModalBuilder()
          .setCustomId(modalId)
          .setTitle('Edit message')
          .addLabelComponents(
            new LabelBuilder()
              .setLabel('Title')
              .setDescription('Leave empty for the default.')
              .setTextInputComponent(titleInput),
            new LabelBuilder()
              .setLabel('Description')
              .setDescription('Markdown works. Leave empty for the default.')
              .setTextInputComponent(descriptionInput)
          )
      );
      createModalCollector({
        customId: modalId,
        interaction: action,
        onSubmit: async (submit) => {
          title = submit.fields.getTextInputValue('title').trim() || null;
          description = submit.fields.getTextInputValue('description').trim() || null;
          if (submit.isFromMessage()) await submit.update(preview());
        }
      });
    };

    let done = false;
    const message = await interaction.editReply(preview());
    const collector = createInteractionCollector({
      interaction,
      message,
      customIds,
      onSelect: async (action) => {
        // "All server clans" wins over individual picks.
        picked = action.values.includes(ALL_CLANS) ? [ALL_CLANS] : action.values;
        await action.update(preview());
      },
      onClick: async (action) => {
        if (action.customId === customIds.cancel) {
          done = true;
          collector.stop();
          return action.update(finish('Cancelled. Nothing was posted.'));
        }

        if (action.customId === customIds.edit) return editMessage(action);

        await action.deferUpdate();
        try {
          await api.giveaways.createGiveaway(
            { guildId: interaction.guildId },
            {
              channelId: channel.id,
              hostUserId: interaction.user.id,
              hostName: interaction.member.displayName,
              prize,
              winnerCount,
              endsAt: new Date(Date.now() + duration).toISOString(),
              eligibility: eligibility() as GiveawayEligibilityInput,
              ...(title ? { title } : {}),
              ...(description ? { description } : {}),
              ...(image ? { imageUrl: image.url } : {})
            }
          );
        } catch (error) {
          return interaction.editReply(
            preview(giveawayErrorText(error, "I couldn't create the giveaway. Try again."))
          );
        }
        done = true;
        collector.stop();
        return interaction.editReply(
          finish(`Giveaway created. It shows up in ${channel.toString()} in a few seconds.`)
        );
      },
      onClose: () => {
        if (done) return;
        interaction
          .editReply(finish('This preview expired. Run /giveaway create again.'))
          .catch(() => null);
      }
    });
  }
}
