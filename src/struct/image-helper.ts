import { BattlesPerWeek, WAR_LEAGUE_MAP } from '@app/constants';
import { APIPlayer } from 'clashofclans.js';
import moment from 'moment';
import { LegendArmiesDto } from '../api/generated.js';
import { CWLRankCard } from '../helper/cwl.helper.js';
import type { Tournament } from '../helper/legends.helper.js';
import { Util } from '../util/toolkit.js';

function formatNumber(num: number) {
  return `${num > 0 ? '+' : ''}${num.toFixed(0)}`;
}

export interface LegendCardStats {
  rank?: { rank: number };
  /** One per season day, null for a day with nothing tracked. */
  days: ({ offense: number; defense: number; attacks: number } | null)[];
  /** Counts of 0★ to 3★ results. */
  attackStars: number[];
  defenseStars: number[];
  mostUsed?: MostUsed;
}

type MostUsed = Pick<LegendArmiesDto, 'attacks' | 'heroes' | 'army'>;

export const createLegendGraph = async ({
  datasets,
  labels,
  data,
  season,
  seasonStart,
  seasonEnd,
  lastSeason,
  prevFinalTrophies,
  stats
}: {
  datasets: any[];
  labels: Date[];
  data: {
    name: string;
    townHallLevel: number;
    trophies: number;
    clan?: {
      name: string;
      badgeUrls: {
        large: string;
      };
    };
  };
  season: any;
  seasonStart: Date;
  seasonEnd: Date;
  lastSeason?: any;
  prevFinalTrophies: number | string;
  stats?: LegendCardStats;
}) => {
  const arrayBuffer = await fetch(`${process.env.IMAGE_GEN_API_BASE_URL}/legends/graph`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      datasets,
      labels,
      name: data.name,
      avgNetGain: formatNumber(season.avgGain),
      avgOffense: formatNumber(season.avgOffense),
      avgDefense: formatNumber(season.avgDefense),
      prevAvgNetGain: lastSeason ? formatNumber(lastSeason.avgGain) : '',
      prevAvgOffense: lastSeason ? formatNumber(lastSeason.avgOffense) : '',
      prevAvgDefense: lastSeason ? formatNumber(lastSeason.avgDefense) : '',
      townHall: data.townHallLevel.toString(),
      prevFinalTrophies,
      prevSeason: lastSeason
        ? moment.utc(Util.getLeagueSeasonById(lastSeason._id).startTime).format('D MMM')
        : '',
      currentTrophies: data.trophies.toFixed(0),
      clanName: data.clan?.name,
      clanBadgeURL: data.clan?.badgeUrls.large,
      season: `${moment.utc(seasonStart).format('D MMM')} – ${moment.utc(seasonEnd).format('D MMM YYYY')}`,
      ...stats
    })
  }).then((res) => res.arrayBuffer());

  return {
    file: Buffer.from(arrayBuffer),
    name: 'legend-rank-card.jpeg' as const,
    attachmentKey: 'attachment://legend-rank-card.jpeg' as const
  };
};

const DAY_MS = 24 * 60 * 60 * 1000;

/** Trophies and battles per game day of a tournament week, Monday first, up to the latest day played. */
const rankedDays = (tournament: Tournament, weekStart: Date) => {
  const days = Array.from({ length: 7 }, () => ({
    offense: 0,
    defense: 0,
    attacks: 0,
    defenses: 0
  }));
  let latest = -1;
  for (const battle of tournament.battles) {
    const index = Math.floor(
      (new Date(battle.ingestedAt).getTime() - weekStart.getTime()) / DAY_MS
    );
    const day = days[index];
    if (!day) continue;
    latest = Math.max(latest, index);
    if (battle.isAttack) {
      day.offense += battle.trophyChange;
      day.attacks++;
    } else {
      day.defense += battle.trophyChange;
      day.defenses++;
    }
  }
  return days.slice(0, latest + 1);
};

const starCounts = (battles: Tournament['battles']) => {
  const counts = [0, 0, 0, 0];
  for (const battle of battles) counts[battle.stars]++;
  return counts;
};

export const createRankedGraph = async ({
  player,
  tournament,
  lastTournament,
  weekStart,
  mostUsed
}: {
  player: APIPlayer;
  tournament: Tournament;
  lastTournament: Tournament | null;
  weekStart: Date;
  mostUsed?: MostUsed;
}) => {
  const league = tournament.league!;
  const leagueId = String(league.id);
  const lastWeekStart = new Date(weekStart.getTime() - 7 * DAY_MS);
  const lastDays = lastTournament ? rankedDays(lastTournament, lastWeekStart) : [];
  const lastAttacks = lastDays.reduce((sum, day) => sum + day.attacks, 0);
  const lastOffense = lastDays.reduce((sum, day) => sum + day.offense, 0);

  const arrayBuffer = await fetch(`${process.env.IMAGE_GEN_API_BASE_URL}/legends/ranked-graph`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: player.name,
      townHall: player.townHallLevel.toString(),
      clanName: player.clan?.name,
      clanBadgeURL: player.clan?.badgeUrls.large,
      league: { id: league.id, name: league.name, iconUrl: league.iconUrls.large },
      weekStart: weekStart.toISOString(),
      trophies: tournament.member.leagueTrophies,
      rank: tournament.rank,
      promotion: tournament.promotionZone,
      demotion: tournament.demotionZone,
      attacksAllowed: BattlesPerWeek[leagueId] ?? 0,
      members: tournament.members,
      days: rankedDays(tournament, weekStart),
      lastWeek: lastDays.length
        ? {
            days: lastDays.map((day) => day.offense + day.defense),
            perAttack: lastAttacks ? Math.round(lastOffense / lastAttacks) : undefined
          }
        : undefined,
      attackStars: starCounts(tournament.battles.filter((b) => b.isAttack)),
      defenseStars: starCounts(tournament.battles.filter((b) => !b.isAttack)),
      defenseWins: tournament.member.defenseWinCount,
      mostUsed
    })
  }).then((res) => res.arrayBuffer());

  return {
    file: Buffer.from(arrayBuffer),
    name: 'ranked-week-card.jpeg' as const,
    attachmentKey: 'attachment://ranked-week-card.jpeg' as const
  };
};

export const getCWLSummaryImage = async ({
  ranks,
  activeRounds,
  leagueId,
  medals,
  rankIndex,
  season,
  totalRounds
}: {
  ranks: CWLRankCard[];
  rankIndex: number;
  season: string;
  medals: number;
  leagueId: number;
  activeRounds: number;
  totalRounds: number;
}) => {
  const arrayBuffer = await fetch(`${process.env.IMAGE_GEN_API_BASE_URL}/wars/cwl-ranks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ranks,
      rankIndex,
      season,
      medals,
      leagueName: WAR_LEAGUE_MAP[leagueId],
      rounds: `${activeRounds}/${totalRounds}`
    })
  }).then((res) => res.arrayBuffer());

  return {
    file: Buffer.from(arrayBuffer),
    name: 'clan-war-league-ranking.jpeg' as const,
    attachmentKey: 'attachment://clan-war-league-ranking.jpeg' as const
  };
};

export const createTrophyThresholdsGraph = async ({
  datasets,
  labels,
  title
}: {
  datasets: any[];
  labels: string[];
  title: string;
}) => {
  const arrayBuffer = await fetch(`${process.env.IMAGE_GEN_API_BASE_URL!}/clans/activity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      labels: labels,
      datasets,
      offset: 0,
      unit: 'day',
      title
    })
  }).then((res) => res.arrayBuffer());

  return {
    file: Buffer.from(arrayBuffer),
    name: 'legend-ranking-threshold.jpeg' as const,
    attachmentKey: 'attachment://legend-ranking-threshold.jpeg' as const
  };
};
