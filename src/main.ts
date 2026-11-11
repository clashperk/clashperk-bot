import 'reflect-metadata';

import sentry from './util/sentry.js';
sentry();

import * as Sentry from '@sentry/node';
import { DiscordAPIError } from 'discord.js';
import i18next from 'i18next';
import 'moment-duration-format';
import { fileURLToPath } from 'node:url';
import { inspect } from 'node:util';
import { errorStack } from './util/logger.js';
import { Client } from './struct/client.js';
import { Backend } from './util/i18n.backend.js';
import { defaultOptions } from './util/i18n.config.js';

const client = new Client();

const locales = new URL('../locales/{{lng}}/{{ns}}.json', import.meta.url);
await i18next.use(Backend).init({
  ...defaultOptions,
  backend: { paths: [fileURLToPath(locales)] }
});

client.on('error', (error) => {
  console.error(errorStack(error));
  Sentry.captureException(error);
});

client.on('warn', (warn) => {
  console.error(inspect(warn, { depth: Infinity }));
  Sentry.captureMessage(warn);
});

process.on('unhandledRejection', (error: DiscordAPIError) => {
  console.error(errorStack(error));
  Sentry.captureException(error);
});

await client.init(process.env.DISCORD_TOKEN!);
