import { collectDefaultMetrics, Histogram, register } from '@prometheus-io/client';
import { getInfo } from 'discord-hybrid-sharding';
import { Events, InteractionType, RESTEvents, SnowflakeUtil } from 'discord.js';
import type { Client } from '../struct/client.js';

const PUSH_INTERVAL_MS = 30_000;
// Discord drops an interaction that isn't answered within 3 s, so the buckets cluster around it.
const AGE_BUCKETS = [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 4, 6];
const CALLBACK_PATH = /^\/interactions\/(\d+)\/[^/]+\/callback/;
// Interactions we never answer (e.g. debounced autocomplete keystrokes) are dropped after this.
const TYPE_TTL_SECONDS = 30;

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

  // The callback request only carries the interaction id, so keep each id's type until it is answered.
  const types = new Map<string, string>();

  // Prepended so the age is taken before any other interaction listener runs.
  client.prependListener(Events.InteractionCreate, (interaction) => {
    const type = InteractionType[interaction.type];
    types.set(interaction.id, type);
    receivedAge.observe({ type }, ageOf(interaction.id));
  });

  client.rest.on(RESTEvents.Response, (request, response) => {
    const id = request.method.toLowerCase() === 'post' && CALLBACK_PATH.exec(request.path)?.[1];
    if (!id) return;
    const type = types.get(id) ?? 'other';
    types.delete(id);
    const outcome = response.status < 300 ? 'ok' : response.status === 404 ? 'unknown' : 'error';
    responseAge.observe({ type, outcome }, ageOf(id));
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
    for (const id of types.keys()) if (ageOf(id) > TYPE_TTL_SECONDS) types.delete(id);
    return push();
  }, PUSH_INTERVAL_MS).unref();
}
