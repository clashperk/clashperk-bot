import { APIPlayer } from 'clashofclans.js';
import moment from 'moment';
import { container } from 'tsyringe';
import { api, encode } from '../api/axios.js';
import { BattleLogDto, LegendDayDto } from '../api/generated.js';
import { Client } from '../struct/client.js';
import { Collections, LeaguePromotionsMap } from '../util/constants.js';
import { Season, Util } from '../util/toolkit.js';

export const getDailyLegendEntries = async (playerTag: string) => {
  const client = container.resolve(Client);
  const result = await client.db
    .collection(Collections.LEGEND_ATTACKS)
    .findOne({ tag: playerTag, seasonId: Season.leagueId });

  return (result?.logs ?? []).reduce<Record<string, { start: number; end: number; diff: number }>>(
    (record, log) => {
      const date = moment(log.timestamp).subtract(5, 'hours').toISOString().slice(0, 10);
      if (!record[date]) {
        record[date] = { start: log.start, end: log.end, diff: log.inc };
      } else {
        record[date].end = log.end;
        record[date].diff += log.inc;
      }

      return record;
    },
    {}
  );
};

export const getLegendTimestampAgainstDay = (day?: number) => {
  if (!day) return { ...Util.getCurrentLegendTimestamp(), day: Util.getLegendDay() };

  const days = Util.getLegendDays();
  const num = Math.min(days.length, Math.max(day, 1));
  return { ...days[num - 1], day };
};

export const getLegendBattleLog = async (playerTag: string): Promise<BattleLogDto[]> => {
  const [result, logsMap] = await Promise.all([
    api.players.getPlayerBattleLog({ playerTag: encode(playerTag) }),
    getDailyLegendEntries(playerTag)
  ]);
  if (!result?.data?.items) return [];
  return result.data.items
    .filter((b) => b.battleType === 'legend')
    .map((log) => ({
      ...log,
      trophies: logsMap[log.battleDate]?.end ?? log.trophies,
      startTrophies: logsMap[log.battleDate]?.start ?? log.trophies,
      endTrophies: logsMap[log.battleDate]?.end ?? log.trophies
    }));
};

export const getLegendDays = async (
  playerTag: string,
  seasonId?: string
): Promise<LegendDayDto[]> => {
  const result = await api.legends.getLegendDays({ playerTag: encode(playerTag), seasonId });
  return result.data.items;
};

/** Null when the API can't say, so the card is drawn without the army panels. */
export const getLegendArmies = async (playerTag: string) => {
  const result = await api.legends
    .getLegendArmies({ playerTag: encode(playerTag) })
    .catch(() => null);
  return result?.data ?? null;
};

/** One ranked week's most used heroes and army; null when the API can't say. */
export const getRankedArmies = async (playerTag: string, weekId: string) => {
  const result = await api.players
    .getRankedArmies({ playerTag: encode(playerTag), weekId })
    .catch(() => null);
  return result?.data ?? null;
};

export const getRankedBattleLog = async (
  playerTag: string,
  weekId: string
): Promise<BattleLogDto[]> => {
  const result = await api.players
    .getPlayerBattleLog({ playerTag: encode(playerTag) })
    .catch(() => null);
  if (!result?.data?.items) return [];
  return result.data.items.filter((b) => b.battleWeek === weekId && b.battleType === 'ranked');
};

/** A player's ranked group; `league` is the group's league when it differs from the player's current one. */
export const getTournament = async (
  player: APIPlayer,
  lastTournament = false,
  league: APIPlayer['leagueTier'] = player.leagueTier
) => {
  const client = container.resolve(Client);
  const { body, res } = await client.coc.getLeagueGroup(
    lastTournament ? player.previousLeagueGroupTag : player.currentLeagueGroupTag,
    lastTournament ? player.previousLeagueSeasonId : player.currentLeagueSeasonId,
    { playerTag: player.tag }
  );
  if (!res.ok || !body?.members?.length) return null;

  const total = body.members.length;
  const rankIndex = body.members.findIndex((m) => m.playerTag === player.tag);
  if (rankIndex < 0) return null;

  const attacks: BattleLogDto[] = [...body.attackLogs].map((log) => ({
    battleDate: Season.toBattleDate(new Date(log.creationTime)),
    battleType: 'ranked',
    battleWeek: Season.tournamentID,
    battleSeason: Season.leagueId,
    destruction: log.destructionPercentage,
    isAttack: true,
    leagueId: player.leagueTier?.id ?? 0,
    startTrophies: 0,
    endTrophies: 0,
    stars: log.stars,
    name: player.name,
    opponentTag: log.opponentPlayerTag,
    tag: player.tag,
    trophyChange: calculateTrophies(log.stars, log.destructionPercentage, {
      isAttack: true,
      isLegendLeague: false
    }),
    trophies: 0,
    ingestedAt: new Date(log.creationTime).toISOString()
  }));

  const defenses: BattleLogDto[] = [...body.defenseLogs].map((log) => ({
    battleDate: Season.toBattleDate(new Date(log.creationTime)),
    battleType: 'ranked',
    battleWeek: Season.tournamentID,
    battleSeason: Season.leagueId,
    destruction: log.destructionPercentage,
    isAttack: false,
    leagueId: player.leagueTier?.id ?? 0,
    stars: log.stars,
    name: player.name,
    startTrophies: 0,
    endTrophies: 0,
    opponentTag: log.opponentPlayerTag,
    tag: player.tag,
    trophyChange: calculateTrophies(log.stars, log.destructionPercentage, {
      isAttack: false,
      isLegendLeague: false
    }),
    trophies: 0,
    ingestedAt: new Date(log.creationTime).toISOString()
  }));

  const rank = rankIndex + 1;
  const topPercentage = Math.ceil((rank / total) * 100);

  const leagueId = String(league?.id ?? 0);
  const promotions = LeaguePromotionsMap[leagueId as keyof typeof LeaguePromotionsMap];
  const demotionZone = promotions ? Math.ceil(total * (promotions.demotion / 100)) : 0;
  const isInDemotionZone = demotionZone > 0 && rank > total - demotionZone;

  const promotionZone = promotions ? Math.ceil(total * (promotions.promotion / 100)) : 0;
  const isInPromotionZone = promotionZone > 0 && rank <= promotionZone;

  return {
    rank,
    total,
    topPercentage,
    demotionZone,
    isInDemotionZone,
    promotionZone,
    isInPromotionZone,
    battles: [...attacks, ...defenses],
    league,
    member: body.members[rankIndex],
    members: body.members.map((m) => ({ name: m.playerName, trophies: m.leagueTrophies }))
  };
};

export type Tournament = NonNullable<Awaited<ReturnType<typeof getTournament>>>;

/** Empty when the API can't say, so a clan that fails doesn't hide the others. */
export const getClanDailyLegendBattles = async (clanTag: string, battleDate: string) => {
  const result = await api.clans
    .getClanDailyLegendBattles({ clanTag: encode(clanTag), battleDate })
    .catch(() => null);
  return result?.data.items ?? [];
};

const summarizeLegendSeason = (seasonId: string, days: LegendDayDto[]) => {
  const mean = (pick: (day: LegendDayDto) => number) =>
    days.length ? days.reduce((sum, day) => sum + pick(day), 0) / days.length : 0;
  return {
    _id: seasonId,
    logs: days.map((day) => ({ timestamp: new Date(day.date), trophies: day.currentTrophies })),
    avgGain: mean((day) => day.attackTrophies + day.defenseTrophies),
    avgOffense: mean((day) => day.attackTrophies),
    avgDefense: mean((day) => day.defenseTrophies)
  };
};

/** The current and last league seasons for the legend graph, each left out when it has no days. */
export const summarizeLegendSeasons = (currentDays: LegendDayDto[], lastDays: LegendDayDto[]) => {
  const [currentSeason, lastSeason] = Season.getLeagueSeasons(2);
  const items = [
    summarizeLegendSeason(currentSeason.id, currentDays),
    summarizeLegendSeason(lastSeason.id, lastDays)
  ].filter((season) => season.logs.length > 0);

  return {
    items,
    seasonStart: new Date(lastSeason.endTime),
    seasonEnd: new Date(currentSeason.endTime),
    lastSeasonEnd: new Date(lastSeason.endTime)
  };
};

export const calculateTrophies = (
  stars: number,
  destruction: number,
  { isAttack, isLegendLeague }: { isAttack: boolean; isLegendLeague: boolean }
): number => {
  let attackerGain = 0;

  if (stars === 3) {
    // 3 stars always awards the full pool
    attackerGain = 40;
  } else if (stars === 2) {
    // 16 base + 1 per 3% over 50%
    attackerGain = 16 + Math.floor((destruction - 50) / 3);
  } else if (stars === 1) {
    // 5 base + 1 per 9% destruction ABOVE the initial 1%
    attackerGain = 5 + Math.floor((destruction - 1) / 9);
  } else {
    // 0 stars: 1 trophy per full 10% destruction, so nothing under 10%
    attackerGain = Math.floor(destruction / 10);
  }

  // Cap at 40 (standard trophy pool)
  if (attackerGain > 40) {
    attackerGain = 40;
  }

  if (isAttack) {
    return attackerGain;
  }

  // In Legend League, the defender LOSES what the attacker gains
  // Exception: 0 stars means no trophies are lost by the defender
  if (isLegendLeague) {
    return stars === 0 ? 0 : -attackerGain;
  }

  // In Ranked, the defender GAINS the remainder of the 40 pool
  // 0-star defense always gives full 40 to defender
  if (stars === 0) {
    return 40;
  }

  return 40 - attackerGain;
};
