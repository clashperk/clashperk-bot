import { collectDefaultMetrics, Counter, Histogram, register } from '@prometheus-io/client';
import { getInfo } from 'discord-hybrid-sharding';
import { Events, Interaction, InteractionType, RESTEvents, SnowflakeUtil } from 'discord.js';
import type { Client } from '../struct/client.js';

const PUSH_INTERVAL_MS = 30_000;
// Discord drops an interaction that isn't answered within 3 s, so the buckets cluster around it.
const AGE_BUCKETS = [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 6];
const CALLBACK_PATH = /^\/interactions\/(\d+)\/[^/]+\/callback/;
// Interactions we never answer (e.g. debounced autocomplete keystrokes) are dropped after this.
const TYPE_TTL_SECONDS = 30;
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
  const pending = new Map<string, { type: string; command: string | null }>();

  // Prepended so the age is taken before any other interaction listener runs.
  client.prependListener(Events.InteractionCreate, (interaction) => {
    const type = InteractionType[interaction.type];
    pending.set(interaction.id, { type, command: commandOf(interaction) });
    receivedAge.observe({ type }, ageOf(interaction.id));
  });

  client.rest.on(RESTEvents.Response, (request, response) => {
    const id = request.method.toLowerCase() === 'post' && CALLBACK_PATH.exec(request.path)?.[1];
    if (!id) return;
    const { type, command } = pending.get(id) ?? { type: 'other', command: null };
    pending.delete(id);
    const age = ageOf(id);
    const outcome = response.status < 300 ? 'ok' : response.status === 404 ? 'unknown' : 'error';
    responseAge.observe({ type, outcome }, age);
    if (command) {
      const result = outcome === 'ok' && age > SLOW_SECONDS ? 'slow' : outcome;
      commandResponses.inc({ command, result });
    }
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
    return push();
  }, PUSH_INTERVAL_MS).unref();
}
