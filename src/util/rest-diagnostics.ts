import { DefaultRestOptions, RESTOptions, SnowflakeUtil } from 'discord.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import diagnostics from 'node:diagnostics_channel';
import type { Socket } from 'node:net';
import { container } from 'tsyringe';
import { Client } from '../struct/client.js';

// discord.js aborts a request at its timeout, so an abort this late is that timeout.
const TIMED_OUT_MS = DefaultRestOptions.timeout - 1000;
const LAG_SAMPLE_MS = 500;
const LAG_SAMPLES = Math.ceil(DefaultRestOptions.timeout / LAG_SAMPLE_MS) + 2;
const RETRY_TTL_MS = 2 * 60_000;
const CALLBACK_PATH = /\/interactions\/(\d+)\/[^/]+\/callback$/;

type Stage = 'waiting for a connection' | 'sending' | 'sent, no response' | 'answered';

interface SocketInfo {
  connectedAt: number;
  requests: number;
  lastUsedAt: number;
}

interface Attempt {
  startedAt: number;
  stage: Stage;
  socket?: Socket;
  connection?: string;
}

interface TimedOut {
  id: number;
  tries: number;
  at: number;
}

const store = new AsyncLocalStorage<Attempt>();
const attempts = new WeakMap<object, Attempt>();
const sockets = new WeakMap<Socket, SocketInfo>();
// Keyed by method and full URL, which holds the token, so it stays in memory and is never logged.
const timedOut = new Map<string, TimedOut>();
const lagSamples: number[] = [];
let inFlight = 0;
let nextId = 0;
let started = false;

const seconds = (ms: number) => `${(ms / 1000).toFixed(1)} s`;

function routeOf(url: string) {
  return new URL(url).pathname
    .replace(/^\/api\/v\d+/, '')
    .replace(/\/(interactions|webhooks)\/\d+\/[^/]+/, '/$1/:id/:token')
    .replace(/\/\d{16,}/g, '/:id');
}

function subscribe() {
  diagnostics.subscribe('undici:client:connected', (message) => {
    const { connectParams, socket } = message as {
      connectParams: { hostname: string };
      socket: Socket;
    };
    if (connectParams.hostname !== 'discord.com') return;
    sockets.set(socket, { connectedAt: Date.now(), requests: 0, lastUsedAt: Date.now() });
  });

  diagnostics.subscribe('undici:request:create', (message) => {
    const attempt = store.getStore();
    if (attempt) attempts.set((message as { request: object }).request, attempt);
  });

  diagnostics.subscribe('undici:client:sendHeaders', (message) => {
    const { request, socket } = message as { request: object; socket: Socket };
    const attempt = attempts.get(request);
    if (!attempt) return;
    attempt.stage = 'sending';
    attempt.socket = socket;

    const info = sockets.get(socket);
    if (!info) {
      attempt.connection = 'opened before tracking';
      return;
    }
    const now = Date.now();
    attempt.connection = info.requests
      ? `reused, request #${info.requests + 1}, idle ${seconds(now - info.lastUsedAt)}, open ${seconds(now - info.connectedAt)}`
      : `new, opened ${seconds(now - info.connectedAt)} ago`;
    info.requests++;
    info.lastUsedAt = now;
  });

  diagnostics.subscribe('undici:request:bodySent', (message) => {
    const attempt = attempts.get((message as { request: object }).request);
    if (attempt) attempt.stage = 'sent, no response';
  });

  diagnostics.subscribe('undici:request:headers', (message) => {
    const attempt = attempts.get((message as { request: object }).request);
    if (!attempt) return;
    attempt.stage = 'answered';
    const info = attempt.socket && sockets.get(attempt.socket);
    if (info) info.lastUsedAt = Date.now();
  });

  // Drift of a 500 ms timer: shows whether our own event loop stalled while a request hung.
  let expected = Date.now() + LAG_SAMPLE_MS;
  setInterval(() => {
    const now = Date.now();
    lagSamples.push(Math.max(0, now - expected));
    if (lagSamples.length > LAG_SAMPLES) lagSamples.shift();
    expected = now + LAG_SAMPLE_MS;

    for (const [key, entry] of timedOut) {
      if (now - entry.at > RETRY_TTL_MS) timedOut.delete(key);
    }
  }, LAG_SAMPLE_MS).unref();
}

function warn(message: string) {
  container.resolve(Client).logger.warn(message, { label: 'DISCORD_REST' });
}

/** Logs each Discord request that hits the discord.js timeout, with where it stopped, and how its retry ended. */
export function diagnoseRequests(
  makeRequest: RESTOptions['makeRequest']
): RESTOptions['makeRequest'] {
  if (!started) {
    started = true;
    subscribe();
  }

  return async (url, init) => {
    const key = `${init.method ?? 'GET'} ${url}`;
    const previous = timedOut.get(key);
    timedOut.delete(key);

    const route = `${init.method ?? 'GET'} ${routeOf(url)}`;
    const attempt: Attempt = { startedAt: Date.now(), stage: 'waiting for a connection' };
    const others = inFlight++;

    try {
      const res = await store.run(attempt, () => makeRequest(url, init));
      if (previous) {
        const outcome = `Discord request retry answered ${res.status}: ${route} · try ${previous.tries + 1} · id ${previous.id}`;
        if (res.status < 400) {
          warn(outcome);
        } else {
          // The Discord error code (10062, 40060) is in the body, which discord.js reads later.
          const json = res.json.bind(res);
          Object.defineProperty(res, 'json', {
            value: async () => {
              const data = await json();
              warn(`${outcome} · code ${(data as { code?: number })?.code ?? 'none'}`);
              return data;
            }
          });
        }
      }
      return res;
    } catch (error) {
      const elapsed = Date.now() - attempt.startedAt;
      if (init.signal?.aborted && elapsed >= TIMED_OUT_MS) {
        const entry = {
          id: previous?.id ?? ++nextId,
          tries: (previous?.tries ?? 0) + 1,
          at: Date.now()
        };
        timedOut.set(key, entry);

        const callback = CALLBACK_PATH.exec(url);
        const parts = [
          `Discord request timed out after ${seconds(elapsed)}: ${route}`,
          `try ${entry.tries}`,
          `stage: ${attempt.stage}`,
          `connection: ${attempt.connection ?? 'none'}`,
          callback
            ? `interaction age at send ${attempt.startedAt - SnowflakeUtil.timestampFrom(callback[1])} ms`
            : null,
          `${others} other requests in flight`,
          `max loop lag ${Math.max(0, ...lagSamples)} ms`,
          `id ${entry.id}`
        ];
        warn(parts.filter(Boolean).join(' · '));
      } else if (previous) {
        warn(
          `Discord request retry failed (${(error as Error).name}): ${route} · try ${previous.tries + 1} · id ${previous.id}`
        );
      }
      throw error;
    } finally {
      inFlight--;
    }
  };
}
