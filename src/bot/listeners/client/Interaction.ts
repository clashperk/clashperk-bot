import { Interaction } from 'discord.js';
import { Listener } from '../../lib/index.js';
import { Settings } from '../../util/Constants.js';

export default class InteractionListener extends Listener {
	public constructor() {
		super('interaction', {
			emitter: 'client',
			category: 'client',
			event: 'interactionCreate'
		});
	}

	public exec(interaction: Interaction) {
		this.contextInteraction(interaction);
		this.componentInteraction(interaction);
	}

	private async contextInteraction(interaction: Interaction) {
		if (!interaction.isContextMenuCommand()) return;
		if (this.inhibitor(interaction)) return;
		if (!interaction.inCachedGuild()) return;

		const command = this.client.commandHandler.modules.get(interaction.commandName.toLowerCase());
		if (!command) return;
		if (this.client.commandHandler.preInhibitor(interaction, command)) return;

		const args = interaction.isMessageContextMenuCommand()
			? { message: interaction.options.getMessage('message')?.content ?? '' }
			: { member: interaction.options.getMember('user') };
		return this.client.commandHandler.exec(interaction, command, args);
	}

	private async componentInteraction(interaction: Interaction) {
		if (!interaction.isButton() && !interaction.isSelectMenu()) return;
		if (this.inhibitor(interaction)) return;

		const userIds = this.client.components.get(interaction.customId);
		if (userIds?.length && userIds.includes(interaction.user.id)) return;
		if (userIds?.length && !userIds.includes(interaction.user.id)) {
			this.client.logger.debug(`[${interaction.guild!.name}/${interaction.user.tag}]`, {
				label: 'COMPONENT_BLOCKED'
			});
			return interaction.reply({
				content: this.i18n('common.component.unauthorized', { lng: interaction.locale }),
				ephemeral: true
			});
		}

		if (this.client.components.has(interaction.customId)) return;

		this.client.logger.debug(`[${interaction.guild!.name}/${interaction.user.tag}]`, {
			label: 'COMPONENT_EXPIRED'
		});
		await interaction.update({ components: [] });
		return interaction.followUp({
			content: this.i18n('common.component.expired', { lng: interaction.locale }),
			ephemeral: true
		});
	}

	private inhibitor(interaction: Interaction) {
		if (!interaction.inGuild()) return true;

		const guilds = this.client.settings.get<string[]>('global', Settings.GUILD_BLACKLIST, []);
		if (guilds.includes(interaction.guildId)) return true;

		const users = this.client.settings.get<string[]>('global', Settings.USER_BLACKLIST, []);
		return users.includes(interaction.user.id);
	}
}
