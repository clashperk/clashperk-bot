import { Collections } from '@app/constants';
import 'dotenv/config';
import { MongoClient } from 'mongodb';

// Seeds every linked clan radar's sweep doesn't track yet. Dry run unless --apply.
const apply = process.argv.includes('--apply');

const mainClient = await new MongoClient(process.env.MONGODB_URL!).connect();
const globalClient = await new MongoClient(process.env.GLOBAL_MONGODB_URL!).connect();
const sweeps = globalClient.db('global_tracking').collection('global_clan_sweeps');

const tags: string[] = await mainClient
  .db('clashperk')
  .collection(Collections.CLAN_STORES)
  .distinct('tag');

const missing: string[] = [];
for (let i = 0; i < tags.length; i += 5000) {
  const batch = tags.slice(i, i + 5000);
  const found = new Set<string>(await sweeps.distinct('tag', { tag: { $in: batch } }));
  missing.push(...batch.filter((tag) => !found.has(tag)));
}
console.log(`${tags.length} linked clans, ${missing.length} not tracked by the sweep`);

if (apply && missing.length) {
  const result = await sweeps.bulkWrite(
    missing.map((tag) => ({
      updateOne: {
        filter: { tag },
        update: { $setOnInsert: { nextSweepAt: new Date(), unchangedSweeps: 0 } },
        upsert: true
      }
    })),
    { ordered: false }
  );
  console.log(`Seeded ${result.upsertedCount} clans`);
}

await Promise.all([mainClient.close(), globalClient.close()]);
