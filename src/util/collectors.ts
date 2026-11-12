import {
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  CommandInteraction,
  DiscordjsError,
  DiscordjsErrorCodes,
  Message,
  MessageComponentInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction
} from 'discord.js';
import { container } from 'tsyringe';
import { Client } from '../struct/client.js';

// An expired interaction or deleted message must not become an unhandled rejection.
export function logFailures<T extends unknown[]>(
  label: string,
  listener: (...args: T) => Promise<unknown>
) {
  return (...args: T) => {
    listener(...args).catch((error: Error) => {
      container.resolve(Client).logger.error(`${label} ~ ${error.message}`, { label: 'COLLECTOR' });
    });
  };
}

export const createInteractionCollector = ({
  customIds,
  onClick,
  onSelect,
  onUserSelect,
  onRoleSelect,
  onChannelSelect,
  onClose,
  interaction,
  message,
  clear
}: {
  customIds: Record<string, string>;
  onClick?: (interaction: ButtonInteraction<'cached'>) => unknown;
  onSelect?: (interaction: StringSelectMenuInteraction<'cached'>) => unknown;
  onUserSelect?: (interaction: UserSelectMenuInteraction<'cached'>) => unknown;
  onRoleSelect?: (interaction: RoleSelectMenuInteraction<'cached'>) => unknown;
  onChannelSelect?: (interaction: ChannelSelectMenuInteraction<'cached'>) => unknown;
  onClose?: () => unknown;
  interaction: CommandInteraction<'cached'> | MessageComponentInteraction<'cached'>;
  message: Message<true>;
  clear?: boolean;
}) => {
  const client = container.resolve(Client);

  const collector = message.createMessageComponentCollector({
    time: 10 * 60 * 1000,
    filter: (action) =>
      Object.values(customIds).includes(action.customId) && action.user.id === interaction.user.id
  });

  collector.on(
    'collect',
    logFailures('component', async (action: MessageComponentInteraction<'cached'>) => {
      if (action.isButton()) await onClick?.(action);
      if (action.isStringSelectMenu()) await onSelect?.(action);
      if (action.isUserSelectMenu()) await onUserSelect?.(action);
      if (action.isRoleSelectMenu()) await onRoleSelect?.(action);
      if (action.isChannelSelectMenu()) await onChannelSelect?.(action);
    })
  );

  collector.on(
    'end',
    logFailures('component end', async (_, reason: string) => {
      onClose?.();
      Object.values(customIds).forEach((id) => client.components.delete(id));
      if (!/delete/i.test(reason) && clear) await interaction.editReply({ components: [] });
    })
  );

  return collector;
};

/** Handles a modal submit without blocking the command, so its span doesn't time the user filling it in. */
export const createModalCollector = ({
  customId,
  interaction,
  onSubmit
}: {
  customId: string;
  interaction: CommandInteraction<'cached'> | MessageComponentInteraction<'cached'>;
  onSubmit: (interaction: ModalSubmitInteraction<'cached'>) => unknown;
}) => {
  interaction
    .awaitModalSubmit({ time: 10 * 60 * 1000, filter: (action) => action.customId === customId })
    .then(
      logFailures('modal', async (action: ModalSubmitInteraction<'cached'>) => onSubmit(action))
    )
    .catch((error) => {
      if (
        error instanceof DiscordjsError &&
        error.code === DiscordjsErrorCodes.InteractionCollectorError
      )
        return;
      container.resolve(Client).logger.error(`modal ~ ${error.message}`, { label: 'COLLECTOR' });
    });
};
