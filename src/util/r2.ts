import { AwsClient } from 'aws4fetch';

const TIMEOUT_MS = 15_000;

const { R2_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_URL } =
  process.env;

const client =
  R2_ENDPOINT && R2_BUCKET && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_PUBLIC_URL
    ? new AwsClient({
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
        service: 's3',
        region: 'auto'
      })
    : null;

const objectUrl = (key: string) => `${R2_ENDPOINT}/${R2_BUCKET}/${key}`;

/** Uploads to the public media bucket and returns the public link, or null when R2 isn't configured. */
export async function uploadToR2(key: string, data: Buffer, contentType: string) {
  if (!client) return null;
  const res = await client.fetch(objectUrl(key), {
    method: 'PUT',
    body: data,
    headers: { 'Content-Type': contentType },
    signal: AbortSignal.timeout(TIMEOUT_MS)
  });
  if (!res.ok) throw new Error(`R2 upload failed with ${res.status}`);
  return `${R2_PUBLIC_URL}/${key}`;
}

/** The object key behind one of our public links, or null for any other link. */
export function r2KeyFromUrl(url: string | null | undefined) {
  if (!url || !R2_PUBLIC_URL || !url.startsWith(`${R2_PUBLIC_URL}/`)) return null;
  return url.slice(R2_PUBLIC_URL.length + 1);
}

export async function deleteFromR2(key: string) {
  if (!client) return;
  const res = await client.fetch(objectUrl(key), {
    method: 'DELETE',
    signal: AbortSignal.timeout(TIMEOUT_MS)
  });
  if (!res.ok && res.status !== 404) throw new Error(`R2 delete failed with ${res.status}`);
}
