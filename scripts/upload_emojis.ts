import { readFileSync } from 'node:fs';
import { basename, extname } from 'node:path';

// Uploads emoji files to one emoji server and prints the lines for src/util/emojis.ts.
// npx tsx -r dotenv/config scripts/upload_emojis.ts <guildId> <file.webp|file.png>...
// The file name, without its extension, becomes the emoji name. See docs/emojis.md.

const MIME_TYPES: Record<string, string> = { '.png': 'image/png', '.webp': 'image/webp' };

const [guildId, ...files] = process.argv.slice(2);
if (!guildId || !files.length) {
  console.error('Usage: upload_emojis.ts <guildId> <file>...');
  process.exit(1);
}

for (const file of files) {
  const name = basename(file, extname(file));
  const mime = MIME_TYPES[extname(file)];
  if (!mime) throw new Error(`${file}: only .png and .webp are supported`);

  const res = await fetch(`https://discord.com/api/v10/guilds/${guildId}/emojis`, {
    method: 'POST',
    headers: {
      'Authorization': `Bot ${process.env.DISCORD_TOKEN!}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      image: `data:${mime};base64,${readFileSync(file).toString('base64')}`
    })
  });
  if (!res.ok) throw new Error(`${name}: ${res.status} ${await res.text()}`);

  const emoji = (await res.json()) as { id: string; name: string; animated: boolean };
  console.log(`'${emoji.name}': '<${emoji.animated ? 'a' : ''}:${emoji.name}:${emoji.id}>',`);
}
