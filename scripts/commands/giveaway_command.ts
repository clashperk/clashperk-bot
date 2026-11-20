import { ApplicationCommandOptionType, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';
import { channelTypes } from './@helper.js';

const giveawayOption = {
  name: 'giveaway',
  description: 'The giveaway to act on.',
  type: ApplicationCommandOptionType.String,
  autocomplete: true,
  required: true
} as const;

export const GIVEAWAY_COMMAND: RESTPostAPIApplicationCommandsJSONBody = {
  name: 'giveaway',
  description: 'Run a giveaway with an Enter button and an automatic draw.',
  dm_permission: false,
  options: [
    {
      name: 'create',
      description: 'Post a giveaway with an Enter button.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'prize',
          description: 'What members can win.',
          type: ApplicationCommandOptionType.String,
          max_length: 256,
          required: true
        },
        {
          name: 'duration',
          description: 'How long it runs, such as 24h, 3d or 1h30m.',
          type: ApplicationCommandOptionType.String,
          required: true
        },
        {
          name: 'winners',
          description: 'How many winners to draw. Default 1.',
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 50
        },
        {
          name: 'channel',
          description: 'Where to post it. Defaults to this channel.',
          type: ApplicationCommandOptionType.Channel,
          channel_types: channelTypes
        },
        {
          name: 'mode',
          description: 'Who can enter and how odds work. Default open.',
          type: ApplicationCommandOptionType.String,
          choices: [
            { name: 'Open — everyone, equal odds', value: 'open' },
            { name: 'Boosted — clan members get better odds', value: 'boosted' },
            { name: 'Restricted — clan members only', value: 'restricted' }
          ]
        },
        {
          name: 'boost_factor',
          description: 'For boosted mode: how many times the odds for clan members. Default 2.',
          type: ApplicationCommandOptionType.Integer,
          min_value: 2,
          max_value: 100
        },
        {
          name: 'image',
          description: 'A banner image to show in the giveaway.',
          type: ApplicationCommandOptionType.Attachment
        }
      ]
    },
    {
      name: 'end',
      description: 'Draw the winners now and end a giveaway.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [giveawayOption]
    },
    {
      name: 'reroll',
      description: 'Draw a fresh set of winners for an ended giveaway.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [giveawayOption]
    },
    {
      name: 'cancel',
      description: 'Cancel a giveaway without drawing.',
      type: ApplicationCommandOptionType.Subcommand,
      options: [giveawayOption]
    },
    {
      name: 'list',
      description: 'List the active giveaways on this server.',
      type: ApplicationCommandOptionType.Subcommand
    }
  ]
};
