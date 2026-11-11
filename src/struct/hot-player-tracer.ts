import * as Sentry from '@sentry/node';

const WINDOW_MS = 10 * 60_000;
// Fetches of one tag per window, per cluster. A many-account user's links add up slowly across clusters.
const HOT_AFTER = 20;
// Fetches of one tag within the same second: one operation fetching a player again and again.
const BURST_AFTER = 5;
const TRACE_AFTER = 5;
const MAX_CALL_SITES = 5;
const STACK_DEPTH = 25;

interface HotPlayer {
  count: number;
  second: number;
  inSecond: number;
  maxPerSecond: number;
  callSites: Map<string, number>;
}

/** Finds which code keeps fetching the same player, and reports it to Sentry every 10 minutes. */
export class HotPlayerTracer {
  private players = new Map<string, HotPlayer>();

  public constructor(private readonly cluster: number) {
    setInterval(() => this.flush(), WINDOW_MS).unref();
  }

  // Stacks are only captured once a tag is warm, so normal traffic costs one map lookup.
  public record(tag: string, caller: (...args: never[]) => unknown) {
    let player = this.players.get(tag);
    if (!player) {
      player = { count: 0, second: 0, inSecond: 0, maxPerSecond: 0, callSites: new Map() };
      this.players.set(tag, player);
    }

    const second = Math.floor(Date.now() / 1000);
    player.inSecond = player.second === second ? player.inSecond + 1 : 1;
    player.second = second;
    player.maxPerSecond = Math.max(player.maxPerSecond, player.inSecond);
    player.count += 1;
    if (player.count < TRACE_AFTER && player.inSecond < 2) return;

    const site = callSite(caller);
    player.callSites.set(site, (player.callSites.get(site) ?? 0) + 1);
  }

  private flush() {
    const players = this.players;
    this.players = new Map();

    for (const [tag, { count, maxPerSecond, callSites }] of players) {
      const burst = maxPerSecond >= BURST_AFTER;
      if (count < HOT_AFTER && !burst) continue;

      const ranked = [...callSites].sort((a, b) => b[1] - a[1]).slice(0, MAX_CALL_SITES);
      const topSite = ranked[0]?.[0] ?? 'unknown';
      const title = burst
        ? `Player fetched ${maxPerSecond} times in one second`
        : `Player fetched ${count} times in 10 minutes`;
      Sentry.captureMessage(title, {
        level: 'warning',
        fingerprint: ['hot-player', burst ? 'burst' : 'hot', topSite.replace(/:\d+:\d+/g, '')],
        tags: { player_tag: tag, cluster: this.cluster, kind: burst ? 'burst' : 'hot' },
        extra: { count, maxPerSecond, callSites: Object.fromEntries(ranked) }
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
