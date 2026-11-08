import { Collections, LEGEND_LEAGUE_ID, UNRANKED_TIER_ID } from '@app/constants';
import { GlobalPlayersEntity, PlayersEntity } from '@app/entities';
import { APIPlayer } from 'clashofclans.js';
import moment from 'moment';
import { Db } from 'mongodb';
import { api, encode } from '../api/axios.js';
import { Client } from './client.js';

const NO_CLAN_TAG = '#00000';

// Unswept clans are seeded the way radar seeds them; swept ones become due now.
export async function scheduleClanSweeps(globalDb: Db, clanTags: (string | undefined)[]) {
  const tags = [...new Set(clanTags)].filter((tag): tag is string => !!tag && tag !== NO_CLAN_TAG);
  if (!tags.length) return;

  await globalDb.collection('global_clan_sweeps').bulkWrite(
    tags.map((tag) => ({
      updateOne: {
        filter: { tag },
        update: { $min: { nextSweepAt: new Date() }, $setOnInsert: { unchangedSweeps: 0 } },
        upsert: true
      }
    })),
    { ordered: false }
  );
}

export class PlayerSync {
  public constructor(private readonly client: Client) {}

  // Radar's sweep owns global players and history. A lookup only pulls the
  // player's old and new clans forward so the sweep records the move soon.
  public async reSyncClanHistory(player: APIPlayer) {
    const entity = await this.client.globalDb
      .collection<GlobalPlayersEntity>('global_players')
      .findOne({ tag: player.tag }, { projection: { clanTag: 1 } });

    if (entity && entity.clanTag === (player.clan?.tag ?? NO_CLAN_TAG)) return;

    await scheduleClanSweeps(this.client.globalDb, [player.clan?.tag, entity?.clanTag]);
  }

  public async reSyncLegends(player: APIPlayer) {
    await this.client.db.collection<PlayersEntity>(Collections.PLAYERS).updateOne(
      { tag: player.tag },
      {
        $setOnInsert: {
          lastSeen: moment().subtract(1, 'day').toDate()
        },
        $set: {
          name: player.name,
          townHallLevel: player.townHallLevel,
          leagueId:
            player.leagueTier?.id ??
            (player.trophies >= 5000 ? LEGEND_LEAGUE_ID : UNRANKED_TIER_ID),
          clan: player.clan ? { name: player.clan.name, tag: player.clan.tag } : {},
          lastSearched: new Date()
        }
      },
      {
        upsert: true
      }
    );
    // background bookkeeping; a failure here must not break the command that triggered it
    await api.players.addPlayerAccount({ playerTag: encode(player.tag) }).catch(() => null);
  }
}
