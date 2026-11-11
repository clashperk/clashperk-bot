import { Collections, Settings } from '@app/constants';
import { LayoutsEntity } from '@app/entities';
import {
  ActionRowBuilder,
  AttachmentBuilder,
  BaseInteraction,
  BaseMessageOptions,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  ComponentType,
  DiscordjsError,
  DiscordjsErrorCodes,
  FileUploadBuilder,
  Guild,
  LabelBuilder,
  Message,
  MessageFlags,
  ModalBuilder,
  ModalSubmitInteraction,
  PermissionFlagsBits,
  TextDisplayBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js';
import pluralize from 'pluralize';
import { shake } from 'radash';
import { Command, CommandOptions } from '../../lib/handlers.js';
import { layoutLabel } from '../../helper/layouts.helper.js';
import { EMOJIS } from '../../util/emojis.js';
import { Util } from '../../util/toolkit.js';

const LAYOUT_REGEX =
  /^https?:\/\/link\.clashofclans\.com\/[a-z]{1,2}[\/]?\?action=OpenLayout&id=TH\S+$/;

export default class LayoutCommand extends Command {
  public constructor() {
    super('layout-post', {
      category: 'search',
      channel: 'guild',
      defer: true
    });
  }

  public get collection() {
    return this.client.db.collection<LayoutsEntity>(Collections.LAYOUTS);
  }

  public refine(interaction: BaseInteraction) {
    return {
      ...this.options,
      defer: !interaction.isButton()
    } satisfies CommandOptions;
  }

  public async exec(
    interaction: CommandInteraction<'cached'> | ButtonInteraction<'cached'>,
    args: LayoutCommandArgs
  ) {
    args.layout_link &&= args.layout_link.trim();

    if (interaction.isButton() && args.display_link) {
      return this.displayLink(interaction, args);
    }

    if (interaction.isButton() && args.display_viewers) {
      return this.viewDownloader(interaction);
    }

    const layoutTemplate = this.client.settings.get<string>(
      interaction.guild,
      Settings.LAYOUT_TEMPLATE
    );
    if (layoutTemplate && !args.notes) args.notes = layoutTemplate;

    if (interaction.isCommand()) {
      return this.handleSubmit(interaction, args);
    }

    const isAdmin =
      this.client.util.isManager(interaction.member) ||
      interaction.message.interactionMetadata?.user.id === interaction.user.id ||
      interaction.message.mentions.repliedUser?.id === interaction.user.id;
    if (!isAdmin) {
      return interaction.reply({
        flags: MessageFlags.Ephemeral,
        content: 'You are not allowed to edit this layout.'
      });
    }

    const layout = await this.collection.findOne({
      messageIds: interaction.message.id,
      guildId: interaction.guild.id
    });
    if (layout) args.downloads = layout.downloader.length;

    const modalCustomId = this.client.uuid(interaction.user.id);
    const customIds = {
      link: this.client.uuid(interaction.user.id),
      notes: this.client.uuid(interaction.user.id),
      screenshot: this.client.uuid(interaction.user.id)
    };
    const modal = new ModalBuilder().setCustomId(modalCustomId).setTitle('Edit Layout');
    const linkInput = new TextInputBuilder()
      .setCustomId(customIds.link)
      .setPlaceholder('Enter Layout Link')
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(200)
      .setRequired(true);

    const link = this.getUrlFromInteractionComponents(interaction) || layout?.link;
    if (link) linkInput.setValue(link);

    const descriptionInput = new TextInputBuilder()
      .setCustomId(customIds.notes)
      .setPlaceholder(
        'Write anything you want (markdown, hyperlink and custom emojis are supported)'
      )
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(1800)
      .setRequired(false);

    if (interaction.message.content && args.has_description) {
      descriptionInput.setValue(interaction.message.content);
    }

    if (!layout?.notes && layoutTemplate) {
      descriptionInput.setValue(layoutTemplate);
    }

    modal.addLabelComponents(
      new LabelBuilder().setLabel('Layout Link').setTextInputComponent(linkInput),
      new LabelBuilder().setLabel('Notes').setTextInputComponent(descriptionInput),
      new LabelBuilder()
        .setLabel('Screenshot')
        .setDescription('Optional. A new image replaces the current one.')
        .setFileUploadComponent(
          new FileUploadBuilder()
            .setCustomId(customIds.screenshot)
            .setMinValues(0)
            .setMaxValues(1)
            .setRequired(false)
        )
    );

    try {
      await interaction.showModal(modal);

      const modalSubmitInteraction = await interaction.awaitModalSubmit({
        time: 10 * 60 * 1000,
        filter: (action) => action.customId === modalCustomId
      });

      args.layout_link = modalSubmitInteraction.fields.getTextInputValue(customIds.link);
      args.notes = modalSubmitInteraction.fields.getTextInputValue(customIds.notes);
      const image = modalSubmitInteraction.fields.getUploadedFiles(customIds.screenshot)?.first();

      await modalSubmitInteraction.deferUpdate();

      if (image && !image.contentType?.startsWith('image/')) {
        return await modalSubmitInteraction.followUp({
          flags: MessageFlags.Ephemeral,
          content: 'The screenshot must be an image. Nothing was changed.'
        });
      }
      if (image) args.screenshot = image.url;

      return await this.handleSubmit(interaction, args);
    } catch (error) {
      if (!(
        error instanceof DiscordjsError &&
        error.code === DiscordjsErrorCodes.InteractionCollectorError
      )) {
        throw error;
      }
    }
  }

  public async handleSubmit(
    interaction:
      CommandInteraction<'cached'> | ButtonInteraction<'cached'> | ModalSubmitInteraction<'cached'>,
    args: LayoutCommandArgs
  ) {
    if (!args.layout_link || !LAYOUT_REGEX.test(args.layout_link)) {
      return interaction.followUp({
        flags: MessageFlags.Ephemeral,
        content: 'Invalid layout link was provided.'
      });
    }

    return this.postLayout({
      guild: interaction.guild,
      link: args.layout_link,
      screenshot: args.screenshot,
      notes: args.notes,
      downloads: args.downloads,
      userId: interaction.isButton()
        ? interaction.message.interactionMetadata?.user.id || interaction.user.id
        : interaction.user.id,
      canReact: interaction.appPermissions.has(PermissionFlagsBits.AddReactions),
      // Without `attachments: []` an edit keeps the old image next to the new one.
      send: (payload) =>
        interaction.editReply({ ...payload, ...(payload.files ? { attachments: [] } : {}) })
    });
  }

  /** Posts a layout the way `/layout` does and tracks it, so Copy Layout, downloads and voting work. */
  public async postLayout(input: {
    guild: Guild;
    link: string;
    screenshot?: string | null;
    notes?: string;
    downloads?: number;
    userId: string;
    canReact: boolean;
    send: (payload: BaseMessageOptions) => Promise<Message>;
  }) {
    const { guild, link } = input;
    const layoutId = new URL(link).searchParams.get('id')!;
    const label = layoutLabel(link) ?? 'Base Layout';
    const allowLayoutTracking = this.client.settings.get<boolean>(
      guild,
      Settings.ALLOW_LAYOUT_TRACKING,
      false
    );

    const layout = await this.collection.findOne({ guildId: guild.id, layoutId });
    const row = this.getComponents({
      screenshot: input.screenshot ?? '',
      notes: input.notes,
      layout_link: link,
      allow_layout_tracking: allowLayoutTracking,
      downloads: layout?.downloader?.length || input.downloads || 0
    });

    const msg = await input.send({
      components: [row],
      content: input.notes || `**${label}**`,
      ...(input.screenshot && { files: [new AttachmentBuilder(input.screenshot)] })
    });

    await this.collection.updateOne(
      { layoutId, guildId: guild.id },
      {
        $set: shake({
          label,
          notes: input.notes || null,
          link,
          imageUrl: input.screenshot ?? undefined,
          updatedAt: new Date()
        }),
        $addToSet: {
          messageIds: msg.id
        },
        $setOnInsert: {
          userId: input.userId,
          downloads: 0,
          downloader: [],
          votes: {
            up: [],
            down: []
          },
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    const isVotingEnabled = this.client.settings.get(guild, Settings.ALLOW_LAYOUT_VOTING, false);

    if (input.canReact && isVotingEnabled) {
      try {
        await msg.react(EMOJIS.WHITE_CHECK_MARK);
        await Util.delay(250);
        await msg.react(EMOJIS.RED_CHECK_MARK);
      } catch {}
    }
    return msg;
  }

  private async displayLink(interaction: ButtonInteraction<'cached'>, args: LayoutCommandArgs) {
    const filter = { messageIds: interaction.message.id, guildId: interaction.guild.id };
    // Only a read happens before showModal: the modal must open within Discord's 3 s window.
    const layout = await this.collection.findOne(filter, {
      projection: { notes: 1, label: 1, link: 1, downloader: 1 }
    });
    if (!layout)
      return interaction.reply({
        flags: MessageFlags.Ephemeral,
        content: 'Layout data not found.'
      });

    const customId = this.client.uuid();
    const modal = new ModalBuilder()
      .setTitle('Copy Layout')
      .setCustomId(customId)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          [
            layout.notes || `# ${layout.label}`,
            '\u200b',
            'Click the link below to copy the layout:',
            '',
            `${layout.link}`,
            '',
            'Thank you for using ClashPerk! ❤️'
          ].join('\n')
        )
      );

    try {
      await interaction.showModal(modal);

      await this.collection.updateOne(filter, { $addToSet: { downloader: interaction.user.id } });
      const isNew = !layout.downloader.includes(interaction.user.id);
      const row = this.getComponents({
        ...args,
        allow_layout_tracking: true,
        downloads: layout.downloader.length + (isNew ? 1 : 0)
      });
      await interaction.editReply({ components: [row] });

      const modalSubmitInteraction = await interaction.awaitModalSubmit({
        time: 10 * 60 * 1000,
        filter: (action) => action.customId === customId
      });

      return await modalSubmitInteraction.deferUpdate();
    } catch (error) {
      if (!(
        error instanceof DiscordjsError &&
        error.code === DiscordjsErrorCodes.InteractionCollectorError
      )) {
        throw error;
      }
    }
  }

  private async viewDownloader(interaction: ButtonInteraction<'cached'>) {
    const layout = await this.collection.findOne({
      messageIds: interaction.message.id,
      guildId: interaction.guild.id
    });
    if (!layout) {
      return interaction.reply({
        flags: MessageFlags.Ephemeral,
        content: 'Layout data not found.'
      });
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    for (const content of Util.splitMessage(
      `Total Downloads: ${layout.downloader.length}\n\n${layout.downloader
        .map((id, index) => `${index + 1}. <@${id}>`)
        .join('\n')}`
    )) {
      await interaction.followUp({
        flags: MessageFlags.Ephemeral,
        content,
        allowedMentions: { users: [] }
      });
    }
  }

  private getComponents(args: LayoutCommandArgs) {
    const row = new ActionRowBuilder<ButtonBuilder>();

    const editButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setCustomId(this.createId({ cmd: this.id, defer: false, has_description: !!args.notes }))
      .setLabel('Edit');

    if (args.allow_layout_tracking) {
      const viewersButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId(
          this.createId({
            cmd: this.id,
            defer: false,
            display_viewers: true
          })
        )
        .setLabel(`${args.downloads || 0} ${pluralize('Download', args.downloads || 0)}`);

      row.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setLabel('Copy Layout')
          .setEmoji(EMOJIS.LINK)
          .setCustomId(
            this.createId({
              cmd: this.id,
              defer: false,
              display_link: true
            })
          )
      );
      row.addComponents(editButton, viewersButton);
    } else {
      row.addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('Copy Layout')
          .setURL(args.layout_link!)
      );
      row.addComponents(editButton);
    }

    return row;
  }

  private getUrlFromInteractionComponents(interaction: ButtonInteraction) {
    const actionRow = interaction.message.components[0];
    if (actionRow.type === ComponentType.ActionRow) {
      const button = actionRow.components[0];
      if (button.type === ComponentType.Button) {
        return button.url;
      }
    }
  }
}

interface LayoutCommandArgs {
  screenshot: string;
  notes?: string;
  has_description?: boolean;
  layout_link?: string;
  display_link?: boolean;
  display_viewers?: boolean;

  downloads?: number;
  allow_layout_tracking?: boolean;
}
