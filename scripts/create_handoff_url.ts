import 'dotenv/config';

const [userId, guildId, path = '/', applicationId] = process.argv.slice(2);

if (!userId || !guildId) {
  console.error('Usage: npm run handoff -- <userId> <guildId> [path] [applicationId]');
  process.exit(1);
}

(async () => {
  const res = await fetch(`${process.env.INTERNAL_API_BASE_URL}/v1/auth/handoff`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.INTERNAL_API_KEY!
    },
    body: JSON.stringify({ userId, guildId, applicationId: applicationId || null })
  });

  if (!res.ok) {
    console.error(`Handoff failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }

  const { token } = (await res.json()) as { token: string };
  const url = new URL(path, process.env.DASHBOARD_URL || 'https://app.clashperk.com');
  url.searchParams.set('handoff_token', token);

  console.log(url.toString());
})();
