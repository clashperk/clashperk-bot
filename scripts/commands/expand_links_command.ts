import { ApplicationCommandType, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { guildInstallable } from './@helper.js';

export const EXPAND_LINKS_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
  name: 'Expand Clash link',
  type: ApplicationCommandType.Message,
  dm_permission: false,
  ...guildInstallable
};
