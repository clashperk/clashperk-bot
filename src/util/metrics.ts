import { collectDefaultMetrics, Counter, Histogram, register } from '@prometheus-io/client';
import { getInfo } from 'discord-hybrid-sharding';
import {
  Events,
  Interaction,
  InteractionResponseType,
  InteractionType,
  RESTEvents,
  SnowflakeUtil
} from 'discord.js';
import type { Client } from '../struct/client.js';

const PUSH_INTERVAL_MS = 30_000;
// Discord drops an interaction that isn't answered within 3 s, so the buckets cluster around it.
const AGE_BUCKETS = [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 6];
const REPLY_BUCKETS = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 20];
const CALLBACK_PATH = /^\/interactions\/(\d+)\/[^/]+\/callback/;
// The first edit of a deferred reply, or its first follow-up.
const WEBHOOK_PATH = /^\/webhooks\/\d+\/([^/?]+)(\/messages\/(?:@|%40)original)?$/;
const DEFERRED = [
  InteractionResponseType.DeferredChannelMessageWithSource,
  InteractionResponseType.DeferredMessageUpdate
];
// Interactions we never answer (e.g. debounced autocomplete keystrokes) are dropped after this.
const TYPE_TTL_SECONDS = 30;
// A deferred interaction's token lasts 15 minutes.
const DEFERRED_TTL_SECONDS = 15 * 60;
// A command answered later than this counts as "slow": it is close to Discord's 3 s limit.
const SLOW_SECONDS = 2;

const receivedAge = new Histogram({
  name: 'discord_interaction_age_seconds',
  help: 'Interaction age when the bot receives it',
  labelNames: ['type'],
  buckets: AGE_BUCKETS
});

const responseAge = new Histogram({
  name: 'discord_interaction_response_age_seconds',
  help: 'Interaction age when Discord answers our first response; outcome "unknown" means it had already expired (10062)',
  labelNames: ['type', 'outcome'],
  buckets: AGE_BUCKETS
});

// A counter, not a histogram: a histogram per command per cluster would be tens of thousands of series.
const commandResponses = new Counter({
  name: 'discord_command_responses_total',
  help: 'First responses to slash and context-menu commands; result is ok, slow (after 2 s), unknown (10062) or error',
  labelNames: ['command', 'result']
});

const replyAge = new Histogram({
  name: 'discord_interaction_reply_age_seconds',
  help: 'Interaction age when its reply is visible: the first response, or for a deferred one its first edit or follow-up',
  labelNames: ['type'],
  buckets: REPLY_BUCKETS
});

// Divided by discord_command_responses_total{result=~"ok|slow"}, this is the mean reply age per command.
const commandReplySeconds = new Counter({
  name: 'discord_command_reply_seconds_total',
  help: 'Summed interaction age when the reply is visible, per slash or context-menu command',
  labelNames: ['command']
});

/** Command name with its subcommand group and subcommand, e.g. "history clan-games"; null if not a command. */
function commandOf(interaction: Interaction) {
  if (interaction.isChatInputCommand()) {
    const parts = [
      interaction.commandName,
      interaction.options.getSubcommandGroup(false),
      interaction.options.getSubcommand(false)
    ];
    return parts.filter(Boolean).join(' ');
  }
  return interaction.isContextMenuCommand() ? interaction.commandName : null;
}

const ageOf = (id: string) => (Date.now() - SnowflakeUtil.timestampFrom(id)) / 1000;

/** Pushes this cluster's metrics to VictoriaMetrics; off unless METRICS_PUSH_URL is set. */
export function startMetrics(client: Client) {
  const url = process.env.METRICS_PUSH_URL;
  if (!url) return;

  const { METRICS_PUSH_USER: user, METRICS_PUSH_PASSWORD: password } = process.env;
  if (!user || !password) {
    throw new Error('METRICS_PUSH_USER and METRICS_PUSH_PASSWORD are required');
  }

  collectDefaultMetrics();

  // The callback request only carries the interaction id, so keep each id's details until it is answered.
  const pending = new Map<string, { type: string; command: string | null; token: string }>();
  // Deferred interactions waiting for their first edit or follow-up, by token.
  const deferred = new Map<string, { id: string; type: string; command: string | null }>();

  const replied = (id: string, type: string, command: string | null) => {
    const age = ageOf(id);
    replyAge.observe({ type }, age);
    if (command) commandReplySeconds.inc({ command }, age);
  };

  // Prepended so the age is taken before any other interaction listener runs.
  client.prependListener(Events.InteractionCreate, (interaction) => {
    const type = InteractionType[interaction.type];
    pending.set(interaction.id, {
      type,
      command: commandOf(interaction),
      token: interaction.token
    });
    receivedAge.observe({ type }, ageOf(interaction.id));
  });

  client.rest.on(RESTEvents.Response, (request, response) => {
    const method = request.method.toLowerCase();
    const webhook = WEBHOOK_PATH.exec(request.path);
    if (webhook && response.status < 300 && (method === 'patch') === Boolean(webhook[2])) {
      const entry = deferred.get(webhook[1]);
      if (entry) {
        deferred.delete(webhook[1]);
        replied(entry.id, entry.type, entry.command);
      }
      return;
    }

    const id = method === 'post' && CALLBACK_PATH.exec(request.path)?.[1];
    if (!id) return;
    const { type, command, token } = pending.get(id) ?? {
      type: 'other',
      command: null,
      token: null
    };
    pending.delete(id);
    const age = ageOf(id);
    const outcome = response.status < 300 ? 'ok' : response.status === 404 ? 'unknown' : 'error';
    responseAge.observe({ type, outcome }, age);
    if (command) {
      const result = outcome === 'ok' && age > SLOW_SECONDS ? 'slow' : outcome;
      commandResponses.inc({ command, result });
    }
    if (outcome !== 'ok' || !token) return;
    const body = request.data.body as { type?: InteractionResponseType } | undefined;
    if (body?.type != null && DEFERRED.includes(body.type))
      deferred.set(token, { id, type, command });
    else replied(id, type, command);
  });

  const target = new URL(url);
  target.searchParams.append('extra_label', 'job=bot');
  target.searchParams.append('extra_label', `cluster=${getInfo().CLUSTER}`);
  const auth = `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;

  let failing = false;
  const push = async () => {
    try {
      const res = await fetch(target, {
        method: 'POST',
        headers: { 'Authorization': auth, 'Content-Type': register.contentType },
        body: await register.metrics(),
        signal: AbortSignal.timeout(10_000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (failing) client.logger.info('Metrics push recovered', { label: 'METRICS' });
      failing = false;
    } catch (error) {
      // Log once per outage, not every 30s.
      if (!failing)
        client.logger.warn(`Metrics push failed: ${(error as Error).message}`, {
          label: 'METRICS'
        });
      failing = true;
    }
  };
  setInterval(() => {
    for (const id of pending.keys()) if (ageOf(id) > TYPE_TTL_SECONDS) pending.delete(id);
    for (const [token, { id }] of deferred)
      if (ageOf(id) > DEFERRED_TTL_SECONDS) deferred.delete(token);
    return push();
  }, PUSH_INTERVAL_MS).unref();
}
