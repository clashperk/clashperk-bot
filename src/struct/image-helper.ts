import { WAR_LEAGUE_MAP } from '@app/constants';
import moment from 'moment';
import { LegendArmiesDto } from '../api/generated.js';
import { CWLRankCard } from '../helper/cwl.helper.js';
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
  mostUsed?: Pick<LegendArmiesDto, 'attacks' | 'heroes' | 'army'>;
}

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
