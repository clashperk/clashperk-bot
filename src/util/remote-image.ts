import { userAgent } from './user-agent.js';

// Cloudflare downloads the image, so hosts that block our servers (imgur) still work and the bot never
// requests a user's URL itself. Cloudflare also refuses private addresses.
const TRANSFORM_BASE_URL = 'https://clashperk.com/cdn-cgi/image';
const TIMEOUT_MS = 10_000;
const MAX_BYTES = 8 * 1024 * 1024;

export interface RemoteImage {
  data: Buffer;
  contentType: string;
}

export type RemoteImageResult =
  | { ok: true; image: RemoteImage }
  | { ok: false; reason: 'invalid_url' | 'not_image' | 'too_large' | 'unreachable' };

/** Downloads a user's image URL through Cloudflare. Without `format` the original format is kept (GIFs stay animated). */
export async function fetchRemoteImage(
  url: string,
  { format }: { format?: 'jpeg' | 'png' } = {}
): Promise<RemoteImageResult> {
  let source: URL;
  try {
    source = new URL(url);
  } catch {
    return { ok: false, reason: 'invalid_url' };
  }
  if (source.protocol !== 'https:' && source.protocol !== 'http:') {
    return { ok: false, reason: 'invalid_url' };
  }

  const options = ['fit=scale-down', 'width=1920', ...(format ? [`format=${format}`] : [])];
  const headers = { 'User-Agent': userAgent() };
  try {
    const res = await fetch(`${TRANSFORM_BASE_URL}/${options.join(',')}/${source.href}`, {
      headers,
      signal: AbortSignal.timeout(TIMEOUT_MS)
    });
    const contentType = res.headers.get('content-type') ?? '';
    if (!res.ok) return { ok: false, reason: res.status === 404 ? 'not_image' : 'unreachable' };
    if (!contentType.startsWith('image/')) return { ok: false, reason: 'not_image' };

    const data = Buffer.from(await res.arrayBuffer());
    if (data.byteLength > MAX_BYTES) return { ok: false, reason: 'too_large' };
    return { ok: true, image: { data, contentType } };
  } catch {
    return { ok: false, reason: 'unreachable' };
  }
}

/** The host alone, for logs, since a full URL can carry signed query strings. */
export function imageHost(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return 'invalid url';
  }
}

export function toDataUri({ data, contentType }: RemoteImage) {
  return `data:${contentType};base64,${data.toString('base64')}`;
}
