import { AxiosError } from 'axios';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ComponentType,
  MessageFlags
} from 'discord.js';
import { api } from '../../api/axios.js';
import { ContentType } from '../../api/generated.js';
import { Command } from '../../lib/handlers.js';

/** The "Started …" button on an upgrade planner DM: marks the upgrade started for the API's plan. */
export default class UpgradeStartedCommand extends Command {
  public constructor() {
    super('upgrade-started', {
      category: 'none',
      channel: 'dm',
      defer: true
    });
  }

  public async exec(
    interaction: ButtonInteraction,
    args: { tag: string; item: number; lvl: number }
  ) {
    try {
      await api.http.request({
        path: `/users/me/upgrade-planner/${encodeURIComponent(args.tag)}/started`,
        method: 'POST',
        body: { itemId: args.item, fromLevel: args.lvl },
        type: ContentType.Json,
        secure: true,
        headers: { 'x-user-id': interaction.user.id }
      });
    } catch (error) {
      const status = (error as AxiosError).response?.status;
      return interaction.followUp({
        content:
          status === 404
            ? 'That account has no game data saved on the dashboard any more.'
            : 'Could not save that. Try again in a minute.',
        flags: MessageFlags.Ephemeral
      });
    }
    return interaction.editReply({ components: this.markStarted(interaction) });
  }

  /** The same buttons, with the one that was pressed turned into a disabled "Started". */
  private markStarted(interaction: ButtonInteraction) {
    return interaction.message.components.flatMap((row) => {
      if (row.type !== ComponentType.ActionRow) return [];
      const buttons = row.components.flatMap((component) => {
        if (component.type !== ComponentType.Button) return [];
        const button = ButtonBuilder.from(component);
        if (component.customId !== interaction.customId) return [button];
        return [button.setLabel('Started').setStyle(ButtonStyle.Secondary).setDisabled(true)];
      });
      return [new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)];
    });
  }
}
