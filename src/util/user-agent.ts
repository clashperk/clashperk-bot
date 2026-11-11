import { getInfo } from 'discord-hybrid-sharding';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../../../package.json', import.meta.url), 'utf8')) as {
  version: string;
};

/** `clashperk/<version>/<cluster>`, plus ` (<application id>)` once the bot has logged in. */
export function userAgent(applicationId?: string) {
  const base = `clashperk/${pkg.version}/${getInfo().CLUSTER}`;
  return applicationId ? `${base} (${applicationId})` : base;
}
