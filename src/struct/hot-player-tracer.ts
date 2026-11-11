import * as Sentry from '@sentry/node';

const WINDOW_MS = 60_000;
// Fetches of one tag per minute, per cluster.
const HOT_AFTER = 30;
const TRACE_AFTER = 10;
const MAX_CALL_SITES = 5;
const STACK_DEPTH = 25;

interface HotPlayer {
  count: number;
  callSites: Map<string, number>;
}

/** Finds which code keeps fetching the same player, and reports it to Sentry once a minute. */
export class HotPlayerTracer {
  private players = new Map<string, HotPlayer>();

  public constructor(private readonly cluster: number) {
    setInterval(() => this.flush(), WINDOW_MS).unref();
  }

  // Stacks are only captured once a tag is warm, so normal traffic costs one map lookup.
  public record(tag: string, caller: (...args: never[]) => unknown) {
    let player = this.players.get(tag);
    if (!player) {
      player = { count: 0, callSites: new Map() };
      this.players.set(tag, player);
    }

    player.count += 1;
    if (player.count < TRACE_AFTER) return;

    const site = callSite(caller);
    player.callSites.set(site, (player.callSites.get(site) ?? 0) + 1);
  }

  private flush() {
    const players = this.players;
    this.players = new Map();

    for (const [tag, { count, callSites }] of players) {
      if (count < HOT_AFTER) continue;

      const ranked = [...callSites].sort((a, b) => b[1] - a[1]).slice(0, MAX_CALL_SITES);
      const topSite = ranked[0]?.[0] ?? 'unknown';
      Sentry.captureMessage(`Player fetched ${count} times in a minute`, {
        level: 'warning',
        fingerprint: ['hot-player', topSite.replace(/:\d+:\d+/g, '')],
        tags: { player_tag: tag, cluster: this.cluster },
        extra: { count, callSites: Object.fromEntries(ranked) }
      });
    }
  }
}

export function callSite(caller: (...args: never[]) => unknown) {
  const holder: { stack?: string } = {};
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = STACK_DEPTH;
  Error.captureStackTrace(holder, caller);
  Error.stackTraceLimit = limit;

  const frames = (holder.stack ?? '')
    .split('\n')
    .slice(1)
    .map((line) => line.trim().replace(/^at /, ''));
  const own = frames
    .filter((frame) => frame.includes('/src/') && !/node_modules|clash-client/.test(frame))
    .map((frame) => frame.replace(/(file:\/\/)?\/\S*?\/src\//, 'src/'));

  return own.slice(0, 3).join(' < ') || frames[0] || 'unknown';
}
