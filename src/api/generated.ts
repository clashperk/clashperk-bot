/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum PaymentSource {
  PATREON = 'patreon',
  KOFI = 'ko-fi',
  BUY_ME_A_COFFEE = 'buymeacoffee',
  PAYPAL = 'paypal',
  OTHER = 'other'
}

export enum SubscriptionPlan {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  GIFTED = 'gifted',
  SPONSORED = 'sponsored',
  SPONSORED_CUSTOM_BOT = 'sponsored_custom_bot',
  LIFETIME = 'lifetime',
  LIFETIME_CUSTOM_BOT = 'lifetime_custom_bot'
}

export enum BillingCadence {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  ONE_TIME = 'one_time'
}

export enum SubscriptionProvider {
  PATREON = 'patreon',
  MANUAL = 'manual'
}

export enum RaidAttacksLeft {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6
}

export enum ReminderWarType {
  Normal = 'normal',
  Friendly = 'friendly',
  Cwl = 'cwl'
}

/** Ping members with this many attacks left; empty pings nobody. */
export enum WarAttacksLeft {
  One = 1,
  Two = 2
}

export enum ReminderClanRole {
  Leader = 'leader',
  CoLeader = 'coLeader',
  Admin = 'admin',
  Member = 'member'
}

export enum TicketStatus {
  OPEN = 'open',
  SLEEP = 'sleep',
  CLOSED = 'closed'
}

export enum TicketExtraButtonKind {
  LINK_ACCOUNT = 'link-account',
  URL = 'url'
}

export enum TicketDisplayMode {
  MENU = 'menu',
  BUTTONS = 'buttons'
}

export enum ButtonType {
  Link = 'link',
  Refresh = 'refresh',
  MyRosters = 'myRosters'
}

/** Set for the link button only. */
export enum ButtonTokenField {
  REQUIRED = 'required',
  OPTIONAL = 'optional',
  HIDDEN = 'hidden'
}

export enum FlagType {
  BAN = 'ban',
  STRIKE = 'strike'
}

export enum NicknameAccount {
  DEFAULT = 'default-account',
  BEST = 'best-account',
  DEFAULT_OR_BEST = 'default-or-best-account'
}

export enum DelayExclusion {
  TOWN_HALL_ROLES = 'townHallRoles',
  BUILDER_HALL_ROLES = 'builderHallRoles',
  LEAGUE_ROLES = 'leagueRoles',
  BUILDER_LEAGUE_ROLES = 'builderLeagueRoles',
  GUEST_ROLE = 'guestRole'
}

export enum ClanEmbedField {
  ClanLeader = 'clanLeader',
  Requirements = 'requirements',
  TrophiesRequired = 'trophiesRequired',
  Location = 'location',
  WarPerformance = 'warPerformance',
  WarFrequency = 'warFrequency',
  ClanWarLeague = 'clanWarLeague',
  ClanCapitalLeague = 'clanCapitalLeague',
  TownHalls = 'townHalls'
}

export enum ChannelStatus {
  OK = 'ok',
  ARCHIVED = 'archived',
  LOCKED = 'locked',
  DELETED = 'deleted',
  NO_ACCESS = 'noAccess',
  UNKNOWN = 'unknown'
}

export enum ClanLogType {
  CLAN_ACHIEVEMENTS_LOG = 'clan_achievements_log',
  CONTINUOUS_DONATION_LOG = 'continuous_donation_log',
  DAILY_DONATION_LOG = 'daily_donation_log',
  WEEKLY_DONATION_LOG = 'weekly_donation_log',
  MONTHLY_DONATION_LOG = 'monthly_donation_log',
  CLAN_GAMES_EMBED_LOG = 'clan_games_embed_log',
  LAST_SEEN_EMBED_LOG = 'last_seen_embed_log',
  LEGEND_ATTACKS_DAILY_SUMMARY_LOG = 'legend_attacks_daily_summary_log',
  CLAN_CAPITAL_WEEKLY_SUMMARY_LOG = 'clan_capital_weekly_summary_log',
  CLAN_CAPITAL_CONTRIBUTION_LOG = 'clan_capital_contribution_log',
  CLAN_CAPITAL_RAID_LOG = 'clan_capital_raid_log',
  WAR_ATTACK_LOG = 'war_attack_log',
  CWL_ATTACK_LOG = 'cwl_attack_log',
  WAR_EMBED_LOG = 'war_embed_log',
  WAR_MISSED_ATTACKS_LOG = 'war_missed_attacks_log',
  CWL_EMBED_LOG = 'cwl_embed_log',
  CWL_MISSED_ATTACKS_LOG = 'cwl_missed_attacks_log',
  CWL_LINEUP_CHANGE_LOG = 'cwl_lineup_change_log',
  CWL_MONTHLY_SUMMARY_LOG = 'cwl_monthly_summary_log',
  MEMBER_JOIN_LEAVE_LOG = 'member_join_leave_log',
  ROLE_CHANGE_LOG = 'role_change_log',
  NAME_CHANGE_LOG = 'name_change_log',
  TOWN_HALL_UPGRADE_LOG = 'town_hall_upgrade_log',
  WAR_PREFERENCE_LOG = 'war_preference_log',
  RANKED_BATTLE_LEAGUE_CHANGE_LOG = 'ranked_battle_league_change_log'
}

export enum RosterSortBy {
  PLAYER_NAME = 'PLAYER_NAME',
  DISCORD_NAME = 'DISCORD_NAME',
  DISCORD_USERNAME = 'DISCORD_USERNAME',
  TOWN_HALL_LEVEL = 'TOWN_HALL_LEVEL',
  HERO_LEVEL = 'HERO_LEVEL',
  TH_HERO_LEVEL = 'TH_HERO_LEVEL',
  CLAN_NAME = 'CLAN_NAME',
  SIGNUP_TIME = 'SIGNUP_TIME',
  TROPHIES = 'TROPHIES',
  LEAGUES = 'LEAGUES'
}

export enum RosterCategory {
  GENERAL = 'GENERAL',
  CWL = 'CWL',
  WAR = 'WAR',
  TROPHY = 'TROPHY'
}

export enum WarTypes {
  REGULAR = 1,
  FRIENDLY = 2,
  CWL = 3
}

/** Only these event types; all of them when omitted. */
export enum ClanActivityType {
  TownHallUpgrade = 'town_hall_upgrade',
  Joined = 'joined',
  Left = 'left',
  ClanLevelUp = 'clan_level_up',
  CapitalHallLevelUp = 'capital_hall_level_up',
  WarLeagueChange = 'war_league_change',
  CapitalLeagueChange = 'capital_league_change'
}

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
  VIEWER = 'viewer',
  FETCH_WARS = 'fetch:wars',
  FETCH_CLANS = 'fetch:clans',
  FETCH_PLAYERS = 'fetch:players',
  FETCH_LEGENDS = 'fetch:legends',
  FETCH_LINKS = 'fetch:links',
  MANAGE_LINKS = 'manage:links',
  FETCH_ROSTERS = 'fetch:rosters',
  MANAGE_ROSTERS = 'manage:rosters',
  MANAGE_REMINDERS = 'manage:reminders'
}

export enum ErrorCodes {
  FORBIDDEN = 'FORBIDDEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  HANDOFF_TOKEN_EXPIRED = 'HANDOFF_TOKEN_EXPIRED',
  USER_BLOCKED = 'USER_BLOCKED',
  INVALID_PASSKEY = 'INVALID_PASSKEY',
  GUILD_ACCESS_FORBIDDEN = 'GUILD_ACCESS_FORBIDDEN',
  BOT_NOT_IN_GUILD = 'BOT_NOT_IN_GUILD'
}

export interface ErrorResponseDto {
  /** @example "string" */
  code: ErrorCodes;
  message: string;
  statusCode: number;
  method: string;
  path: string;
}

export interface JwtUserInput {
  roles: string[];
  jti: string;
  userId: string;
  username: string;
  version: string;
  guildIds: string[];
  applicationId?: string;
  remoteIp?: string;
  cacheMultiplier?: number;
}

export interface LoginInputDto {
  passKey: string;
}

export interface LoginOkDto {
  roles: UserRoles[];
  userId: string;
  accessToken: string;
}

export interface AuthUserDto {
  roles: UserRoles[];
  userId: string;
  displayName: string;
  isBot: boolean;
}

export interface HandoffGuildDto {
  id: string;
  name: string;
  iconUrl: string | null;
}

export interface HandoffUserDto {
  roles: UserRoles[];
  userId: string;
  displayName: string;
  username: string;
  isBot: boolean;
  /** Null when the user can't manage the server, so the dashboard opens without one. */
  guild: HandoffGuildDto | null;
  applicationId: string | null;
  avatarUrl: string | null;
}

export interface HandoffTokenInputDto {
  userId: string;
  guildId: string;
  applicationId: string | null;
}

export interface HandoffTokenDto {
  token: string;
}

export interface BotGuildsInputDto {
  /**
   * @maxItems 200
   * @minItems 1
   */
  guildIds: string[];
}

export interface BotGuildDto {
  id: string;
  name: string;
  iconUrl: string | null;
  clanCount: number;
}

export interface BotGuildsDto {
  guilds: BotGuildDto[];
}

export interface ManagedGuildsInputDto {
  /**
   * @maxItems 200
   * @minItems 1
   */
  guildIds: string[];
  /** @pattern ^\d{17,20}$ */
  userId: string;
}

export interface ManagedGuildsDto {
  /** Servers where the user holds one of the bot manager roles. */
  guildIds: string[];
}

export interface GuildAccessInputDto {
  /** @pattern ^\d{17,20}$ */
  userId: string;
  /** @pattern ^\d{17,20}$ */
  guildId: string;
  /**
   * The custom bot the session uses; without it, the API picks the server's bot.
   * @pattern ^\d{17,20}$
   */
  applicationId?: string | null;
}

export interface GuildAccessDto {
  /** False when the bot was never added to the server or has been removed. */
  hasBot: boolean;
  /** Owner, Administrator, Manage Server or the bot manager role. */
  canManage: boolean;
  /** The bot to act through in the server: a custom bot's ID, or null for ClashPerk. */
  applicationId: string | null;
}

export interface CreateLinkInputDto {
  playerTag: string;
  userId: string;
  apiToken: string | null;
}

export interface ResultOkDto {
  message: string;
}

export interface SetHiddenInputDto {
  hidden: boolean;
}

export interface GetLinksInputDto {
  /**
   * @maxItems 100
   * @minItems 1
   * @example ["#2PP"]
   */
  playerTags?: string[];
  /**
   * @maxItems 100
   * @minItems 1
   * @example ["444432489818357760"]
   */
  userIds?: string[];
}

export interface LinksDto {
  tag: string;
  name: string;
  userId: string;
  username: string;
  verified: boolean;
  /** Left out of the owner's task lists. */
  hidden?: boolean;
}

export interface ClanActivityInputDto {
  /**
   * @maxItems 10
   * @minItems 1
   * @example ["#2L2YLJV2C"]
   */
  clanTags: string[];
  /**
   * @min 1
   * @max 30
   * @default 7
   */
  days?: number;
  /**
   * @min 1
   * @max 100
   * @default 50
   */
  limit?: number;
  /**
   * Only these event types; all of them when omitted.
   * @minItems 1
   * @default ["town_hall_upgrade","joined","left","clan_level_up","capital_hall_level_up","war_league_change","capital_league_change"]
   */
  types?: ClanActivityType[];
}

export interface ClanActivityPlayerDto {
  tag: string;
  name: string;
}

export interface ClanActivityClanDto {
  tag: string;
  name: string;
}

export interface ClanActivityItemDto {
  type: ClanActivityType;
  /** Who it happened to; null for clan-wide events. */
  player: ClanActivityPlayerDto | null;
  /** The new Town Hall, clan or Capital Hall level; null otherwise. */
  level: number | null;
  /** The new war or capital league; null otherwise. */
  league: string | null;
  /** @format date-time */
  createdAt: string;
  clan: ClanActivityClanDto;
}

export interface ClanActivityDto {
  /** Newest first. */
  items: ClanActivityItemDto[];
}

export interface LocationDto {
  localizedName?: string;
  id: number;
  name: string;
  isCountry: boolean;
  countryCode?: string;
}

export interface ChatLanguageDto {
  name: string;
  id: number;
  languageCode: string;
}

export interface ClanBadge {
  large: string;
  small: string;
  medium: string;
}

export interface NamedLeagueDto {
  id: number;
  name: string;
}

export interface IconUrlsDto {
  small: string;
  tiny?: string;
  medium?: string;
}

export interface LabelDto {
  id: number;
  name: string;
  iconUrls: IconUrlsDto;
}

export interface LeagueTierIconUrlsDto {
  small: string;
  large: string;
}

export interface LeagueTierDto {
  id: number;
  name: string;
  iconUrls: LeagueTierIconUrlsDto;
}

export interface PlayerHouseElementDto {
  type: string;
  id: number;
}

export interface PlayerHouseDto {
  elements: PlayerHouseElementDto[];
}

export interface ClanMemberDto {
  role: 'member' | 'admin' | 'coLeader' | 'leader';
  name: string;
  tag: string;
  expLevel: number;
  townHallLevel: number;
  leagueTier: LeagueTierDto;
  builderBaseLeague?: NamedLeagueDto;
  trophies: number;
  builderBaseTrophies?: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
  playerHouse?: PlayerHouseDto;
}

export interface ClanCapitalDistrictDto {
  id: number;
  name: string;
  districtHallLevel: number;
}

export interface ClanCapitalDto {
  capitalHallLevel?: number;
  districts?: ClanCapitalDistrictDto[];
}

export interface ClanDto {
  type: 'open' | 'inviteOnly' | 'closed';
  warFrequency?:
    'always' | 'moreThanOncePerWeek' | 'oncePerWeek' | 'lessThanOncePerWeek' | 'never' | 'unknown';
  tag: string;
  name: string;
  description: string;
  location?: LocationDto;
  chatLanguage?: ChatLanguageDto;
  badgeUrls: ClanBadge;
  clanLevel: number;
  clanPoints: number;
  clanBuilderBasePoints: number;
  requiredTrophies: number;
  requiredTownhallLevel?: number;
  requiredBuilderBaseTrophies?: number;
  warWinStreak: number;
  warWins: number;
  warTies?: number;
  warLosses?: number;
  isWarLogPublic: boolean;
  warLeague?: NamedLeagueDto;
  members: number;
  labels: LabelDto[];
  memberList: ClanMemberDto[];
  clanCapital: ClanCapitalDto;
  isFamilyFriendly: boolean;
  clanCapitalPoints: number;
  capitalLeague?: NamedLeagueDto;
}

export interface LastSeenMemberClan {
  name: string;
  tag: string;
}

export interface LastSeenMemberDto {
  clan?: LastSeenMemberClan;
  name: string;
  tag: string;
  /** @format date-time */
  lastSeen: string;
  leagueId: number;
  townHallLevel: number;
  scores: {
    last24h: number;
    last30d: number;
  };
}

export interface LastSeenDto {
  items: LastSeenMemberDto[];
}

export interface CapitalContributionClanDto {
  name: string;
  tag: string;
}

export interface CapitalContributionItemDto {
  name: string;
  tag: string;
  season: string;
  initial: number;
  current: number;
  clan: CapitalContributionClanDto;
  /** @format date-time */
  createdAt: string;
}

export interface CapitalContributionDto {
  items: CapitalContributionItemDto[];
}

export interface CapitalRaidMemberDto {
  name: string;
  tag: string;
  attacks: number;
  attackLimit: number;
  bonusAttackLimit: number;
  capitalResourcesLooted: number;
}

export interface CapitalRaidSeasonDto {
  name: string;
  tag: string;
  state: string;
  members: CapitalRaidMemberDto[];
  /** @format date-time */
  startDate: string;
  /** @format date-time */
  endDate: string;
  offensiveReward: number;
  defensiveReward: number;
  capitalTotalLoot: number;
  totalAttacks: number;
  enemyDistrictsDestroyed: number;
  raidsCompleted: number;
}

export interface CapitalRaidsDto {
  items: CapitalRaidSeasonDto[];
}

export interface ClanGamesMemberDto {
  /** @format date-time */
  completedAt: string | null;
  name: string;
  tag: string;
  points: number;
}

export interface ClanGamesDto {
  season: string;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  /** Most points one member can earn. */
  maxPoints: number;
  /** Sum of each member's points, capped at `maxPoints`. */
  totalPoints: number;
  members: ClanGamesMemberDto[];
}

export interface ClanLinkedMemberDto {
  userId?: string | null;
  username?: string | null;
  displayName?: string | null;
  name: string;
  tag: string;
  role: string;
  townHallLevel: number;
  verified: boolean;
  deletable: boolean;
}

export interface ClanLinksDto {
  name: string;
  tag: string;
  members: number;
  memberList: ClanLinkedMemberDto[];
}

export interface PlayerClanDto {
  tag: string;
  name: string;
  clanLevel: number;
  badgeUrls: ClanBadge;
}

export interface PlayerSeasonDto {
  id: string;
  rank: number;
  trophies: number;
}

export interface PlayerCurrentSeasonDto {
  id?: string;
  rank?: number;
  trophies: number;
}

export interface LegendStatisticsDto {
  previousSeason?: PlayerSeasonDto;
  previousBuilderBaseSeason?: PlayerSeasonDto;
  bestBuilderBaseSeason?: PlayerSeasonDto;
  currentSeason?: PlayerCurrentSeasonDto;
  bestSeason?: PlayerSeasonDto;
  legendTrophies: number;
}

export interface PlayerAchievementDto {
  completionInfo: string | null;
  village: 'home' | 'builderBase';
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
}

export interface PlayerItemDto {
  equipment?: PlayerItemDto[];
  village: 'home' | 'builderBase';
  name: string;
  level: number;
  maxLevel: number;
  superTroopIsActive?: boolean;
}

export interface PlayerDto {
  warPreference?: 'in' | 'out';
  name: string;
  tag: string;
  townHallLevel: number;
  townHallWeaponLevel?: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel?: number;
  builderBaseTrophies?: number;
  bestBuilderBaseTrophies?: number;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  role?: string;
  clan?: PlayerClanDto;
  leagueTier: LeagueTierDto;
  builderBaseLeague?: NamedLeagueDto;
  currentLeagueGroupTag: string;
  currentLeagueSeasonId: number;
  previousLeagueGroupTag: string;
  previousLeagueSeasonId: number;
  legendStatistics?: LegendStatisticsDto;
  achievements: PlayerAchievementDto[];
  troops: PlayerItemDto[];
  heroes: PlayerItemDto[];
  spells: PlayerItemDto[];
  heroEquipment: PlayerItemDto[];
  labels: LabelDto[];
  playerHouse?: PlayerHouseDto;
}

export interface PlayerSeasonClanStatsDto {
  tag: string;
  name: string;
  donations: number;
  donationsReceived: number;
}

export interface PlayerSeasonStatsDto {
  /** The league season's start date, `YYYY-MM-DD`. */
  season: string;
  townHallLevel: number;
  trophies: number;
  attackWins: number;
  defenseWins: number;
  donations: number;
  donationsReceived: number;
  warStars: number;
  cwlStars: number;
  capitalGold: number;
  clanGamesPoints: number;
  goldLoot: number;
  elixirLoot: number;
  darkElixirLoot: number;
  clans: PlayerSeasonClanStatsDto[];
}

export interface PlayerSeasonStatsItemsDto {
  items: PlayerSeasonStatsDto[];
}

export interface RankedLeagueDto {
  id: number;
  name: string;
  iconUrl: string | null;
}

export interface RankedClanDto {
  tag: string;
  name: string;
}

export interface RankedGroupMemberDto {
  /** Null when the player isn't in a clan. */
  clan: RankedClanDto | null;
  rank: number;
  tag: string;
  name: string;
  trophies: number;
  attackWins: number;
  attackLosses: number;
  defenseWins: number;
  defenseLosses: number;
}

export interface RankedOpponentDto {
  tag: string;
  name: string;
}

export interface RankedBattleDto {
  opponent: RankedOpponentDto;
  stars: number;
  destruction: number;
  /** Trophies this battle gave the attacker. */
  trophies: number;
  /** @format date-time */
  createdAt: string;
}

export interface RankedWeekDto {
  /** Attacks allowed this week, and the most defenses taken; null when the game data is unavailable. */
  maxBattles: number | null;
  league: RankedLeagueDto;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  rank: number;
  /** Players in the group. */
  total: number;
  /** The top this many move up a league at the end of the week; 0 when nobody does. */
  promotionZone: number;
  /** The bottom this many move down; 0 when nobody does. */
  demotionZone: number;
  trophies: number;
  /** Standings, best first. */
  members: RankedGroupMemberDto[];
  /** The player's own attacks and defenses, newest first. */
  attacks: RankedBattleDto[];
  defenses: RankedBattleDto[];
  attackWins: number;
  attackLosses: number;
  defenseWins: number;
  defenseLosses: number;
}

export interface RankedHistoryItemDto {
  league: RankedLeagueDto;
  /** @format date-time */
  startTime: string;
  placement: number;
  trophies: number;
  defenseStars: number;
  maxBattles: number;
  attackWins: number;
  attackLosses: number;
  defenseWins: number;
  defenseLosses: number;
}

export interface RankedDto {
  /** This week's group; null when the player isn't in one (between weeks, or unranked). */
  current: RankedWeekDto | null;
  /** Past weeks, newest first. */
  history: RankedHistoryItemDto[];
}

export interface BattleLogDto {
  name: string;
  tag: string;
  opponentTag: string;
  battleType: string;
  isAttack: boolean;
  stars: number;
  destruction: number;
  trophies: number;
  /** @default 0 */
  startTrophies: number;
  /** @default 0 */
  endTrophies: number;
  trophyChange: number;
  battleDate: string;
  battleSeason: string;
  battleWeek: string;
  leagueId: number;
  /** @format date-time */
  ingestedAt: string;
}

export interface BattleLogItemsDto {
  items: BattleLogDto[];
}

export interface BattleLogDailyDto {
  name: string;
  tag: string;
  battleDate: string;
  trophies: number;
  offenseTrophies: number;
  defenseTrophies: number;
  gain: number;
  attackCount: number;
  defenseCount: number;
}

export interface BattleLogAggregateItemsDto {
  items: BattleLogDailyDto[];
}

export interface BattleLogLeaderboardInputDto {
  /**
   * The league season's start date. A legacy `YYYY-MM` season id is still accepted.
   * @pattern ^\d{4}-\d{2}(-\d{2})?$
   * @example "2026-10-05"
   */
  seasonId: string;
  playerTags: string[];
}

export interface BattleLogLeaderboardItemDto {
  tag: string;
  name: string;
  trophies: number;
}

export interface BattleLogLeaderboardDto {
  items: BattleLogLeaderboardItemDto[];
}

export interface GlobalClanEntity {
  tag: string;
  name: string;
}

export interface GlobalClanHistoryEntity {
  clan: GlobalClanEntity;
  playerTag: string;
  /** @format date-time */
  firstSeen: string;
  /** @format date-time */
  lastSeen: string;
}

export interface ClanHistoryItemsDto {
  items: GlobalClanHistoryEntity[];
}

export interface AttackRecordDto {
  defender: {
    tag: string;
    townHallLevel: number;
    mapPosition: number;
  };
  stars: number;
  trueStars: number;
  defenderTag: string;
  destruction: number;
}

export interface AttackHistoryDto {
  warType: WarTypes;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  attacks: AttackRecordDto[];
  season: string;
  id: number;
  clan: {
    name: string;
    tag: string;
  };
  opponent: {
    name: string;
    tag: string;
  };
  attacker: {
    name: string;
    tag: string;
    townHallLevel: number;
    mapPosition: number;
  };
  attacksPerMember: number;
  teamSize: number;
}

export interface AttackHistoryItemsDto {
  items: AttackHistoryDto[];
}

export interface AggregateAttackHistoryDto {
  season: string;
  totalWars: number;
  totalAttacks: number;
  total3Stars: number;
  totalMissed: number;
  totalStars: number;
}

export interface AggregateAttackHistoryItemsDto {
  items: AggregateAttackHistoryDto[];
}

export interface AggregateClanWarLeagueHistoryDto {
  clan: {
    tag: string;
    name: string;
  };
  /** The clan's war league in that group; null when the group wasn't stored. */
  leagueId: number | null;
  season: string;
  /** Rounds the player was in the lineup for. */
  wars: number;
  attacks: number;
  /** Attacks left unused in ended rounds. */
  missed: number;
  stars: number;
  threeStars: number;
  /** Sum over attacks; divide by `attacks` for the average. */
  destruction: number;
}

export interface AggregateClanWarLeagueHistoryItemsDto {
  items: AggregateClanWarLeagueHistoryDto[];
}

export interface ThresholdsDto {
  rank: number;
  minTrophies: number;
}

export interface LegendRankingThresholdsSnapShotDto {
  timestamp: string;
  thresholds: ThresholdsDto[];
}

export interface LegendRankingThresholdsDto {
  live: LegendRankingThresholdsSnapShotDto;
  eod: LegendRankingThresholdsSnapShotDto | null;
  history: LegendRankingThresholdsSnapShotDto[];
}

export interface GetLegendAttacksInputDto {
  /**
   * @maxItems 100
   * @minItems 1
   * @example ["#2PP"]
   */
  playerTags: string[];
}

export interface LegendAttackLogDto {
  timestamp: number;
  start: number;
  end: number;
  diff: number;
  type: string;
}

export interface LegendAttacksDto {
  tag: string;
  name: string;
  seasonId: string;
  trophies: number;
  logs: LegendAttackLogDto[];
}

export interface LegendAttacksItemsDto {
  items: LegendAttacksDto[];
}

export interface LegendResetDto {
  /** Trophies before the reset. */
  from: number;
  /** Trophies after the reset, always 5000. */
  to: number;
}

export interface LegendDayBattleDto {
  isAttack: boolean;
  stars: number;
  destruction: number;
  trophyChange: number;
  opponentTag: string;
  /**
   * When the battle ended.
   * @format date-time
   */
  battleTime: string;
}

export interface LegendArmyUnitDto {
  /** @example "Thrower" */
  name: string;
  count: number;
}

export interface LegendHeroSetupDto {
  /** @example "Archer Queen" */
  name: string;
  pet: string | null;
  equipment: string[];
  /** Share of the season's attacks with this exact setup, in percent. */
  share: number;
}

export interface LegendArmyDto {
  /** Share of the season's attacks with this exact army, in percent. */
  share: number;
  /** Most first. */
  troops: LegendArmyUnitDto[];
  /** Most first. */
  spells: LegendArmyUnitDto[];
  siege: LegendArmyUnitDto | null;
}

export interface LegendArmiesDto {
  tag: string;
  seasonId: string;
  /** Legend attacks with an army code. */
  attacks: number;
  /** Each hero's most used pet and equipment, most used hero first. */
  heroes: LegendHeroSetupDto[];
  /** The most used army, without the clan castle. Null with no attacks. */
  army: LegendArmyDto | null;
}

export interface LegendDayDto {
  /**
   * The game day, which starts at 05:00 UTC.
   * @example "2026-10-12"
   */
  date: string;
  /** Trophies at the start of the day, after any reset. Null when no trophy change was tracked. */
  initialTrophies: number | null;
  /** Trophies after the day's last tracked change. Null when no trophy change was tracked. */
  currentTrophies: number | null;
  /** The Monday reset to 5000 (everyone's, at season start), when it moved this player. */
  reset?: LegendResetDto;
  attackCount: number;
  defenseCount: number;
  /** Trophies gained from attacks. */
  attackTrophies: number;
  /** Trophies lost to defenses, as a negative number, including `missedDefenseTrophies`. */
  defenseTrophies: number;
  /**
   * Trophies the game took at the end of the day for defenses the player didn't get (fewer than
   * 8), as a negative number. Absent when none were taken.
   */
  missedDefenseTrophies?: number;
  /** Oldest first. */
  battles: LegendDayBattleDto[];
}

export interface LegendDaysDto {
  tag: string;
  seasonId: string;
  /** Days with a battle or a tracked trophy change, oldest first. */
  items: LegendDayDto[];
}

export interface LegendSeasonDto {
  seasonId: string;
  /** Trophies when the season's first attack or defense was tracked. */
  initial: number;
  /** Trophies after the season's last tracked attack or defense. */
  trophies: number;
  /**
   * Trophies gained from attacks. Several attacks between two checks land as one log entry, so
   * attacks are only totalled, not counted.
   */
  attackTrophies: number;
  /** Trophies lost to defenses, as a negative number. */
  defenseTrophies: number;
}

export interface LegendSeasonsDto {
  /** Newest first, at most 6. */
  items: LegendSeasonDto[];
}

export interface LegendRankDto {
  tag: string;
  name: string;
  rank: number;
  trophies: number;
}

export interface RankingLocationDto {
  /** A country code such as `IN`, or `global` for worldwide. */
  countryCode: string;
  name: string;
}

export interface RankingLocationsDto {
  /** Global first, then countries by name. */
  items: RankingLocationDto[];
}

export interface RankingSeasonsDto {
  /** Saved league seasons before the current one, newest first. */
  items: string[];
}

export interface RankingStandingsInputDto {
  /** @maxItems 50 */
  playerTags?: string[];
  /** @maxItems 50 */
  clanTags?: string[];
}

export interface RankingStandingDto {
  tag: string;
  name: string;
  board: 'players' | 'clans' | 'capital' | 'builder-base-players' | 'builder-base-clans';
  location: RankingLocationDto;
  rank: number;
  previousRank: number | null;
  score: number;
}

export interface RankingStandingsDto {
  /** Where the tags stand this season, on every saved board they're on. */
  items: RankingStandingDto[];
}

export interface ClanBoardStandingDto {
  board: 'players' | 'clans' | 'capital' | 'builder-base-players' | 'builder-base-clans';
  location: RankingLocationDto;
  /** Null when the clan isn't in this board's top 200. */
  rank: number | null;
  previousRank: number | null;
  /** Points of the board's last place: what it takes to get on it. */
  cutoff: number | null;
}

export interface ClanRankingSeasonDto {
  season: string;
  /** Season-end rank in the clan's country; null when outside the top 200. */
  clans: number | null;
  capital: number | null;
}

export interface ClanRankingsDto {
  /** The clan's country; null when it hasn't set one. */
  location: RankingLocationDto | null;
  /** Clans and capital boards, in its country (when set) and worldwide, this season. */
  boards: ClanBoardStandingDto[];
  /** Past seasons in its country, newest first, at most 6. */
  history: ClanRankingSeasonDto[];
}

export interface PlayerRankingSeasonDto {
  season: string;
  location: RankingLocationDto;
  rank: number;
  trophies: number;
}

export interface PlayerRankingsDto {
  /** Every saved season and board the player finished on, newest first. */
  items: PlayerRankingSeasonDto[];
}

export interface RankingEntryDto {
  rank: number;
  /** Rank at the end of the season before; null when it wasn't ranked then or isn't known. */
  previousRank: number | null;
  tag: string;
  name: string;
  /** Trophies for player boards, points for clan boards. */
  score: number;
  /** Live boards only. */
  badgeUrl: string | null;
  clan: {
    tag: string;
    name: string;
  };
}

export interface RankingBoardDto {
  location: RankingLocationDto;
  board: 'players' | 'clans' | 'capital' | 'builder-base-players' | 'builder-base-clans';
  /** The saved season, or null for the live board. */
  season: string | null;
  items: RankingEntryDto[];
}

export interface ClanWarLeagueRound {
  warTags: string[];
}

export interface LeagueGroupClanDto {
  tag: string;
  name: string;
  leagueId: number;
}

export interface ClanWarAttackDto {
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  order: number;
  duration: number;
}

export interface ClanWarMemberDto {
  attacks?: ClanWarAttackDto[];
  bestOpponentAttack?: ClanWarAttackDto;
  mapPosition: number;
  name: string;
  opponentAttacks: number;
  tag: string;
  townhallLevel: number;
}

export interface WarClanDto {
  tag: string;
  name: string;
  badgeUrls: ClanBadge;
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
  members: ClanWarMemberDto[];
}

export interface ClanWarDto {
  state: 'notInWar' | 'preparation' | 'inWar' | 'warEnded';
  startTime: string;
  preparationStartTime: string;
  endTime: string;
  battleModifier?: 'none' | 'hardMode';
  attacksPerMember?: number | null;
  round?: number | null;
  warTag?: string | null;
  teamSize: number;
  clan: WarClanDto;
  opponent: WarClanDto;
  result: string;
}

export interface ClanWarLeaguesDto {
  season: string;
  rounds: ClanWarLeagueRound[];
  clans: LeagueGroupClanDto[];
  wars: ClanWarDto[];
}

export interface ClanWarSideDto {
  tag: string;
  name: string;
  badgeUrls: ClanBadge;
  clanLevel: number;
  attacks: number;
  stars: number;
  destructionPercentage: number;
}

export interface ClanWarLeagueRoundDto {
  /** Position in the group's schedule; null when the group wasn't stored. */
  round: number | null;
  state: 'preparation' | 'inWar' | 'warEnded';
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  result: 'win' | 'lose' | 'tie';
  id: number;
  teamSize: number;
  clan: ClanWarSideDto;
  opponent: ClanWarSideDto;
}

export interface ClanWarMemberTotalsDto {
  tag: string;
  name: string;
  /** From the member's latest war in the set. */
  townHallLevel: number;
  /** Wars the member was in the lineup for. */
  wars: number;
  attacks: number;
  stars: number;
  threeStars: number;
  /** Sum over attacks; divide by `attacks` for the average. */
  destruction: number;
  /** Attacks left unused in ended wars. */
  missed: number;
  /** Attacks on a base of the same or a higher Town Hall. */
  sameThAttacks: number;
  sameThThreeStars: number;
}

export interface ClanWarLeagueSeasonDto {
  /** The stored group (for standings); null when it wasn't stored. */
  groupId: number | null;
  /** The game's season id for the group, e.g. "2026-10-02"; null when the group wasn't stored. */
  groupSeason: string | null;
  /** The clan's war league that season; null when the group wasn't stored. */
  leagueId: number | null;
  /** Clans in the group; null when the group wasn't stored. */
  groupSize: number | null;
  season: string;
  rounds: ClanWarLeagueRoundDto[];
  /** Most stars first. */
  members: ClanWarMemberTotalsDto[];
}

export interface ClanWarLeagueSeasonsDto {
  /** Newest season first. */
  items: ClanWarLeagueSeasonDto[];
}

export interface ClanWarStatsDto {
  /** Ended wars counted; fewer than asked when the clan has fewer stored. */
  wars: number;
  /** CWL seasons among those wars, newest first. */
  seasons: string[];
  members: ClanWarMemberTotalsDto[];
}

export interface ClanWarLeagueStandingDto {
  badgeUrls: ClanBadge | null;
  tag: string;
  name: string;
  /** Stars plus 10 per war won, as the game ranks them. */
  stars: number;
  /** Total destruction over all wars: each war's percentage times its size. */
  destruction: number;
  wins: number;
  /** League at the start of the season. */
  leagueId: number;
}

export interface ClanWarLeagueStandingsDto {
  groupId: number;
  season: string;
  /** Rounds with at least one war started. */
  roundsPlayed: number;
  totalRounds: number;
  /** False when some wars no longer load from the game, so the table is partial. */
  complete: boolean;
  /** Best first. */
  rows: ClanWarLeagueStandingDto[];
}

export interface ClanWarSummaryDto {
  warType: WarTypes;
  state: 'preparation' | 'inWar' | 'warEnded';
  /** @format date-time */
  preparationStartTime: string;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  /** Set for CWL rounds only. */
  warTag: string | null;
  /** From the requested clan's side; "tie" while a war is still running and level. */
  result: 'win' | 'lose' | 'tie';
  id: number;
  teamSize: number;
  attacksPerMember: number;
  clan: ClanWarSideDto;
  opponent: ClanWarSideDto;
}

export interface ClanWarListDto {
  /** Pass as `before` for the next page; null on the last page. */
  next: number | null;
  items: ClanWarSummaryDto[];
}

export interface CurrentWarDto {
  /** The regular war, or the CWL round in war (else in preparation, else the last ended one). */
  war: ClanWarDto | null;
  /** False when the war log is private: regular wars are hidden then, CWL wars are not. */
  isWarLogPublic: boolean;
}

export interface GameEventDto {
  type: 'season' | 'raid_weekend' | 'clan_games' | 'cwl';
  state: 'ended' | 'active' | 'upcoming';
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  /**
   * CWL only: when signup closes.
   * @format date-time
   */
  signupEndTime?: string;
}

export interface GameEventsDto {
  /** Every occurrence overlapping the range, by start time. */
  items: GameEventDto[];
}

export interface UpcomingEventsDto {
  /** Running or next occurrence of each event, soonest change first. */
  items: GameEventDto[];
}

export interface RosterMemberOfRostersEntity {
  warPreference: 'in' | 'out';
  categoryId?: string | null;
  name: string;
  tag: string;
  userId: string | null;
  username: string | null;
  displayName?: string | null;
  role: string | null;
  townHallLevel: number;
  heroes: Record<string, number>;
  trophies: number;
  leagueId?: number;
  clan?: {
    tag: string;
    name: string;
    alias?: string | null;
  };
  /** @format date-time */
  createdAt: string;
}

export interface RostersEntity {
  _id: string;
  category: 'GENERAL' | 'CWL' | 'WAR' | 'TROPHY' | 'NO_CLAN';
  name: string;
  guildId: string;
  maxMembers?: number;
  minTownHall?: number;
  maxTownHall?: number;
  minHeroLevels?: number;
  roleId?: string | null;
  colorCode?: number;
  clan: {
    tag: string;
    name: string;
    badgeUrl: string;
    league: {
      id?: number;
      name?: string;
    };
  };
  members: RosterMemberOfRostersEntity[];
  layout?: string;
  sheetId?: string;
  closed: boolean;
  /** @format date-time */
  startTime?: string | null;
  /** @format date-time */
  endTime?: string | null;
  sortBy?: string;
  useClanAlias?: boolean;
  allowUnlinked?: boolean;
  allowMultiSignup?: boolean;
  maxAccountsPerUser?: number | null;
  rosterImage?: string | null;
  allowCategorySelection?: boolean;
  requireCategorySelection?: boolean;
  categorySelectionCustomText?: string | null;
  logChannelId?: string | null;
  /** @format date-time */
  lastUpdated: string;
  /** @format date-time */
  createdAt: string;
}

export interface RosterGroupsEntity {
  _id: string;
  displayName: string;
  name: string;
  guildId: string;
  order: number;
  selectable: boolean;
  roleId?: string | null;
  /** @format date-time */
  createdAt: string;
}

export interface GetRostersDto {
  rosters: RostersEntity[];
  categories: RosterGroupsEntity[];
}

export interface RosterInput {
  category?: RosterCategory;
  sortBy?: RosterSortBy;
  /**
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /** Leave out for a roster open to all clans. */
  clanTag?: string | null;
  /** Sign up the clan's current members when the roster is created. */
  importMembers?: boolean;
  allowUnlinked?: boolean;
  allowMultiSignup?: boolean;
  allowCategorySelection?: boolean;
  requireCategorySelection?: boolean;
  /**
   * @minLength 1
   * @maxLength 100
   */
  categorySelectionCustomText?: string | null;
  /**
   * @min 5
   * @max 500
   */
  maxMembers?: number;
  /**
   * @min 1
   * @max 75
   */
  maxAccountsPerUser?: number | null;
  /**
   * @min 2
   * @max 18
   */
  minTownHall?: number | null;
  /**
   * @min 2
   * @max 18
   */
  maxTownHall?: number | null;
  /** @min 0 */
  minHeroLevels?: number | null;
  /** @pattern ^\d{17,20}$ */
  roleId?: string | null;
  /** 3 to 5 column keys joined by "/", e.g. "#/TH_ICON/DISCORD/NAME/CLAN". */
  layout?: string;
  useClanAlias?: boolean;
  /**
   * @min 0
   * @max 16777215
   */
  colorCode?: number | null;
  /** @format uri */
  rosterImage?: string | null;
  /** ISO time; null opens sign-ups right away. */
  startTime?: string | null;
  /** ISO time; null keeps sign-ups open until closed by hand. */
  endTime?: string | null;
}

export interface RosterGroupInput {
  /**
   * @minLength 1
   * @maxLength 30
   */
  name: string;
  /** @pattern ^\d{17,20}$ */
  roleId?: string | null;
  /** Players can pick it when they sign up. */
  selectable?: boolean;
}

export interface RosterGroupUpdateInput {
  /**
   * @minLength 1
   * @maxLength 30
   */
  name?: string;
  /** @pattern ^\d{17,20}$ */
  roleId?: string | null;
  /** Players can pick it when they sign up. */
  selectable?: boolean;
  /**
   * @min 1
   * @max 1000
   */
  order?: number;
}

export interface RosterUpdateInput {
  category?: RosterCategory;
  sortBy?: RosterSortBy;
  /**
   * @minLength 1
   * @maxLength 30
   */
  name?: string;
  /** Leave out for a roster open to all clans. */
  clanTag?: string | null;
  /** Sign up the clan's current members when the roster is created. */
  importMembers?: boolean;
  allowUnlinked?: boolean;
  allowMultiSignup?: boolean;
  allowCategorySelection?: boolean;
  requireCategorySelection?: boolean;
  /**
   * @minLength 1
   * @maxLength 100
   */
  categorySelectionCustomText?: string | null;
  /**
   * @min 5
   * @max 500
   */
  maxMembers?: number;
  /**
   * @min 1
   * @max 75
   */
  maxAccountsPerUser?: number | null;
  /**
   * @min 2
   * @max 18
   */
  minTownHall?: number | null;
  /**
   * @min 2
   * @max 18
   */
  maxTownHall?: number | null;
  /** @min 0 */
  minHeroLevels?: number | null;
  /** @pattern ^\d{17,20}$ */
  roleId?: string | null;
  /** 3 to 5 column keys joined by "/", e.g. "#/TH_ICON/DISCORD/NAME/CLAN". */
  layout?: string;
  useClanAlias?: boolean;
  /**
   * @min 0
   * @max 16777215
   */
  colorCode?: number | null;
  /** @format uri */
  rosterImage?: string | null;
  /** ISO time; null opens sign-ups right away. */
  startTime?: string | null;
  /** ISO time; null keeps sign-ups open until closed by hand. */
  endTime?: string | null;
  closed?: boolean;
}

export interface CloneRosterInput {
  /**
   * Defaults to "<name> [CLONE]".
   * @minLength 1
   * @maxLength 30
   */
  name?: string;
}

export interface RosterTagsInput {
  /**
   * @maxItems 100
   * @minItems 1
   */
  playerTags: string[];
}

export interface RosterCheckUserDto {
  id: string;
  username: string;
  displayName: string;
}

export interface RosterPlayerCheckDto {
  tag: string;
  /** Null when no player has this tag. */
  name: string | null;
  townHallLevel: number | null;
  heroLevels: number | null;
  clanRole: string | null;
  /** The linked Discord member, if any. */
  user: RosterCheckUserDto | null;
  canJoin: boolean;
  /** Why the player can't join, in the bot's words. */
  reason: string | null;
}

export interface AddRosterMembersInput {
  /**
   * @maxItems 100
   * @minItems 1
   */
  playerTags: string[];
  groupId?: string | null;
}

export interface AddRosterMembersDto {
  roster: RostersEntity;
  result: RosterPlayerCheckDto[];
}

export interface RemoveMembersBulkInput {
  /** @minItems 1 */
  playerTags: string[];
}

export interface TransferRosterMembersInput {
  /** Required unless newGroupId is set. */
  newRosterId?: string;
  /** Required unless newRosterId is set. */
  newGroupId?: string;
  /** @minItems 1 */
  playerTags: string[];
}

export interface TransferRosterMembersDto {
  roster: RostersEntity;
  result: {
    player: {
      name?: string;
      tag?: string;
    };
    success: boolean;
    message: string;
  }[];
}

export interface ClanRefDto {
  tag: string;
  name: string | null;
}

export interface TimezoneDto {
  id: string;
  name: string;
  location: string;
}

export interface UserSettingsDto {
  /** Used by bot commands run without a clan tag. */
  clan: ClanRefDto | null;
  /** Clans the user bookmarked on the dashboard, on every device. */
  bookmarks: ClanRefDto[];
  /** Used by /activity charts; null means UTC. */
  timezone: TimezoneDto | null;
}

export interface TaskAccountDto {
  /** Null when the game didn't return the player. */
  townHallLevel: number | null;
  tag: string;
  name: string;
}

export interface TaskClanDto {
  tag: string;
  name: string;
}

export interface WarTaskDto {
  warType: WarTypes;
  /** From the war's times rather than the stored state, which can lag behind. */
  state: 'preparation' | 'inWar';
  /** Set for CWL rounds only. */
  warTag: string | null;
  /** The CWL round number; null for other wars. */
  round: number | null;
  /** @format date-time */
  startTime: string;
  /** @format date-time */
  endTime: string;
  account: TaskAccountDto;
  /** The account's side. */
  clan: TaskClanDto;
  opponent: TaskClanDto;
  attacks: number;
  attackLimit: number;
}

export interface WarTasksDto {
  /** One per account and war that hasn't ended, including CWL rounds in clans the account left. */
  items: WarTaskDto[];
}

export interface CapitalRaidTaskDto {
  /** Attacks allowed, bonus included; null until the account's first attack this weekend. */
  attackLimit: number | null;
  /** @format date-time */
  endTime: string;
  account: TaskAccountDto;
  clan: TaskClanDto;
  attacks: number;
}

export interface CapitalRaidTasksDto {
  /** One per account whose current clan is raiding; empty outside a raid weekend. */
  items: CapitalRaidTaskDto[];
}

export interface ClanGamesTaskDto {
  /** The clan the account is earning points in; null when unknown. */
  clan: TaskClanDto | null;
  /** @format date-time */
  endTime: string;
  account: TaskAccountDto;
  points: number;
  maxPoints: number;
}

export interface ClanGamesTasksDto {
  /** One per tracked account; empty outside Clan Games. */
  items: ClanGamesTaskDto[];
}

export interface TaskLeagueDto {
  iconUrl: string | null;
  id: number;
  name: string;
}

export interface LegendTaskDto {
  /**
   * When the legend day ends.
   * @format date-time
   */
  endTime: string;
  account: TaskAccountDto;
  league: TaskLeagueDto;
  /** Attacks on the current legend day. */
  attacks: number;
  attackLimit: number;
}

export interface LegendTasksDto {
  /** One per account in Legend League. */
  items: LegendTaskDto[];
}

export interface RankedTaskDto {
  /** Null when the game data is unavailable. */
  attackLimit: number | null;
  /**
   * When the ranked week ends.
   * @format date-time
   */
  endTime: string;
  account: TaskAccountDto;
  league: TaskLeagueDto;
  /** Attacks this ranked week. */
  attacks: number;
}

export interface RankedTasksDto {
  /** One per account in a ranked group this week. */
  items: RankedTaskDto[];
}

export interface ClanTagInput {
  /** @pattern ^#?[0-9A-Za-z]{3,12}$ */
  clanTag: string;
}

export interface TimezoneInput {
  /**
   * IANA ID, e.g. `Asia/Kolkata`.
   * @minLength 1
   * @maxLength 64
   */
  id: string;
}

export interface GameExportDto {
  data: Record<string, any>;
  tag: string;
  /**
   * When the game made the export.
   * @format date-time
   */
  exportedAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface GameExportsDto {
  /** One per account this user saved an export for. */
  items: GameExportDto[];
}

export interface GameExportInput {
  /** The game's data export for this account, as copied from the game. */
  data: Record<string, any>;
}

export interface GuildClanDto {
  _id: string;
  categoryId: string;
  name: string;
  tag: string;
  order: number;
  league: string;
  level: number;
  members: number;
  /** Finds the clan in commands; `{ALIAS}` in nicknames. */
  alias: string | null;
  /** Shown instead of the clan name in reminders and lists. */
  nickname: string | null;
  /** Commands run in these channels use this clan when no tag is given. */
  channels: string[];
}

export interface CategoryDto {
  _id: string;
  displayName: string;
  order: number;
  clans: GuildClanDto[];
}

export interface GuildClansDto {
  guildId: string;
  name: string;
  categories: CategoryDto[];
}

export interface ReorderClansInput {
  _id: string;
  order: number;
}

export interface ReorderCategoriesInput {
  _id: string;
  order: number;
  clans: ReorderClansInput[];
}

export interface ReorderClanCategoriesInput {
  /** @minItems 1 */
  categories: ReorderCategoriesInput[];
}

export interface AddGuildClanInput {
  /**
   * With or without `#`; the letter O is read as zero, as in the game.
   * @pattern ^#?[0-9A-Za-z]{3,15}$
   */
  tag: string;
  categoryId?: string | null;
}

export interface ClanSettingsInput {
  /**
   * Up to 15 characters, no spaces or leading #.
   * @pattern ^[^#\s]\S{0,14}$
   */
  alias?: string | null;
  /**
   * @minLength 1
   * @maxLength 15
   */
  nickname?: string | null;
  /** @maxItems 25 */
  channels?: string[];
}

export interface ClanCategoryInput {
  /**
   * @minLength 1
   * @maxLength 36
   */
  name: string;
}

export interface GuildChannelDto {
  id: string;
  name: string;
  /** Discord channel type: 0 text, 5 announcement, 15 forum, 16 media; 10, 11, 12 threads. */
  type: number;
  /** A channel's category, or a thread's channel. */
  parentId: string | null;
  /** False for a forum or media channel, which is listed only as the heading of its posts. */
  selectable: boolean;
  /** ClashPerk already has a webhook here (a thread's is its channel's), so no Discord sign-in is needed. */
  hasWebhook: boolean;
}

export interface GuildCategoryDto {
  id: string;
  name: string;
}

export interface MentionChannelDto {
  id: string;
  name: string;
  /** Discord channel type: 0 text, 2 voice, 5 announcement, 13 stage, 15 forum, 16 media; 10, 11, 12 threads. */
  type: number;
  /** A thread's channel; null for a channel. */
  parentId: string | null;
}

export interface GuildRoleDto {
  id: string;
  name: string;
  color: number;
  position: number;
}

export interface GuildEmojiDto {
  id: string;
  name: string;
  animated: boolean;
}

export interface GuildEmojisDto {
  /** This server's, without the ones it lost with its boost level. */
  server: GuildEmojiDto[];
  /** The bot's own, which it can use in any server. */
  bot: GuildEmojiDto[];
}

export interface GuildClanLogDto {
  logType: ClanLogType;
  channelStatus: ChannelStatus;
  clanTag: string;
  id: string;
  channelId: string;
  channelName: string | null;
  /** The channel a thread is in; null for channels. */
  parentChannelName: string | null;
  isEnabled: boolean;
  roleId: string | null;
  color: number | null;
  /** @format date-time */
  updatedAt: string;
}

export interface ClanLogLimitDto {
  /** How many clans can have logs in this server. */
  limit: number;
  /** Clans that already have logs; adding logs to these never hits the limit. */
  clanTags: string[];
  patron: boolean;
}

export interface ClanEmbedDto {
  fields: ClanEmbedField[];
  channelId: string;
  channelName: string | null;
  color: number | null;
  /** Null when it shows the in-game clan description. */
  description: string | null;
  /** Null when it shows the in-game Town Hall requirement. */
  requirements: string | null;
  bannerImage: string | null;
  /** The posted message, once the bot has sent it. */
  messageId: string | null;
  /** @format date-time */
  updatedAt: string;
}

export interface ClanEmbedStateDto {
  /** Null when the clan has no embed. */
  embed: ClanEmbedDto | null;
}

export interface ReminderWebhookInput {
  /** @pattern ^\d{17,20}$ */
  id: string;
  /** @minLength 1 */
  token: string;
}

export interface ClanEmbedInput {
  /** @maxItems 9 */
  fields: ClanEmbedField[];
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
  /**
   * Embed color as an RGB integer; null uses the server's default.
   * @min 0
   * @max 16777215
   */
  color?: number | null;
  /**
   * Null shows the in-game clan description.
   * @minLength 1
   * @maxLength 1200
   */
  description?: string | null;
  /**
   * Null shows the in-game Town Hall requirement.
   * @minLength 1
   * @maxLength 600
   */
  requirements?: string | null;
  /**
   * @format uri
   * @maxLength 256
   */
  bannerImage?: string | null;
}

export interface ClanLogDto {
  logType: ClanLogType;
  channelStatus: ChannelStatus;
  id: string;
  channelId: string;
  channelName: string | null;
  /** The channel a thread is in; null for channels. */
  parentChannelName: string | null;
  isEnabled: boolean;
  roleId: string | null;
  color: number | null;
  /** @format date-time */
  updatedAt: string;
}

export interface ClanLogInput {
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
  isEnabled: boolean;
  /**
   * Pinged with each post; null for none.
   * @pattern ^\d{17,20}$
   */
  roleId: string | null;
  /**
   * Embed color as an RGB integer; null uses the server's default.
   * @min 0
   * @max 16777215
   */
  color: number | null;
}

export interface AutoRoleClanDto {
  tag: string;
  name: string;
  leader: string | null;
  coLeader: string | null;
  elder: string | null;
  member: string | null;
  everyone: string | null;
  warRole: string | null;
}

export interface NicknameRoleLabels {
  /** @maxLength 10 */
  leader: string;
  /** @maxLength 10 */
  coLeader: string;
  /** @maxLength 10 */
  elder: string;
  /** @maxLength 10 */
  member: string;
}

export interface AutoRolesDto {
  townHall: Record<string, string>;
  builderHall: Record<string, string>;
  leagues: Record<string, string>;
  builderLeagues: Record<string, string>;
  trophies: Record<string, string>;
  delayExclusions: DelayExclusion[];
  nicknameAccount: NicknameAccount;
  familyRole: string | null;
  exclusiveFamilyRole: string | null;
  familyLeadersRoles: string[];
  guestRole: string | null;
  verifiedRole: string | null;
  linkedRole: string | null;
  eosPushRole: string | null;
  eosPushClans: string[];
  /** Town Hall and Builder Hall roles also go to accounts outside the server's clans. */
  allowNonFamilyTownHall: boolean;
  /** League and builder league roles also go to accounts outside the server's clans. */
  allowNonFamilyLeagues: boolean;
  verifiedOnlyClanRoles: boolean;
  autoUpdate: boolean;
  forceRefresh: boolean;
  /** Members with no linked account still get roles like the guest role. */
  allowNotLinked: boolean;
  /** Milliseconds; one of the bot's choices. */
  removalDelay: number;
  additionDelay: number;
  clans: AutoRoleClanDto[];
  /** Nickname format for members in your clans; "" means none. */
  familyNicknameFormat: string;
  /** Nickname format for everyone else; "" means none. */
  nonFamilyNicknameFormat: string;
  /** Nicknames change on the bot's checks, not only on a refresh. */
  autoNickname: boolean;
  nicknameRoleLabels: NicknameRoleLabels;
}

export interface AutoRolesInput {
  townHall?: Record<string, string>;
  builderHall?: Record<string, string>;
  leagues?: Record<string, string>;
  builderLeagues?: Record<string, string>;
  trophies?: Record<string, string>;
  delayExclusions?: DelayExclusion[];
  nicknameAccount?: NicknameAccount;
  /** @pattern ^\d{17,20}$ */
  familyRole?: string | null;
  /** @pattern ^\d{17,20}$ */
  exclusiveFamilyRole?: string | null;
  /** @maxItems 25 */
  familyLeadersRoles?: string[];
  /** @pattern ^\d{17,20}$ */
  guestRole?: string | null;
  /** @pattern ^\d{17,20}$ */
  verifiedRole?: string | null;
  /** @pattern ^\d{17,20}$ */
  linkedRole?: string | null;
  /** @pattern ^\d{17,20}$ */
  eosPushRole?: string | null;
  eosPushClans?: string[];
  allowNonFamilyTownHall?: boolean;
  allowNonFamilyLeagues?: boolean;
  verifiedOnlyClanRoles?: boolean;
  autoUpdate?: boolean;
  forceRefresh?: boolean;
  allowNotLinked?: boolean;
  removalDelay?:
    | 0
    | 3600000
    | 7200000
    | 14400000
    | 21600000
    | 28800000
    | 43200000
    | 64800000
    | 86400000
    | 129600000
    | 172800000
    | 259200000
    | 604800000
    | 1036800000;
  additionDelay?:
    0 | 3600000 | 7200000 | 14400000 | 21600000 | 28800000 | 43200000 | 64800000 | 86400000;
  /** @maxLength 100 */
  familyNicknameFormat?: string;
  /** @maxLength 100 */
  nonFamilyNicknameFormat?: string;
  autoNickname?: boolean;
  nicknameRoleLabels?: NicknameRoleLabels;
}

export interface AutoRoleClanInput {
  /** @pattern ^\d{17,20}$ */
  leader: string | null;
  /** @pattern ^\d{17,20}$ */
  coLeader: string | null;
  /** @pattern ^\d{17,20}$ */
  elder: string | null;
  /** @pattern ^\d{17,20}$ */
  member: string | null;
  /** @pattern ^\d{17,20}$ */
  everyone: string | null;
  /** @pattern ^\d{17,20}$ */
  warRole: string | null;
}

export interface FlagAuthorDto {
  id: string;
  username: string;
  displayName: string;
}

export interface FlagDto {
  flagType: FlagType;
  id: string;
  /** The short reference the bot shows, e.g. in `/flag delete`. */
  refId: string;
  tag: string;
  name: string;
  /** Strike points; 1 unless set. */
  flagImpact: number;
  reason: string;
  /**
   * Null when it never expires.
   * @format date-time
   */
  expiresAt: string | null;
  /** @format date-time */
  createdAt: string;
  createdBy: FlagAuthorDto;
}

export interface FlagsDto {
  /** Active flags, newest first. */
  items: FlagDto[];
  /** Active flags of both types, against the limit. */
  total: number;
  /** Null for supporter servers, which have no limit. */
  limit: number | null;
}

export interface FlagInput {
  flagType: FlagType;
  /**
   * One or more player tags; the bot's option fits about 25.
   * @maxItems 25
   * @minItems 1
   */
  playerTags: string[];
  /**
   * @minLength 1
   * @maxLength 256
   */
  reason: string;
  /**
   * Leave out for a flag that never expires.
   * @min 1
   * @max 36500
   */
  expiresInDays?: number | null;
  /**
   * Strike points, 1 to 100; defaults to 1. The bot stores it for bans too.
   * @min 1
   * @max 100
   */
  flagImpact?: number;
}

export interface ListMemberDto {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface FlagAlertLogDto {
  roleId: string | null;
  useAutoRole: boolean;
  channelId: string;
  /** Null when the bot can't see the channel any more. */
  channelName: string | null;
}

export interface ServerLogChannelDto {
  channelId: string;
  /** Null when the bot can't see the channel any more. */
  channelName: string | null;
}

export interface WelcomeLogDto {
  channelId: string;
  /** Null when the bot can't see the channel any more. */
  channelName: string | null;
  enabled: boolean;
  welcomeText: string;
  description: string;
  bannerImage: string | null;
  embedColor: number | null;
}

export interface ServerLogsDto {
  flagAlert: FlagAlertLogDto | null;
  rosterChangelog: ServerLogChannelDto | null;
  maintenance: ServerLogChannelDto | null;
  welcome: WelcomeLogDto | null;
}

export interface FlagAlertLogInput {
  /**
   * Pinged when a flagged player joins a clan; null for none.
   * @pattern ^\d{17,20}$
   */
  roleId?: string | null;
  /** Ping each clan's leader and co-leader roles from auto-roles instead of `roleId`. */
  useAutoRole?: boolean;
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
}

export interface ServerLogChannelInput {
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
}

export interface MaintenanceLogInput {
  /** @pattern ^\d{17,20}$ */
  channelId: string;
}

export interface WelcomeLogInput {
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
  /**
   * @minLength 1
   * @maxLength 500
   * @pattern \{\{user\}\}
   */
  welcomeText: string;
  /** @maxLength 2000 */
  description: string;
  /**
   * @format uri
   * @maxLength 256
   */
  bannerImage?: string | null;
  /**
   * RGB integer; null uses the bot's default.
   * @min 0
   * @max 16777215
   */
  embedColor?: number | null;
}

export interface ButtonMessageDto {
  /** Set for the link button only. */
  tokenField?: ButtonTokenField;
  title: string;
  description: string;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  color: number | null;
  buttonStyle: number;
}

export interface ButtonsDto {
  link: ButtonMessageDto | null;
  refresh: ButtonMessageDto | null;
  myRosters: ButtonMessageDto | null;
}

export interface ButtonMessageInput {
  /** Link button only: whether members enter their player token. */
  tokenField?: ButtonTokenField;
  /**
   * @minLength 1
   * @maxLength 256
   */
  title: string;
  /**
   * @minLength 1
   * @maxLength 2000
   */
  description: string;
  /** @maxLength 256 */
  imageUrl?: string | null;
  /** @maxLength 256 */
  thumbnailUrl?: string | null;
  /**
   * RGB integer; null for none.
   * @min 0
   * @max 16777215
   */
  color?: number | null;
  /** 1 blurple, 2 grey, 3 green, 4 red. */
  buttonStyle: 1 | 2 | 3 | 4;
}

export interface ManagerRolesDto {
  managerRoles: string[];
  rosterManagerRoles: string[];
  flagsManagerRoles: string[];
  linksManagerRoles: string[];
}

export interface ManagerRolesInput {
  /**
   * Can use every command and this dashboard, like Manage Server.
   * @maxItems 25
   */
  managerRoles?: string[];
  /** @maxItems 25 */
  rosterManagerRoles?: string[];
  /** @maxItems 25 */
  flagsManagerRoles?: string[];
  /** @maxItems 25 */
  linksManagerRoles?: string[];
}

export interface SubscriptionDto {
  active: boolean;
  /** A special tier such as `lifetime` or `gifted`; null for a regular plan. */
  tier: string | null;
}

export interface ServerConfigDto {
  color: number | null;
  webhookLimit: number;
  subscription: SubscriptionDto;
}

export interface ServerConfigInput {
  /**
   * RGB integer for the bot's embeds; null goes back to the default.
   * @min 0
   * @max 16777215
   */
  color?: number | null;
  /**
   * Most webhooks the bot creates in one channel before it shares them between logs.
   * @min 3
   * @max 8
   */
  webhookLimit?: number;
}

export interface GuildBetaDto {
  beta: boolean;
}

export interface TicketEmbedDto {
  title: string | null;
  description: string | null;
  color: number | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  footerText: string | null;
}

export interface TicketButtonDto {
  label: string;
  emoji: string | null;
  style: number;
}

export interface TicketQuestionDto {
  label: string;
  required: boolean;
}

export interface TicketTypeDto {
  id: string;
  label: string;
  emoji: string | null;
  buttonStyle: number;
  requireLinkedAccount: boolean;
  thMin: number | null;
  minTrophies: number | null;
  minLeagueTier: string | null;
  questions: TicketQuestionDto[];
  pingRoleIds: string[];
  viewOnlyRoleIds: string[];
  addRoleIds: string[];
  removeRoleIds: string[];
  openCategoryId: string | null;
  sleepCategoryId: string | null;
  namingConvention: string;
  createStaffThread: boolean;
  autoSleepHours: number | null;
  allowClaim: boolean;
}

export interface TicketLogChannelsDto {
  buttonClick: string | null;
  statusChange: string | null;
  ticketClose: string | null;
}

export interface TicketExtraButtonDto {
  kind: TicketExtraButtonKind;
  id: string;
  label: string;
  emoji: string | null;
  style: number;
  url: string | null;
}

export interface TicketPanelDto {
  displayMode: TicketDisplayMode;
  id: string;
  name: string;
  embed: TicketEmbedDto;
  button: TicketButtonDto;
  ticketTypes: TicketTypeDto[];
  logChannels: TicketLogChannelsDto;
  extraButtons: TicketExtraButtonDto[];
  extraButtonsPlacement: string;
  ticketCount: number;
  openTicketCount: number;
  /** @format date-time */
  updatedAt: string;
}

export interface TicketSavedReplyDto {
  name: string;
  content: string;
}

export interface TicketsDto {
  panels: TicketPanelDto[];
  savedReplies: TicketSavedReplyDto[];
}

export interface TicketMemberDto {
  id: string;
  /** From Discord, or the name the bot last saw for someone who left. Null when neither is known. */
  displayName: string | null;
  /** Null when they aren't in the server. */
  avatarUrl: string | null;
}

export interface TicketDto {
  status: TicketStatus;
  channelStatus: ChannelStatus;
  id: string;
  /** The ticket's number in the server. */
  number: number;
  panelId: string;
  /** Null when the panel was deleted. */
  panelName: string | null;
  typeId: string;
  /** Null when the type was deleted. */
  typeLabel: string | null;
  typeEmoji: string | null;
  openedBy: TicketMemberDto;
  claimedBy: TicketMemberDto | null;
  closedBy: TicketMemberDto | null;
  /** The linked game account the member picked, if the type asked for one. */
  accountTag: string | null;
  accountName: string | null;
  channelId: string;
  /** Null once the channel is deleted, which closing does. */
  channelName: string | null;
  staffThreadId: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  closedAt: string | null;
}

export interface TicketCountsDto {
  open: number;
  sleep: number;
  closed: number;
}

export interface TicketListDto {
  tickets: TicketDto[];
  counts: TicketCountsDto;
  /** Tickets matching the status filter, across every page. */
  total: number;
  /** Pass as `before` for the next 25. Null on the last page. */
  nextCursor: string | null;
}

export interface CreateTicketPanelInput {
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
}

export interface TicketEmbedInput {
  /**
   * @minLength 1
   * @maxLength 256
   */
  title?: string | null;
  /**
   * @minLength 1
   * @maxLength 2000
   */
  description?: string | null;
  /**
   * @min 1
   * @max 16777215
   */
  color?: number | null;
  /**
   * @format uri
   * @maxLength 512
   */
  imageUrl?: string | null;
  /**
   * @format uri
   * @maxLength 512
   */
  thumbnailUrl?: string | null;
  /**
   * @minLength 1
   * @maxLength 2048
   */
  footerText?: string | null;
}

export interface TicketButtonInput {
  /**
   * @minLength 1
   * @maxLength 80
   */
  label: string;
  /** @maxLength 56 */
  emoji?: string | null;
  /**
   * Discord button style: 1 blue, 2 grey, 3 green, 4 red.
   * @min 1
   * @max 4
   */
  style: number;
}

export interface TicketLogChannelsInput {
  /** Every click on the panel. */
  buttonClick?: string | null;
  /** Tickets put to sleep, reopened or claimed. */
  statusChange?: string | null;
  /** Closed tickets, with a transcript of the last 100 messages. */
  ticketClose?: string | null;
}

export interface TicketExtraButtonInput {
  kind: TicketExtraButtonKind;
  /**
   * @minLength 1
   * @maxLength 80
   */
  label: string;
  /** @maxLength 56 */
  emoji?: string | null;
  /**
   * Ignored for link buttons, which Discord always shows grey.
   * @min 1
   * @max 4
   */
  style?: number;
  /**
   * @format uri
   * @maxLength 256
   */
  url?: string;
}

export interface TicketPanelInput {
  displayMode?: TicketDisplayMode;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name?: string;
  embed?: TicketEmbedInput;
  button?: TicketButtonInput;
  logChannels?: TicketLogChannelsInput;
  /** @maxItems 10 */
  extraButtons?: TicketExtraButtonInput[];
  /** `row` keeps extra buttons beside the type buttons; `col` starts a new row. */
  extraButtonsPlacement?: 'row' | 'col';
}

export interface CreateTicketTypeInput {
  /**
   * @minLength 1
   * @maxLength 80
   */
  label: string;
  /** @maxLength 56 */
  emoji?: string | null;
}

export interface ReorderTicketTypesInput {
  /** @maxItems 25 */
  typeIds: string[];
}

export interface TicketQuestionInput {
  /**
   * Discord shows at most 45 characters in the form.
   * @minLength 1
   * @maxLength 45
   */
  label: string;
  required: boolean;
}

export interface TicketTypeInput {
  /**
   * @minLength 1
   * @maxLength 80
   */
  label?: string;
  /** @maxLength 56 */
  emoji?: string | null;
  /**
   * Used in buttons mode.
   * @min 1
   * @max 4
   */
  buttonStyle?: number;
  /** Requirements below only apply when this is on. */
  requireLinkedAccount?: boolean;
  /**
   * @min 1
   * @max 20
   */
  thMin?: number | null;
  /**
   * @min 1
   * @max 10000
   */
  minTrophies?: number | null;
  /**
   * 105000013 (Valkyrie League 13) to 105000036 (Legend League).
   * @pattern ^1050000(1[3-9]|2\d|3[0-6])$
   */
  minLeagueTier?: string | null;
  /** @maxItems 5 */
  questions?: TicketQuestionInput[];
  /**
   * Pinged on new tickets, and staff on them.
   * @maxItems 10
   */
  pingRoleIds?: string[];
  /** @maxItems 10 */
  viewOnlyRoleIds?: string[];
  /**
   * Given to the member who opens the ticket.
   * @maxItems 10
   */
  addRoleIds?: string[];
  /**
   * Taken from the member who opens the ticket.
   * @maxItems 10
   */
  removeRoleIds?: string[];
  openCategoryId?: string | null;
  sleepCategoryId?: string | null;
  /**
   * `{count}`, `{user}`, `{account_name}` and `{account_th}` are filled in.
   * @minLength 1
   * @maxLength 64
   */
  namingConvention?: string;
  createStaffThread?: boolean;
  /**
   * @min 1
   * @max 999
   */
  autoSleepHours?: number | null;
  allowClaim?: boolean;
}

export interface TicketSavedReplyInput {
  /**
   * @minLength 1
   * @maxLength 64
   */
  name: string;
  /**
   * @minLength 1
   * @maxLength 1800
   */
  content: string;
}

export interface TicketSavedRepliesInput {
  /** @maxItems 25 */
  savedReplies: TicketSavedReplyInput[];
}

export interface ReminderClanDto {
  tag: string;
  name: string;
}

export interface ReminderScheduleDto {
  warType: 'normal' | 'friendly' | 'cwl';
  id: string;
  clan: ReminderClanDto;
  /**
   * When the bot pings (or pinged) for this clan.
   * @format date-time
   */
  timestamp: string;
  triggered: boolean;
  /** Bot outcome once handled, e.g. `reminder_sent_successfully` or a skip reason. */
  reason: string | null;
}

export interface ClanWarReminderDto {
  disabled: boolean;
  townHalls: number[];
  remaining: number[];
  warTypes: string[];
  smartSkip: boolean;
  silent: boolean;
  randomLimit: number | null;
  id: string;
  /** Short ID the bot shows in Discord: the last 5 hex characters, uppercased. */
  shortId: string;
  channelId: string;
  channelName: string | null;
  threadId: string | null;
  message: string;
  /** Time before the event ends, in milliseconds. */
  duration: number;
  roles: string[];
  linkedOnly: boolean;
  clans: ReminderClanDto[];
  /** Runs from the last 3 days and upcoming ones, oldest first. The bot drops older runs. */
  schedules: ReminderScheduleDto[];
  /** @format date-time */
  createdAt: string;
}

export interface CapitalRaidReminderDto {
  allMembers: boolean;
  minThreshold: number;
  remaining: number[];
  id: string;
  /** Short ID the bot shows in Discord: the last 5 hex characters, uppercased. */
  shortId: string;
  channelId: string;
  channelName: string | null;
  threadId: string | null;
  message: string;
  /** Time before the event ends, in milliseconds. */
  duration: number;
  roles: string[];
  linkedOnly: boolean;
  clans: ReminderClanDto[];
  /** Runs from the last 3 days and upcoming ones, oldest first. The bot drops older runs. */
  schedules: ReminderScheduleDto[];
  /** @format date-time */
  createdAt: string;
}

export interface ClanGamesReminderDto {
  allMembers: boolean;
  minPoints: number;
  id: string;
  /** Short ID the bot shows in Discord: the last 5 hex characters, uppercased. */
  shortId: string;
  channelId: string;
  channelName: string | null;
  threadId: string | null;
  message: string;
  /** Time before the event ends, in milliseconds. */
  duration: number;
  roles: string[];
  linkedOnly: boolean;
  clans: ReminderClanDto[];
  /** Runs from the last 3 days and upcoming ones, oldest first. The bot drops older runs. */
  schedules: ReminderScheduleDto[];
  /** @format date-time */
  createdAt: string;
}

export interface GuildRemindersDto {
  clanWars: ClanWarReminderDto[];
  capitalRaids: CapitalRaidReminderDto[];
  clanGames: ClanGamesReminderDto[];
}

export interface ReminderPingsDto {
  /** optIn pings only members with the role; optOut skips them. */
  mode: 'optIn' | 'optOut';
  /** @pattern ^\d{17,20}$ */
  clanWarsRole: string | null;
  /** @pattern ^\d{17,20}$ */
  capitalRaidsRole: string | null;
  /** @pattern ^\d{17,20}$ */
  clanGamesRole: string | null;
}

export interface ReminderPingsInput {
  /** optIn pings only members with the role; optOut skips them. */
  mode: 'optIn' | 'optOut';
  /** @pattern ^\d{17,20}$ */
  clanWarsRole: string | null;
  /** @pattern ^\d{17,20}$ */
  capitalRaidsRole: string | null;
  /** @pattern ^\d{17,20}$ */
  clanGamesRole: string | null;
}

export interface ClanWarReminderInput {
  /** @uniqueItems true */
  roles: ReminderClanRole[];
  /**
   * Ping members with this many attacks left; empty pings nobody.
   * @uniqueItems true
   */
  remaining: WarAttacksLeft[];
  /**
   * @minItems 1
   * @uniqueItems true
   */
  warTypes: ReminderWarType[];
  disabled: boolean;
  /** @uniqueItems true */
  townHalls: number[];
  /** Skip once the clan reaches 100% destruction. */
  smartSkip: boolean;
  /** Post the message only, without mentioning members. */
  silent: boolean;
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
  /**
   * @minLength 1
   * @maxLength 1800
   */
  message: string;
  /**
   * Time before the event ends, in milliseconds.
   * @min 900000
   */
  duration: number;
  linkedOnly: boolean;
  /**
   * @maxItems 100
   * @minItems 1
   * @uniqueItems true
   */
  clans: string[];
}

export interface ReminderIdDto {
  id: string;
}

export interface CapitalRaidReminderInput {
  /** @uniqueItems true */
  roles: ReminderClanRole[];
  /** @uniqueItems true */
  remaining: RaidAttacksLeft[];
  allMembers: boolean;
  /**
   * @min 0
   * @max 6
   */
  minThreshold: number;
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
  /**
   * @minLength 1
   * @maxLength 1800
   */
  message: string;
  /**
   * Time before the event ends, in milliseconds.
   * @min 900000
   */
  duration: number;
  linkedOnly: boolean;
  /**
   * @maxItems 100
   * @minItems 1
   * @uniqueItems true
   */
  clans: string[];
}

export interface ClanGamesReminderInput {
  /** @uniqueItems true */
  roles: ReminderClanRole[];
  allMembers: boolean;
  /**
   * @min 0
   * @max 10000
   */
  minPoints: number;
  /** @pattern ^\d{17,20}$ */
  channelId: string;
  /** From Discord's `webhook.incoming` sign-in; without one, a known webhook in the channel is reused. */
  webhook?: ReminderWebhookInput;
  /**
   * @minLength 1
   * @maxLength 1800
   */
  message: string;
  /**
   * Time before the event ends, in milliseconds.
   * @min 900000
   */
  duration: number;
  linkedOnly: boolean;
  /**
   * @maxItems 100
   * @minItems 1
   * @uniqueItems true
   */
  clans: string[];
}

export interface ExportMembersInput {
  /**
   * @maxItems 100
   * @minItems 1
   */
  clanTags: string[];
  guildId: string;
  scheduled: boolean;
}

export interface ExportMembersOutputDto {
  spreadsheetId: string;
  spreadsheetUrl: string;
}

export interface CommandsUsageLogDto {
  userId: string;
  commandId: string;
  guildId: string;
  createdAt: number;
}

export interface CommandsUsageLogItemsDto {
  items: CommandsUsageLogDto[];
}

export interface BetaGuildDto {
  guildId: string;
  /** Null when ClashPerk isn't in the server. */
  name: string | null;
  iconUrl: string | null;
  note: string | null;
  addedBy: string;
  /** @format date-time */
  createdAt: string;
}

export interface BetaGuildsDto {
  guilds: BetaGuildDto[];
}

export interface AddBetaGuildsInput {
  /**
   * @maxItems 100
   * @minItems 1
   */
  guildIds: string[];
  /**
   * @minLength 1
   * @maxLength 200
   */
  note?: string | null;
}

export interface BetaGuildIdsDto {
  guildIds: string[];
}

export interface SubscriberServerDto {
  id: string;
  /** The server's current name when ClashPerk is in it, or the name when it was added. */
  name: string;
  /** Null without an icon or when ClashPerk isn't in the server. */
  iconUrl: string | null;
  /** Clans this subscription lets the server have logs for. */
  clanLimit: number;
}

export interface SubscriberDto {
  provider: SubscriptionProvider;
  cadence: BillingCadence;
  id: string;
  name: string;
  /** The Discord account that redeemed it. Null until someone does. */
  discordUserId: string | null;
  discordUsername: string | null;
  /** Bronze, silver or gold. Null for special tiers or an unknown reward. */
  plan: string | null;
  /** A special tier such as `lifetime` or `gifted`. */
  tier: string | null;
  /** Manual grants: where it was paid and the payment's reference. */
  note: string | null;
  active: boolean;
  /** The provider's own status, e.g. `active_patron` or `declined_patron`. */
  status: string | null;
  /** What each charge bills, for a month or a year, or a manual grant's last payment. */
  billedCents: number;
  /** The charge spread per month, estimated for yearly plans and manual grants. */
  monthlyCents: number;
  lifetimeCents: number;
  customBot: boolean;
  servers: SubscriberServerDto[];
  /** @format date-time */
  lastChargeDate: string | null;
  /**
   * Manual grants: when it ends. Null for lifetime or Patreon.
   * @format date-time
   */
  expiresAt: string | null;
  /** @format date-time */
  createdAt: string;
}

export interface SubscribersDto {
  subscribers: SubscriberDto[];
}

export interface SubscriptionPaymentInput {
  source: PaymentSource;
  /**
   * The transaction ID or receipt link.
   * @minLength 1
   * @maxLength 200
   */
  reference?: string;
  /**
   * What was paid, in US cents.
   * @min 0
   * @max 1000000
   */
  amountCents: number;
}

export interface GrantSubscriptionInput {
  plan: SubscriptionPlan;
  discordUserId: string;
  /**
   * Who paid, as the payment shows it.
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** @format email */
  email?: string;
  payment: SubscriptionPaymentInput;
  /** ISO time it ends, in the future. Null for lifetime. */
  expiresAt: string | null;
  /**
   * Servers to cover now. The user can add the rest with /redeem.
   * @maxItems 10
   */
  serverIds?: string[];
}

export interface UpdateSubscriptionInput {
  plan?: SubscriptionPlan;
  /** ISO time it ends. Null for lifetime. A past time ends it now. */
  expiresAt?: string | null;
  /** A new payment, such as a renewal. It's added to the lifetime total. */
  payment?: SubscriptionPaymentInput;
  /** @maxItems 10 */
  addServerIds?: string[];
}

export interface DeveloperDto {
  roles: UserRoles[];
  userId: string;
  username: string;
  displayName: string;
  isBot: boolean;
  /**
   * Null for accounts made before it was recorded.
   * @format date-time
   */
  createdAt: string | null;
  /** @format date-time */
  lastLoginAt: string | null;
}

export interface DevelopersDto {
  developers: DeveloperDto[];
}

export interface AddDeveloperInput {
  /**
   * @maxItems 11
   * @minItems 1
   */
  roles: UserRoles[];
  /** @pattern ^\d{17,20}$ */
  userId: string;
}

export interface AddedDeveloperDto {
  developer: DeveloperDto;
  /** Shown only once. Sign in with it at /auth/login. */
  passKey: string;
}

export interface EditDeveloperInput {
  /**
   * @maxItems 11
   * @minItems 1
   */
  roles: UserRoles[];
}

export interface MessageOkDto {
  message: string;
}

export type LoginData = LoginOkDto;

export type LoginError = ErrorResponseDto;

export interface GetAuthUserParams {
  userId: string;
}

export type GetAuthUserData = AuthUserDto;

export type GetAuthUserError = ErrorResponseDto;

export interface GetHandoffUserParams {
  token: string;
}

export type GetHandoffUserData = HandoffUserDto;

export type GetHandoffUserError = ErrorResponseDto;

export type CreateHandoffTokenData = HandoffTokenDto;

export type CreateHandoffTokenError = ErrorResponseDto;

export type GetBotGuildsData = BotGuildsDto;

export type GetBotGuildsError = ErrorResponseDto;

export type GetManagedGuildsData = ManagedGuildsDto;

export type GetManagedGuildsError = ErrorResponseDto;

export type GetGuildAccessData = GuildAccessDto;

export type GetGuildAccessError = ErrorResponseDto;

export type CreateLinkData = ResultOkDto;

export type CreateLinkError = ErrorResponseDto;

export interface DeleteLinkParams {
  playerTag: string;
}

export type DeleteLinkData = ResultOkDto;

export type DeleteLinkError = ErrorResponseDto;

export interface SetDefaultLinkParams {
  playerTag: string;
}

export type SetDefaultLinkData = ResultOkDto;

export type SetDefaultLinkError = ErrorResponseDto;

export interface SetLinkHiddenParams {
  playerTag: string;
}

export type SetLinkHiddenData = ResultOkDto;

export type SetLinkHiddenError = ErrorResponseDto;

export type GetLinksData = LinksDto[];

export type GetLinksError = ErrorResponseDto;

export type GetLinksViaPostData = LinksDto[];

export type GetLinksViaPostError = ErrorResponseDto;

export type GetClanActivityData = ClanActivityDto;

export type GetClanActivityError = ErrorResponseDto;

export type GetClanActivityViaPostData = ClanActivityDto;

export type GetClanActivityViaPostError = ErrorResponseDto;

export interface GetClanParams {
  clanTag: string;
}

export type GetClanData = ClanDto;

export type GetClanError = ErrorResponseDto;

export interface GetClanLastSeenParams {
  clanTag: string;
}

export type GetClanLastSeenData = LastSeenDto;

export type GetClanLastSeenError = ErrorResponseDto;

export interface GetClanCapitalContributionsParams {
  /**
   * @pattern ^\d{4}-\d{2}$
   * @example "2026-09"
   */
  season?: string;
  clanTag: string;
}

export type GetClanCapitalContributionsData = CapitalContributionDto;

export type GetClanCapitalContributionsError = ErrorResponseDto;

export interface GetClanCapitalRaidsParams {
  /**
   * @min 1
   * @max 60
   * @default 5
   */
  limit?: number;
  clanTag: string;
}

export type GetClanCapitalRaidsData = CapitalRaidsDto;

export type GetClanCapitalRaidsError = ErrorResponseDto;

export interface GetClanGamesParams {
  /**
   * `YYYY-MM`; defaults to the latest Clan Games (last month's until the 20th).
   * @pattern ^\d{4}-\d{2}$
   * @example "2026-10"
   */
  season?: string;
  clanTag: string;
}

export type GetClanGamesData = ClanGamesDto;

export type GetClanGamesError = ErrorResponseDto;

export interface GetClanLinksParams {
  clanTag: string;
}

export type GetClanLinksData = ClanLinksDto;

export type GetClanLinksError = ErrorResponseDto;

export interface GetPlayerParams {
  playerTag: string;
}

export type GetPlayerData = PlayerDto;

export type GetPlayerError = ErrorResponseDto;

export interface TrackLegendPlayerParams {
  playerTag: string;
}

export type TrackLegendPlayerData = ResultOkDto;

export type TrackLegendPlayerError = ErrorResponseDto;

export interface GetPlayerSeasonsParams {
  /**
   * @min 1
   * @max 12
   * @default 2
   */
  limit?: number;
  playerTag: string;
}

export type GetPlayerSeasonsData = PlayerSeasonStatsItemsDto;

export type GetPlayerSeasonsError = ErrorResponseDto;

export interface GetPlayerRankedWeeksParams {
  playerTag: string;
}

export type GetPlayerRankedWeeksData = RankedDto;

export type GetPlayerRankedWeeksError = ErrorResponseDto;

export interface GetPlayerBattleLogParams {
  playerTag: string;
}

export type GetPlayerBattleLogData = BattleLogItemsDto;

export type GetPlayerBattleLogError = ErrorResponseDto;

export interface GetPlayerDailyBattlesParams {
  playerTag: string;
}

export type GetPlayerDailyBattlesData = BattleLogAggregateItemsDto;

export type GetPlayerDailyBattlesError = ErrorResponseDto;

export type GetBattleLogLeaderboardData = BattleLogLeaderboardDto;

export type GetBattleLogLeaderboardError = ErrorResponseDto;

export type GetBattleLogLeaderboardViaPostData = BattleLogLeaderboardDto;

export type GetBattleLogLeaderboardViaPostError = ErrorResponseDto;

export interface GetPlayerClanHistoryParams {
  playerTag: string;
}

export type GetPlayerClanHistoryData = ClanHistoryItemsDto;

export type GetPlayerClanHistoryError = ErrorResponseDto;

export interface GetPlayerWarsParams {
  /**
   * The newest wars first, at most this many.
   * @min 1
   * @max 100
   * @default 50
   */
  limit?: number;
  /**
   * Date string or timestamp in milliseconds
   * @format date-time
   */
  startDate?: string;
  playerTag: string;
}

export type GetPlayerWarsData = AttackHistoryItemsDto;

export type GetPlayerWarsError = ErrorResponseDto;

export interface GetPlayerWarTotalsParams {
  /**
   * Date string or timestamp in milliseconds
   * @format date-time
   */
  startDate: string;
  playerTag: string;
}

export type GetPlayerWarTotalsData = AggregateAttackHistoryItemsDto;

export type GetPlayerWarTotalsError = ErrorResponseDto;

export interface GetPlayerClanWarLeagueTotalsParams {
  /**
   * Date string or timestamp in milliseconds
   * @format date-time
   */
  startDate: string;
  playerTag: string;
}

export type GetPlayerClanWarLeagueTotalsData = AggregateClanWarLeagueHistoryItemsDto;

export type GetPlayerClanWarLeagueTotalsError = ErrorResponseDto;

export type GetLegendRankingThresholdsData = LegendRankingThresholdsDto;

export type GetLegendRankingThresholdsError = ErrorResponseDto;

export type GetLegendAttacksData = LegendAttacksItemsDto;

export type GetLegendAttacksError = ErrorResponseDto;

export type GetLegendAttacksViaPostData = LegendAttacksItemsDto;

export type GetLegendAttacksViaPostError = ErrorResponseDto;

export interface GetPlayerLegendAttacksParams {
  /**
   * The league season's start date; the current season when left out.
   * @pattern ^\d{4}-\d{2}-\d{2}$
   * @example "2026-10-05"
   */
  seasonId?: string;
  playerTag: string;
}

export type GetPlayerLegendAttacksData = LegendAttacksDto;

export type GetPlayerLegendAttacksError = ErrorResponseDto;

export interface GetLegendDaysParams {
  /**
   * The league season's start date; the current season when left out.
   * @pattern ^\d{4}-\d{2}-\d{2}$
   * @example "2026-10-05"
   */
  seasonId?: string;
  playerTag: string;
}

export type GetLegendDaysData = LegendDaysDto;

export type GetLegendDaysError = ErrorResponseDto;

export interface GetLegendArmiesParams {
  /**
   * The league season's start date; the current season when left out.
   * @pattern ^\d{4}-\d{2}-\d{2}$
   * @example "2026-10-05"
   */
  seasonId?: string;
  playerTag: string;
}

export type GetLegendArmiesData = LegendArmiesDto;

export type GetLegendArmiesError = ErrorResponseDto;

export interface GetLegendSeasonsParams {
  playerTag: string;
}

export type GetLegendSeasonsData = LegendSeasonsDto;

export type GetLegendSeasonsError = ErrorResponseDto;

export interface EstimateLegendRankParams {
  playerTag: string;
}

export type EstimateLegendRankData = LegendRankDto;

export type EstimateLegendRankError = ErrorResponseDto;

export type GetRankingLocationsData = RankingLocationsDto;

export type GetRankingLocationsError = ErrorResponseDto;

export type GetRankingSeasonsData = RankingSeasonsDto;

export type GetRankingSeasonsError = ErrorResponseDto;

export type FindRankingsData = RankingStandingsDto;

export type FindRankingsError = ErrorResponseDto;

export interface GetClanRankingsParams {
  clanTag: string;
}

export type GetClanRankingsData = ClanRankingsDto;

export type GetClanRankingsError = ErrorResponseDto;

export interface GetPlayerRankingsParams {
  playerTag: string;
}

export type GetPlayerRankingsData = PlayerRankingsDto;

export type GetPlayerRankingsError = ErrorResponseDto;

export interface GetRankingBoardParams {
  /**
   * A saved league season (from `/rankings/seasons`); the live board when left out.
   * @pattern ^\d{4}-\d{2}(-\d{2})?$
   * @example "2026-09-07"
   */
  season?: string;
  /**
   * @pattern ^(global|[A-Z]{2})$
   * @example "IN"
   */
  countryCode: string;
  board: 'players' | 'clans' | 'capital' | 'builder-base-players' | 'builder-base-clans';
}

export type GetRankingBoardData = RankingBoardDto;

export type GetRankingBoardError = ErrorResponseDto;

export interface GetClanWarLeagueGroupParams {
  clanTag: string;
}

export type GetClanWarLeagueGroupData = ClanWarLeaguesDto;

export type GetClanWarLeagueGroupError = ErrorResponseDto;

export interface GetClanWarLeagueWarsParams {
  clanTag: string;
}

export type GetClanWarLeagueWarsData = ClanWarLeaguesDto;

export type GetClanWarLeagueWarsError = ErrorResponseDto;

export interface GetClanWarLeagueSeasonsParams {
  /**
   * @min 1
   * @max 12
   * @default 3
   */
  limit?: number;
  clanTag: string;
}

export type GetClanWarLeagueSeasonsData = ClanWarLeagueSeasonsDto;

export type GetClanWarLeagueSeasonsError = ErrorResponseDto;

export interface GetClanMemberWarStatsParams {
  /**
   * Regular and CWL wars, regular only, or CWL only; friendly wars never count.
   * @default "all"
   */
  type?: 'all' | 'regular' | 'cwl';
  /**
   * How many of the latest ended wars to count, for `all` and `regular`.
   * @min 1
   * @max 100
   * @default 25
   */
  wars?: number;
  /**
   * How many of the latest CWL seasons to count, for `cwl`.
   * @min 1
   * @max 12
   * @default 3
   */
  seasons?: number;
  clanTag: string;
}

export type GetClanMemberWarStatsData = ClanWarStatsDto;

export type GetClanMemberWarStatsError = ErrorResponseDto;

export interface GetClanWarLeagueStandingsParams {
  clanTag: string;
  groupId: number;
}

export type GetClanWarLeagueStandingsData = ClanWarLeagueStandingsDto;

export type GetClanWarLeagueStandingsError = ErrorResponseDto;

export interface ListClanWarsParams {
  /**
   * @min 1
   * @max 50
   * @default 20
   */
  limit?: number;
  /**
   * Date string or timestamp in milliseconds
   * @format date-time
   */
  before?: string;
  clanTag: string;
}

export type ListClanWarsData = ClanWarListDto;

export type ListClanWarsError = ErrorResponseDto;

export interface GetCurrentWarParams {
  clanTag: string;
}

export type GetCurrentWarData = CurrentWarDto;

export type GetCurrentWarError = ErrorResponseDto;

export interface GetClanWarParams {
  clanTag: string;
  warId: string;
}

export type GetClanWarData = ClanWarDto;

export type GetClanWarError = ErrorResponseDto;

export interface GetEventsParams {
  /**
   * Date string or timestamp in milliseconds
   * @format date-time
   */
  from: string;
  /**
   * Date string or timestamp in milliseconds
   * @format date-time
   */
  to: string;
}

export type GetEventsData = GameEventsDto;

export type GetEventsError = ErrorResponseDto;

export type GetUpcomingEventsData = UpcomingEventsDto;

export type GetUpcomingEventsError = ErrorResponseDto;

export interface ListRostersParams {
  guildId: string;
}

export type ListRostersData = GetRostersDto;

export type ListRostersError = ErrorResponseDto;

export interface CreateRosterParams {
  guildId: string;
}

export type CreateRosterData = RostersEntity;

export type CreateRosterError = ErrorResponseDto;

export interface CreateRosterGroupParams {
  guildId: string;
}

export type CreateRosterGroupData = GetRostersDto;

export type CreateRosterGroupError = ErrorResponseDto;

export interface UpdateRosterGroupParams {
  guildId: string;
  groupId: string;
}

export type UpdateRosterGroupData = GetRostersDto;

export type UpdateRosterGroupError = ErrorResponseDto;

export interface DeleteRosterGroupParams {
  guildId: string;
  groupId: string;
}

export type DeleteRosterGroupData = GetRostersDto;

export type DeleteRosterGroupError = ErrorResponseDto;

export interface GetRosterParams {
  rosterId: string;
  guildId: string;
}

export type GetRosterData = RostersEntity;

export type GetRosterError = ErrorResponseDto;

export interface UpdateRosterParams {
  guildId: string;
  rosterId: string;
}

export type UpdateRosterData = RostersEntity;

export type UpdateRosterError = ErrorResponseDto;

export interface DeleteRosterParams {
  guildId: string;
  rosterId: string;
}

export type DeleteRosterData = any;

export type DeleteRosterError = ErrorResponseDto;

export interface CloneRosterParams {
  guildId: string;
  rosterId: string;
}

export type CloneRosterData = RostersEntity;

export type CloneRosterError = ErrorResponseDto;

export interface CheckRosterMembersParams {
  guildId: string;
  rosterId: string;
}

export type CheckRosterMembersData = RosterPlayerCheckDto[];

export type CheckRosterMembersError = ErrorResponseDto;

export interface CheckRosterMembersViaPostParams {
  guildId: string;
  rosterId: string;
}

export type CheckRosterMembersViaPostData = RosterPlayerCheckDto[];

export type CheckRosterMembersViaPostError = ErrorResponseDto;

export interface AddRosterMembersParams {
  guildId: string;
  rosterId: string;
}

export type AddRosterMembersData = AddRosterMembersDto;

export type AddRosterMembersError = ErrorResponseDto;

export interface DeleteRosterMembersParams {
  rosterId: string;
  guildId: string;
}

export type DeleteRosterMembersData = RostersEntity;

export type DeleteRosterMembersError = ErrorResponseDto;

export interface RefreshRosterMembersParams {
  guildId: string;
  rosterId: string;
}

export type RefreshRosterMembersData = RostersEntity;

export type RefreshRosterMembersError = ErrorResponseDto;

export interface TransferRosterMembersParams {
  rosterId: string;
  guildId: string;
}

export type TransferRosterMembersData = TransferRosterMembersDto;

export type TransferRosterMembersError = ErrorResponseDto;

export type GetUserSettingsData = UserSettingsDto;

export type GetUserSettingsError = ErrorResponseDto;

export type GetWarTasksData = WarTasksDto;

export type GetWarTasksError = ErrorResponseDto;

export type GetCapitalRaidTasksData = CapitalRaidTasksDto;

export type GetCapitalRaidTasksError = ErrorResponseDto;

export type GetClanGamesTasksData = ClanGamesTasksDto;

export type GetClanGamesTasksError = ErrorResponseDto;

export type GetLegendTasksData = LegendTasksDto;

export type GetLegendTasksError = ErrorResponseDto;

export type GetRankedTasksData = RankedTasksDto;

export type GetRankedTasksError = ErrorResponseDto;

export type SetDefaultClanData = UserSettingsDto;

export type SetDefaultClanError = ErrorResponseDto;

export type ClearDefaultClanData = UserSettingsDto;

export type ClearDefaultClanError = ErrorResponseDto;

export type AddBookmarkData = UserSettingsDto;

export type AddBookmarkError = ErrorResponseDto;

export interface RemoveBookmarkParams {
  clanTag: string;
}

export type RemoveBookmarkData = UserSettingsDto;

export type RemoveBookmarkError = ErrorResponseDto;

export type SetTimezoneData = UserSettingsDto;

export type SetTimezoneError = ErrorResponseDto;

export type ClearTimezoneData = UserSettingsDto;

export type ClearTimezoneError = ErrorResponseDto;

export type GetGameExportsData = GameExportsDto;

export type GetGameExportsError = ErrorResponseDto;

export interface SaveGameExportParams {
  playerTag: string;
}

export type SaveGameExportData = GameExportDto;

export type SaveGameExportError = ErrorResponseDto;

export interface RemoveGameExportParams {
  playerTag: string;
}

export type RemoveGameExportData = ResultOkDto;

export type RemoveGameExportError = ErrorResponseDto;

export interface GetGuildClansParams {
  guildId: string;
}

export type GetGuildClansData = GuildClansDto;

export type GetGuildClansError = ErrorResponseDto;

export interface AddGuildClanParams {
  guildId: string;
}

export type AddGuildClanData = GuildClansDto;

export type AddGuildClanError = ErrorResponseDto;

export interface ReorderGuildClansParams {
  guildId: string;
}

export type ReorderGuildClansData = GuildClansDto;

export type ReorderGuildClansError = ErrorResponseDto;

export interface RemoveGuildClanParams {
  guildId: string;
  clanTag: string;
}

export type RemoveGuildClanData = GuildClansDto;

export type RemoveGuildClanError = ErrorResponseDto;

export interface UpdateGuildClanParams {
  guildId: string;
  clanTag: string;
}

export type UpdateGuildClanData = GuildClansDto;

export type UpdateGuildClanError = ErrorResponseDto;

export interface CreateClanCategoryParams {
  guildId: string;
}

export type CreateClanCategoryData = GuildClansDto;

export type CreateClanCategoryError = ErrorResponseDto;

export interface RenameClanCategoryParams {
  guildId: string;
  categoryId: string;
}

export type RenameClanCategoryData = GuildClansDto;

export type RenameClanCategoryError = ErrorResponseDto;

export interface DeleteClanCategoryParams {
  guildId: string;
  categoryId: string;
}

export type DeleteClanCategoryData = GuildClansDto;

export type DeleteClanCategoryError = ErrorResponseDto;

export interface ListChannelsParams {
  guildId: string;
}

export type ListChannelsData = GuildChannelDto[];

export type ListChannelsError = ErrorResponseDto;

export interface ListChannelCategoriesParams {
  guildId: string;
}

export type ListChannelCategoriesData = GuildCategoryDto[];

export type ListChannelCategoriesError = ErrorResponseDto;

export interface ListMentionableChannelsParams {
  guildId: string;
}

export type ListMentionableChannelsData = MentionChannelDto[];

export type ListMentionableChannelsError = ErrorResponseDto;

export interface ListRolesParams {
  guildId: string;
}

export type ListRolesData = GuildRoleDto[];

export type ListRolesError = ErrorResponseDto;

export interface ListEmojisParams {
  guildId: string;
}

export type ListEmojisData = GuildEmojisDto;

export type ListEmojisError = ErrorResponseDto;

export interface ListGuildClanLogsParams {
  guildId: string;
}

export type ListGuildClanLogsData = GuildClanLogDto[];

export type ListGuildClanLogsError = ErrorResponseDto;

export interface GetClanLogLimitParams {
  guildId: string;
}

export type GetClanLogLimitData = ClanLogLimitDto;

export type GetClanLogLimitError = ErrorResponseDto;

export interface GetClanEmbedParams {
  guildId: string;
  clanTag: string;
}

export type GetClanEmbedData = ClanEmbedStateDto;

export type GetClanEmbedError = ErrorResponseDto;

export interface SaveClanEmbedParams {
  guildId: string;
  clanTag: string;
}

export type SaveClanEmbedData = ClanEmbedDto;

export type SaveClanEmbedError = ErrorResponseDto;

export interface DeleteClanEmbedParams {
  guildId: string;
  clanTag: string;
}

export type DeleteClanEmbedData = any;

export type DeleteClanEmbedError = ErrorResponseDto;

export interface ListClanLogsParams {
  guildId: string;
  clanTag: string;
}

export type ListClanLogsData = ClanLogDto[];

export type ListClanLogsError = ErrorResponseDto;

export interface SaveClanLogParams {
  guildId: string;
  clanTag: string;
  logType: ClanLogType;
}

export type SaveClanLogData = ClanLogDto;

export type SaveClanLogError = ErrorResponseDto;

export interface DeleteClanLogParams {
  guildId: string;
  clanTag: string;
  logType: ClanLogType;
}

export type DeleteClanLogData = any;

export type DeleteClanLogError = ErrorResponseDto;

export interface GetAutoRolesParams {
  guildId: string;
}

export type GetAutoRolesData = AutoRolesDto;

export type GetAutoRolesError = ErrorResponseDto;

export interface UpdateAutoRolesParams {
  guildId: string;
}

export type UpdateAutoRolesData = AutoRolesDto;

export type UpdateAutoRolesError = ErrorResponseDto;

export interface SaveClanAutoRolesParams {
  guildId: string;
  clanTag: string;
}

export type SaveClanAutoRolesData = AutoRolesDto;

export type SaveClanAutoRolesError = ErrorResponseDto;

export interface ListFlagsParams {
  /** Only flags of this type */
  flagType?: FlagType;
  guildId: string;
}

export type ListFlagsData = FlagsDto;

export type ListFlagsError = ErrorResponseDto;

export interface CreateFlagsParams {
  guildId: string;
}

export type CreateFlagsData = FlagDto[];

export type CreateFlagsError = ErrorResponseDto;

export interface DeleteFlagParams {
  guildId: string;
  flagId: string;
}

export type DeleteFlagData = any;

export type DeleteFlagError = ErrorResponseDto;

export interface SearchMembersParams {
  query: string;
  guildId: string;
}

export type SearchMembersData = ListMemberDto[];

export type SearchMembersError = ErrorResponseDto;

export interface GetServerLogsParams {
  guildId: string;
}

export type GetServerLogsData = ServerLogsDto;

export type GetServerLogsError = ErrorResponseDto;

export interface SaveFlagAlertLogParams {
  guildId: string;
}

export type SaveFlagAlertLogData = ServerLogsDto;

export type SaveFlagAlertLogError = ErrorResponseDto;

export interface DeleteFlagAlertLogParams {
  guildId: string;
}

export type DeleteFlagAlertLogData = ServerLogsDto;

export type DeleteFlagAlertLogError = ErrorResponseDto;

export interface SaveRosterChangelogParams {
  guildId: string;
}

export type SaveRosterChangelogData = ServerLogsDto;

export type SaveRosterChangelogError = ErrorResponseDto;

export interface DeleteRosterChangelogParams {
  guildId: string;
}

export type DeleteRosterChangelogData = ServerLogsDto;

export type DeleteRosterChangelogError = ErrorResponseDto;

export interface SaveMaintenanceLogParams {
  guildId: string;
}

export type SaveMaintenanceLogData = ServerLogsDto;

export type SaveMaintenanceLogError = ErrorResponseDto;

export interface DeleteMaintenanceLogParams {
  guildId: string;
}

export type DeleteMaintenanceLogData = ServerLogsDto;

export type DeleteMaintenanceLogError = ErrorResponseDto;

export interface SaveWelcomeLogParams {
  guildId: string;
}

export type SaveWelcomeLogData = ServerLogsDto;

export type SaveWelcomeLogError = ErrorResponseDto;

export interface DeleteWelcomeLogParams {
  guildId: string;
}

export type DeleteWelcomeLogData = ServerLogsDto;

export type DeleteWelcomeLogError = ErrorResponseDto;

export interface GetButtonMessagesParams {
  guildId: string;
}

export type GetButtonMessagesData = ButtonsDto;

export type GetButtonMessagesError = ErrorResponseDto;

export interface UpdateButtonMessageParams {
  guildId: string;
  buttonType: ButtonType;
}

export type UpdateButtonMessageData = ButtonsDto;

export type UpdateButtonMessageError = ErrorResponseDto;

export interface GetManagerRolesParams {
  guildId: string;
}

export type GetManagerRolesData = ManagerRolesDto;

export type GetManagerRolesError = ErrorResponseDto;

export interface UpdateManagerRolesParams {
  guildId: string;
}

export type UpdateManagerRolesData = ManagerRolesDto;

export type UpdateManagerRolesError = ErrorResponseDto;

export interface GetGuildConfigParams {
  guildId: string;
}

export type GetGuildConfigData = ServerConfigDto;

export type GetGuildConfigError = ErrorResponseDto;

export interface UpdateGuildConfigParams {
  guildId: string;
}

export type UpdateGuildConfigData = ServerConfigDto;

export type UpdateGuildConfigError = ErrorResponseDto;

export interface GetGuildBetaStatusParams {
  guildId: string;
}

export type GetGuildBetaStatusData = GuildBetaDto;

export type GetGuildBetaStatusError = ErrorResponseDto;

export interface GetTicketSettingsParams {
  guildId: string;
}

export type GetTicketSettingsData = TicketsDto;

export type GetTicketSettingsError = ErrorResponseDto;

export interface ListTicketsParams {
  status?: TicketStatus;
  /** The `nextCursor` of the page before, for the tickets opened before it. */
  before?: string;
  guildId: string;
}

export type ListTicketsData = TicketListDto;

export type ListTicketsError = ErrorResponseDto;

export interface CloseTicketParams {
  guildId: string;
  ticketId: string;
}

export type CloseTicketData = any;

export type CloseTicketError = ErrorResponseDto;

export interface CreateTicketPanelParams {
  guildId: string;
}

export type CreateTicketPanelData = TicketsDto;

export type CreateTicketPanelError = ErrorResponseDto;

export interface UpdateTicketPanelParams {
  guildId: string;
  panelId: string;
}

export type UpdateTicketPanelData = TicketsDto;

export type UpdateTicketPanelError = ErrorResponseDto;

export interface DeleteTicketPanelParams {
  guildId: string;
  panelId: string;
}

export type DeleteTicketPanelData = TicketsDto;

export type DeleteTicketPanelError = ErrorResponseDto;

export interface AddTicketTypeParams {
  guildId: string;
  panelId: string;
}

export type AddTicketTypeData = TicketsDto;

export type AddTicketTypeError = ErrorResponseDto;

export interface ReorderTicketTypesParams {
  guildId: string;
  panelId: string;
}

export type ReorderTicketTypesData = TicketsDto;

export type ReorderTicketTypesError = ErrorResponseDto;

export interface UpdateTicketTypeParams {
  guildId: string;
  panelId: string;
  typeId: string;
}

export type UpdateTicketTypeData = TicketsDto;

export type UpdateTicketTypeError = ErrorResponseDto;

export interface DeleteTicketTypeParams {
  guildId: string;
  panelId: string;
  typeId: string;
}

export type DeleteTicketTypeData = TicketsDto;

export type DeleteTicketTypeError = ErrorResponseDto;

export interface ReplaceSavedRepliesParams {
  guildId: string;
}

export type ReplaceSavedRepliesData = TicketsDto;

export type ReplaceSavedRepliesError = ErrorResponseDto;

export interface ListRemindersParams {
  guildId: string;
}

export type ListRemindersData = GuildRemindersDto;

export type ListRemindersError = ErrorResponseDto;

export interface GetReminderPingsParams {
  guildId: string;
}

export type GetReminderPingsData = ReminderPingsDto;

export type GetReminderPingsError = ErrorResponseDto;

export interface SaveReminderPingsParams {
  guildId: string;
}

export type SaveReminderPingsData = ReminderPingsDto;

export type SaveReminderPingsError = ErrorResponseDto;

export interface CreateClanWarReminderParams {
  guildId: string;
}

export type CreateClanWarReminderData = ReminderIdDto;

export type CreateClanWarReminderError = ErrorResponseDto;

export interface UpdateClanWarReminderParams {
  guildId: string;
  reminderId: string;
}

export type UpdateClanWarReminderData = ReminderIdDto;

export type UpdateClanWarReminderError = ErrorResponseDto;

export interface DeleteClanWarReminderParams {
  guildId: string;
  reminderId: string;
}

export type DeleteClanWarReminderData = any;

export type DeleteClanWarReminderError = ErrorResponseDto;

export interface CreateCapitalRaidReminderParams {
  guildId: string;
}

export type CreateCapitalRaidReminderData = ReminderIdDto;

export type CreateCapitalRaidReminderError = ErrorResponseDto;

export interface UpdateCapitalRaidReminderParams {
  guildId: string;
  reminderId: string;
}

export type UpdateCapitalRaidReminderData = ReminderIdDto;

export type UpdateCapitalRaidReminderError = ErrorResponseDto;

export interface DeleteCapitalRaidReminderParams {
  guildId: string;
  reminderId: string;
}

export type DeleteCapitalRaidReminderData = any;

export type DeleteCapitalRaidReminderError = ErrorResponseDto;

export interface CreateClanGamesReminderParams {
  guildId: string;
}

export type CreateClanGamesReminderData = ReminderIdDto;

export type CreateClanGamesReminderError = ErrorResponseDto;

export interface UpdateClanGamesReminderParams {
  guildId: string;
  reminderId: string;
}

export type UpdateClanGamesReminderData = ReminderIdDto;

export type UpdateClanGamesReminderError = ErrorResponseDto;

export interface DeleteClanGamesReminderParams {
  guildId: string;
  reminderId: string;
}

export type DeleteClanGamesReminderData = any;

export type DeleteClanGamesReminderError = ErrorResponseDto;

export type ExportClanMembersData = ExportMembersOutputDto;

export type ExportClanMembersError = ErrorResponseDto;

export type ListBetaGuildsData = BetaGuildsDto;

export type ListBetaGuildsError = ErrorResponseDto;

export type AddBetaGuildsData = BetaGuildsDto;

export type AddBetaGuildsError = ErrorResponseDto;

export interface RemoveBetaGuildParams {
  guildId: string;
}

export type RemoveBetaGuildData = BetaGuildsDto;

export type RemoveBetaGuildError = ErrorResponseDto;

export type ListBetaGuildIdsData = BetaGuildIdsDto;

export type ListBetaGuildIdsError = ErrorResponseDto;

export type ListSubscribersData = SubscribersDto;

export type ListSubscribersError = ErrorResponseDto;

export type GrantSubscriptionData = SubscriberDto;

export type GrantSubscriptionError = ErrorResponseDto;

export interface UpdateSubscriptionParams {
  id: string;
}

export type UpdateSubscriptionData = SubscriberDto;

export type UpdateSubscriptionError = ErrorResponseDto;

export type ListDevelopersData = DevelopersDto;

export type ListDevelopersError = ErrorResponseDto;

export type AddDeveloperData = AddedDeveloperDto;

export type AddDeveloperError = ErrorResponseDto;

export interface UpdateDeveloperRolesParams {
  userId: string;
}

export type UpdateDeveloperRolesData = DeveloperDto;

export type UpdateDeveloperRolesError = ErrorResponseDto;

export interface RevokeDeveloperParams {
  userId: string;
}

export type RevokeDeveloperData = DevelopersDto;

export type RevokeDeveloperError = ErrorResponseDto;

export namespace Auth {
  /**
   * @description Returns an access token that works for 2 hours. After that, log in again to get a new one.<br/><br/>Send the token with every request in the `Authorization: Bearer <accessToken>` header.
   * @tags Auth
   * @name Login
   * @summary Exchange a passKey for an access token
   * @request POST:/auth/login
   * @response `201` `LoginData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = LoginData;
  }

  /**
   * No description
   * @tags Auth
   * @name GetAuthUser
   * @summary Get a user's roles and display name
   * @request GET:/auth/users/{userId}
   * @secure
   * @response `200` `GetAuthUserData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetAuthUser {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAuthUserData;
  }

  /**
   * @description The dashboard calls this to find out who is signing in from the bot. Tokens expire after an hour. The server is included only if the user can manage it.
   * @tags Auth
   * @name GetHandoffUser
   * @summary Read the Discord user behind a handoff token
   * @request GET:/auth/handoff/{token}
   * @secure
   * @response `200` `GetHandoffUserData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetHandoffUser {
    export type RequestParams = {
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetHandoffUserData;
  }

  /**
   * @description The bot calls this when a user opens the dashboard from Discord, so they arrive already signed in. The token expires after an hour.
   * @tags Auth
   * @name CreateHandoffToken
   * @summary Create a handoff token for the dashboard
   * @request POST:/auth/handoff
   * @secure
   * @response `201` `CreateHandoffTokenData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateHandoffToken {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = HandoffTokenInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateHandoffTokenData;
  }

  /**
   * @description Send a list of server IDs and get back the ones ClashPerk is in, with each server's name, icon and number of clans.
   * @tags Auth
   * @name GetBotGuilds
   * @summary Find which servers ClashPerk is in
   * @request QUERY:/auth/bot-guilds
   * @secure
   * @response `200` `GetBotGuildsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetBotGuilds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BotGuildsInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetBotGuildsData;
  }

  /**
   * @description Send a user and a list of server IDs to get back the servers where that user has the bot manager role. Discord permissions such as Manage Server aren't checked here.
   * @tags Auth
   * @name GetManagedGuilds
   * @summary Find servers where a user has the manager role
   * @request QUERY:/auth/managed-guilds
   * @secure
   * @response `200` `GetManagedGuildsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetManagedGuilds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ManagedGuildsInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetManagedGuildsData;
  }

  /**
   * @description Tells you whether a bot is in the server and whether the user is allowed to manage it. If you don't name a bot, a running custom bot is checked first, then ClashPerk.
   * @tags Auth
   * @name GetGuildAccess
   * @summary Check a user's access to a server
   * @request QUERY:/auth/guild-access
   * @secure
   * @response `200` `GetGuildAccessData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetGuildAccess {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GuildAccessInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetGuildAccessData;
  }
}

export namespace Links {
  /**
   * @description To link a player to someone else, you need to be a verified Leader or Co-Leader of the player's clan. If the player is already linked to another user, you also need the player's in-game API token.
   * @tags Links
   * @name CreateLink
   * @summary Link a player to a Discord user
   * @request POST:/links
   * @secure
   * @response `201` `CreateLinkData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateLinkInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = CreateLinkData;
  }

  /**
   * @description Only the owner can unlink a verified player. An unverified link can also be removed by the person who made it, or by a verified Leader or Co-Leader of the player's clan.
   * @tags Links
   * @name DeleteLink
   * @summary Unlink a player from its Discord user
   * @request DELETE:/links/{playerTag}
   * @secure
   * @response `200` `DeleteLinkData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteLink {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteLinkData;
  }

  /**
   * No description
   * @tags Links
   * @name SetDefaultLink
   * @summary Make one of your linked players your default
   * @request PUT:/links/{playerTag}/default
   * @secure
   * @response `200` `SetDefaultLinkData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SetDefaultLink {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SetDefaultLinkData;
  }

  /**
   * No description
   * @tags Links
   * @name SetLinkHidden
   * @summary Hide or show a linked player in your task lists
   * @request PUT:/links/{playerTag}/hidden
   * @secure
   * @response `200` `SetLinkHiddenData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SetLinkHidden {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = SetHiddenInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = SetLinkHiddenData;
  }

  /**
   * @description Send either `playerTags` or `userIds`, not both, with up to 100 values. Player tags must be exact, including the `#`.
   * @tags Links
   * @name GetLinks
   * @summary Get links by player tags or user IDs
   * @request QUERY:/links/query
   * @secure
   * @response `200` `GetLinksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLinks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetLinksInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetLinksData;
  }

  /**
   * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
   * @tags Links
   * @name GetLinksViaPost
   * @summary Get links by player tags or user IDs
   * @request POST:/links/query
   * @deprecated
   * @secure
   * @response `200` `GetLinksViaPostData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLinksViaPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetLinksInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetLinksViaPostData;
  }
}

export namespace Clans {
  /**
   * @description Shows Town Hall upgrades, members joining and leaving, and clan milestones, newest first.
   * @tags Clans
   * @name GetClanActivity
   * @summary List recent activity in clans
   * @request QUERY:/clans/activity
   * @secure
   * @response `200` `GetClanActivityData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanActivity {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClanActivityInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanActivityData;
  }

  /**
   * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
   * @tags Clans
   * @name GetClanActivityViaPost
   * @summary List recent activity in clans
   * @request POST:/clans/activity
   * @deprecated
   * @secure
   * @response `200` `GetClanActivityViaPostData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanActivityViaPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClanActivityInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanActivityViaPostData;
  }

  /**
   * No description
   * @tags Clans
   * @name GetClan
   * @summary Get a clan's profile
   * @request GET:/clans/{clanTag}
   * @secure
   * @response `200` `GetClanData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClan {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanData;
  }

  /**
   * @description Shows when each member was last active, and how active they've been over the last day and the last 30 days. Members ClashPerk hasn't seen yet are left out.
   * @tags Clans
   * @name GetClanLastSeen
   * @summary Get last-seen times for a clan's members
   * @request GET:/clans/{clanTag}/lastseen
   * @secure
   * @response `200` `GetClanLastSeenData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanLastSeen {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanLastSeenData;
  }

  /**
   * @description Pass a month such as `2026-10` to see that month. Without one, you get the last 10 days.
   * @tags Clans
   * @name GetClanCapitalContributions
   * @summary List a clan's Capital Gold contributions
   * @request GET:/clans/{clanTag}/capital-contribution
   * @secure
   * @response `200` `GetClanCapitalContributionsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanCapitalContributions {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {
      /**
       * @pattern ^\d{4}-\d{2}$
       * @example "2026-09"
       */
      season?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanCapitalContributionsData;
  }

  /**
   * No description
   * @tags Clans
   * @name GetClanCapitalRaids
   * @summary List a clan's Capital raid weekends
   * @request GET:/clans/{clanTag}/capital-raids
   * @secure
   * @response `200` `GetClanCapitalRaidsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanCapitalRaids {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {
      /**
       * @min 1
       * @max 60
       * @default 5
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanCapitalRaidsData;
  }

  /**
   * No description
   * @tags Clans
   * @name GetClanGames
   * @summary Get a clan's Clan Games points
   * @request GET:/clans/{clanTag}/clan-games
   * @secure
   * @response `200` `GetClanGamesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanGames {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {
      /**
       * `YYYY-MM`; defaults to the latest Clan Games (last month's until the 20th).
       * @pattern ^\d{4}-\d{2}$
       * @example "2026-10"
       */
      season?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanGamesData;
  }

  /**
   * @description Also tells you which of these links you're allowed to remove.
   * @tags Clans
   * @name GetClanLinks
   * @summary List a clan's members with their Discord links
   * @request GET:/clans/{clanTag}/links
   * @secure
   * @response `200` `GetClanLinksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanLinks {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanLinksData;
  }
}

export namespace Players {
  /**
   * No description
   * @tags Players
   * @name GetPlayer
   * @summary Get a player's profile
   * @request GET:/players/{playerTag}
   * @secure
   * @response `200` `GetPlayerData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayer {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerData;
  }

  /**
   * @description If the player was banned from tracking, the ban is lifted.
   * @tags Players
   * @name TrackLegendPlayer
   * @summary Add a player to Legend League tracking
   * @request PUT:/players/{playerTag}
   * @secure
   * @response `200` `TrackLegendPlayerData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace TrackLegendPlayer {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TrackLegendPlayerData;
  }

  /**
   * No description
   * @tags Players
   * @name GetPlayerSeasons
   * @summary Get a player's season stats
   * @request GET:/players/{playerTag}/seasons
   * @secure
   * @response `200` `GetPlayerSeasonsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerSeasons {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * @min 1
       * @max 12
       * @default 2
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerSeasonsData;
  }

  /**
   * @description If the player isn't in a league group right now, there's no current week in the response.
   * @tags Players
   * @name GetPlayerRankedWeeks
   * @summary Get a player's ranked league weeks
   * @request GET:/players/{playerTag}/ranked
   * @secure
   * @response `200` `GetPlayerRankedWeeksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerRankedWeeks {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerRankedWeeksData;
  }

  /**
   * @description Only battles ClashPerk has tracked, up to 448.
   * @tags Players
   * @name GetPlayerBattleLog
   * @summary Get a player's battle log
   * @request GET:/players/{playerTag}/battle-log
   * @secure
   * @response `200` `GetPlayerBattleLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerBattleLog {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerBattleLogData;
  }

  /**
   * @description Trophies, attacks and defenses for each battle day, oldest first.
   * @tags Players
   * @name GetPlayerDailyBattles
   * @summary Get a player's daily battle totals
   * @request GET:/players/{playerTag}/battle-log/aggregate
   * @secure
   * @response `200` `GetPlayerDailyBattlesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerDailyBattles {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerDailyBattlesData;
  }

  /**
   * No description
   * @tags Players
   * @name GetBattleLogLeaderboard
   * @summary Rank players by Legend League trophies
   * @request QUERY:/players/battle-log/leaderboard
   * @secure
   * @response `200` `GetBattleLogLeaderboardData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetBattleLogLeaderboard {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BattleLogLeaderboardInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetBattleLogLeaderboardData;
  }

  /**
   * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
   * @tags Players
   * @name GetBattleLogLeaderboardViaPost
   * @summary Rank players by Legend League trophies
   * @request POST:/players/battle-log/leaderboard
   * @deprecated
   * @secure
   * @response `201` `GetBattleLogLeaderboardViaPostData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetBattleLogLeaderboardViaPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BattleLogLeaderboardInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetBattleLogLeaderboardViaPostData;
  }

  /**
   * @description Newest first. For the clan the player is in now, the last-seen time is the current time.
   * @tags Players
   * @name GetPlayerClanHistory
   * @summary Get a player's clan history
   * @request GET:/players/{playerTag}/history
   * @secure
   * @response `200` `GetPlayerClanHistoryData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerClanHistory {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerClanHistoryData;
  }

  /**
   * No description
   * @tags Players
   * @name GetPlayerWars
   * @summary List a player's wars and attacks
   * @request GET:/players/{playerTag}/wars
   * @secure
   * @response `200` `GetPlayerWarsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerWars {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * The newest wars first, at most this many.
       * @min 1
       * @max 100
       * @default 50
       */
      limit?: number;
      /**
       * Date string or timestamp in milliseconds
       * @format date-time
       */
      startDate?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerWarsData;
  }

  /**
   * @description Only counts wars that started on or after `startDate`.
   * @tags Players
   * @name GetPlayerWarTotals
   * @summary Get a player's war totals per season
   * @request GET:/players/{playerTag}/wars/aggregate
   * @secure
   * @response `200` `GetPlayerWarTotalsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerWarTotals {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * Date string or timestamp in milliseconds
       * @format date-time
       */
      startDate: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerWarTotalsData;
  }

  /**
   * @description Only counts rounds that started on or after `startDate`, newest group first. An attack counts as missed once its round ends.
   * @tags Players
   * @name GetPlayerClanWarLeagueTotals
   * @summary Get a player's CWL totals per league group
   * @request GET:/players/{playerTag}/clan-war-leagues/aggregate
   * @secure
   * @response `200` `GetPlayerClanWarLeagueTotalsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerClanWarLeagueTotals {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * Date string or timestamp in milliseconds
       * @format date-time
       */
      startDate: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerClanWarLeagueTotalsData;
  }
}

export namespace Legends {
  /**
   * @description Shows how many trophies it takes to reach certain ranks among the players ClashPerk tracks. Includes live numbers, the latest daily snapshot and up to 45 days of history.
   * @tags Legends
   * @name GetLegendRankingThresholds
   * @summary Get Legend League rank thresholds
   * @request GET:/legends/ranking-thresholds
   * @secure
   * @response `200` `GetLegendRankingThresholdsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendRankingThresholds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendRankingThresholdsData;
  }

  /**
   * @description Only covers the current season. Players with no attacks logged are left out.
   * @tags Legends
   * @name GetLegendAttacks
   * @summary Get legend attack logs for players
   * @request QUERY:/legends/attacks/query
   * @secure
   * @response `200` `GetLegendAttacksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendAttacks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetLegendAttacksInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendAttacksData;
  }

  /**
   * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
   * @tags Legends
   * @name GetLegendAttacksViaPost
   * @summary Get legend attack logs for players
   * @request POST:/legends/attacks/query
   * @deprecated
   * @secure
   * @response `200` `GetLegendAttacksViaPostData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendAttacksViaPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetLegendAttacksInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendAttacksViaPostData;
  }

  /**
   * @description Returns 404 if the player has no attacks logged in that season.
   * @tags Legends
   * @name GetPlayerLegendAttacks
   * @summary Get a player's legend attack log
   * @request GET:/legends/{playerTag}/attacks
   * @secure
   * @response `200` `GetPlayerLegendAttacksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerLegendAttacks {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * The league season's start date; the current season when left out.
       * @pattern ^\d{4}-\d{2}-\d{2}$
       * @example "2026-10-05"
       */
      seasonId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerLegendAttacksData;
  }

  /**
   * @description Shows each day's starting and ending trophies, the Monday reset and every battle.
   * @tags Legends
   * @name GetLegendDays
   * @summary Get a player's legend days in a season
   * @request GET:/legends/{playerTag}/days
   * @secure
   * @response `200` `GetLegendDaysData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendDays {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * The league season's start date; the current season when left out.
       * @pattern ^\d{4}-\d{2}-\d{2}$
       * @example "2026-10-05"
       */
      seasonId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendDaysData;
  }

  /**
   * @description Each hero with the pet and equipment used most, and the army used most, from the season's legend attacks.
   * @tags Legends
   * @name GetLegendArmies
   * @summary Get a player's most used legend armies
   * @request GET:/legends/{playerTag}/armies
   * @secure
   * @response `200` `GetLegendArmiesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendArmies {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {
      /**
       * The league season's start date; the current season when left out.
       * @pattern ^\d{4}-\d{2}-\d{2}$
       * @example "2026-10-05"
       */
      seasonId?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendArmiesData;
  }

  /**
   * No description
   * @tags Legends
   * @name GetLegendSeasons
   * @summary Get a player's recent legend seasons
   * @request GET:/legends/{playerTag}/seasons
   * @secure
   * @response `200` `GetLegendSeasonsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendSeasons {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendSeasonsData;
  }

  /**
   * @description The rank is worked out from the players ClashPerk tracks this season, so it may differ from the game. Returns 404 if the player isn't tracked.
   * @tags Legends
   * @name EstimateLegendRank
   * @summary Estimate a player's legend rank
   * @request GET:/legends/{playerTag}/estimate-rank
   * @secure
   * @response `200` `EstimateLegendRankData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace EstimateLegendRank {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = EstimateLegendRankData;
  }
}

export namespace Rankings {
  /**
   * No description
   * @tags Rankings
   * @name GetRankingLocations
   * @summary List ranking locations
   * @request GET:/rankings/locations
   * @secure
   * @response `200` `GetRankingLocationsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetRankingLocations {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRankingLocationsData;
  }

  /**
   * No description
   * @tags Rankings
   * @name GetRankingSeasons
   * @summary List saved ranking seasons
   * @request GET:/rankings/seasons
   * @secure
   * @response `200` `GetRankingSeasonsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetRankingSeasons {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRankingSeasonsData;
  }

  /**
   * @description Looks through every saved board, in every country and worldwide.
   * @tags Rankings
   * @name FindRankings
   * @summary Find where players and clans rank this season
   * @request QUERY:/rankings/standings
   * @secure
   * @response `200` `FindRankingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace FindRankings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RankingStandingsInputDto;
    export type RequestHeaders = {};
    export type ResponseBody = FindRankingsData;
  }

  /**
   * @description Shows where the clan sits on the clan and capital boards in its country and worldwide, and its country rank over the last 6 saved seasons.
   * @tags Rankings
   * @name GetClanRankings
   * @summary Get a clan's rankings and rank history
   * @request GET:/rankings/clans/{clanTag}
   * @secure
   * @response `200` `GetClanRankingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanRankings {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanRankingsData;
  }

  /**
   * @description Only seasons where the player made a board, newest first. The current season isn't included.
   * @tags Rankings
   * @name GetPlayerRankings
   * @summary List a player's past season-end ranks
   * @request GET:/rankings/players/{playerTag}
   * @secure
   * @response `200` `GetPlayerRankingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetPlayerRankings {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPlayerRankingsData;
  }

  /**
   * @description Shows the live board, or pass `season` to see a saved one. Builder base boards are only available live.
   * @tags Rankings
   * @name GetRankingBoard
   * @summary Get a ranking board
   * @request GET:/rankings/{countryCode}/{board}
   * @secure
   * @response `200` `GetRankingBoardData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetRankingBoard {
    export type RequestParams = {
      /**
       * @pattern ^(global|[A-Z]{2})$
       * @example "IN"
       */
      countryCode: string;
      board: 'players' | 'clans' | 'capital' | 'builder-base-players' | 'builder-base-clans';
    };
    export type RequestQuery = {
      /**
       * A saved league season (from `/rankings/seasons`); the live board when left out.
       * @pattern ^\d{4}-\d{2}(-\d{2})?$
       * @example "2026-09-07"
       */
      season?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRankingBoardData;
  }
}

export namespace Wars {
  /**
   * @description Comes straight from the game and includes every war in the group. Returns 404 if the clan isn't in CWL.
   * @tags Wars
   * @name GetClanWarLeagueGroup
   * @summary Get a clan's current CWL group
   * @request GET:/wars/{clanTag}/clan-war-leagues/groups
   * @secure
   * @response `200` `GetClanWarLeagueGroupData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanWarLeagueGroup {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanWarLeagueGroupData;
  }

  /**
   * @description Uses the clan's most recent saved CWL group and returns only the clan's own wars.
   * @tags Wars
   * @name GetClanWarLeagueWars
   * @summary Get a clan's wars in its latest CWL group
   * @request GET:/wars/{clanTag}/clan-war-leagues/clan
   * @secure
   * @response `200` `GetClanWarLeagueWarsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanWarLeagueWars {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanWarLeagueWarsData;
  }

  /**
   * @description Built from the wars ClashPerk tracked, newest first. Use the standings endpoint to see a group's table.
   * @tags Wars
   * @name GetClanWarLeagueSeasons
   * @summary List a clan's CWL seasons with member totals
   * @request GET:/wars/{clanTag}/clan-war-leagues/seasons
   * @secure
   * @response `200` `GetClanWarLeagueSeasonsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanWarLeagueSeasons {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {
      /**
       * @min 1
       * @max 12
       * @default 3
       */
      limit?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanWarLeagueSeasonsData;
  }

  /**
   * No description
   * @tags Wars
   * @name GetClanMemberWarStats
   * @summary Get war stats for a clan's members
   * @request GET:/wars/{clanTag}/members/stats
   * @secure
   * @response `200` `GetClanMemberWarStatsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanMemberWarStats {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {
      /**
       * Regular and CWL wars, regular only, or CWL only; friendly wars never count.
       * @default "all"
       */
      type?: 'all' | 'regular' | 'cwl';
      /**
       * How many of the latest ended wars to count, for `all` and `regular`.
       * @min 1
       * @max 100
       * @default 25
       */
      wars?: number;
      /**
       * How many of the latest CWL seasons to count, for `cwl`.
       * @min 1
       * @max 12
       * @default 3
       */
      seasons?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanMemberWarStatsData;
  }

  /**
   * @description Get the `groupId` from the CWL seasons endpoint. Each war win adds 10 bonus stars, as in the game.
   * @tags Wars
   * @name GetClanWarLeagueStandings
   * @summary Get a CWL group's standings
   * @request GET:/wars/{clanTag}/clan-war-leagues/groups/{groupId}/standings
   * @secure
   * @response `200` `GetClanWarLeagueStandingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanWarLeagueStandings {
    export type RequestParams = {
      clanTag: string;
      groupId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanWarLeagueStandingsData;
  }

  /**
   * No description
   * @tags Wars
   * @name ListClanWars
   * @summary List a clan's tracked wars
   * @request GET:/wars/{clanTag}
   * @secure
   * @response `200` `ListClanWarsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListClanWars {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {
      /**
       * @min 1
       * @max 50
       * @default 20
       */
      limit?: number;
      /**
       * Date string or timestamp in milliseconds
       * @format date-time
       */
      before?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListClanWarsData;
  }

  /**
   * @description During CWL, this is the clan's current round. The war is empty if the clan isn't in one, or if its war log is private outside CWL.
   * @tags Wars
   * @name GetCurrentWar
   * @summary Get a clan's current war
   * @request GET:/wars/{clanTag}/current
   * @secure
   * @response `200` `GetCurrentWarData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetCurrentWar {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCurrentWarData;
  }

  /**
   * @description Use a war ID from the clan's war list.
   * @tags Wars
   * @name GetClanWar
   * @summary Get a tracked war
   * @request GET:/wars/{clanTag}/{warId}
   * @secure
   * @response `200` `GetClanWarData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanWar {
    export type RequestParams = {
      clanTag: string;
      warId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanWarData;
  }
}

export namespace Events {
  /**
   * No description
   * @tags Events
   * @name GetEvents
   * @summary List game events in a date range
   * @request GET:/events
   * @secure
   * @response `200` `GetEventsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetEvents {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Date string or timestamp in milliseconds
       * @format date-time
       */
      from: string;
      /**
       * Date string or timestamp in milliseconds
       * @format date-time
       */
      to: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetEventsData;
  }

  /**
   * No description
   * @tags Events
   * @name GetUpcomingEvents
   * @summary List current and next game events
   * @request GET:/events/upcoming
   * @secure
   * @response `200` `GetUpcomingEventsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetUpcomingEvents {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUpcomingEventsData;
  }
}

export namespace Rosters {
  /**
   * @description API tokens with the `fetch:rosters` role can use this too.
   * @tags Rosters
   * @name ListRosters
   * @summary List the server's rosters and groups
   * @request GET:/rosters/{guildId}/list
   * @secure
   * @response `200` `ListRostersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListRosters {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListRostersData;
  }

  /**
   * @description Its settings are saved as the server's defaults for the next roster. Set `importMembers` with a clan to sign up the clan's members right away.
   * @tags Rosters
   * @name CreateRoster
   * @summary Create a roster
   * @request POST:/rosters/{guildId}/create
   * @secure
   * @response `201` `CreateRosterData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateRoster {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RosterInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateRosterData;
  }

  /**
   * No description
   * @tags Rosters
   * @name CreateRosterGroup
   * @summary Create a roster group
   * @request POST:/rosters/{guildId}/groups
   * @secure
   * @response `201` `CreateRosterGroupData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateRosterGroup {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RosterGroupInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateRosterGroupData;
  }

  /**
   * @description You only need to send the fields you want to change.
   * @tags Rosters
   * @name UpdateRosterGroup
   * @summary Update a roster group
   * @request PATCH:/rosters/{guildId}/groups/{groupId}
   * @secure
   * @response `200` `UpdateRosterGroupData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateRosterGroup {
    export type RequestParams = {
      guildId: string;
      groupId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RosterGroupUpdateInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateRosterGroupData;
  }

  /**
   * @description Its members stay on the roster without a group.
   * @tags Rosters
   * @name DeleteRosterGroup
   * @summary Delete a roster group
   * @request DELETE:/rosters/{guildId}/groups/{groupId}
   * @secure
   * @response `200` `DeleteRosterGroupData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteRosterGroup {
    export type RequestParams = {
      guildId: string;
      groupId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteRosterGroupData;
  }

  /**
   * No description
   * @tags Rosters
   * @name GetRoster
   * @summary Get a roster
   * @request GET:/rosters/{guildId}/{rosterId}
   * @secure
   * @response `200` `GetRosterData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetRoster {
    export type RequestParams = {
      rosterId: string;
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRosterData;
  }

  /**
   * @description You only need to send the fields you want to change. The roster's settings are saved as the server's defaults for the next roster.
   * @tags Rosters
   * @name UpdateRoster
   * @summary Update a roster
   * @request PATCH:/rosters/{guildId}/{rosterId}
   * @secure
   * @response `200` `UpdateRosterData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateRoster {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RosterUpdateInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateRosterData;
  }

  /**
   * @description Members keep their roster and group roles until the bot next refreshes roles.
   * @tags Rosters
   * @name DeleteRoster
   * @summary Delete a roster
   * @request DELETE:/rosters/{guildId}/{rosterId}
   * @secure
   * @response `204` `DeleteRosterData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteRoster {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteRosterData;
  }

  /**
   * @description Copies most settings, except the role, image and color. Members are copied over only if they still pass the sign-up checks.
   * @tags Rosters
   * @name CloneRoster
   * @summary Clone a roster
   * @request POST:/rosters/{guildId}/{rosterId}/clone
   * @secure
   * @response `201` `CloneRosterData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CloneRoster {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CloneRosterInput;
    export type RequestHeaders = {};
    export type ResponseBody = CloneRosterData;
  }

  /**
   * @description Runs the sign-up checks for up to 100 players without adding anyone.
   * @tags Rosters
   * @name CheckRosterMembers
   * @summary Check which players can join a roster
   * @request QUERY:/rosters/{guildId}/{rosterId}/members/check
   * @secure
   * @response `200` `CheckRosterMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CheckRosterMembers {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RosterTagsInput;
    export type RequestHeaders = {};
    export type ResponseBody = CheckRosterMembersData;
  }

  /**
   * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
   * @tags Rosters
   * @name CheckRosterMembersViaPost
   * @summary Check which players can join a roster
   * @request POST:/rosters/{guildId}/{rosterId}/members/check
   * @deprecated
   * @secure
   * @response `200` `CheckRosterMembersViaPostData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CheckRosterMembersViaPost {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RosterTagsInput;
    export type RequestHeaders = {};
    export type ResponseBody = CheckRosterMembersViaPostData;
  }

  /**
   * @description Players who fail a sign-up check are skipped, and the response says why for each one.
   * @tags Rosters
   * @name AddRosterMembers
   * @summary Add players to a roster
   * @request PUT:/rosters/{guildId}/{rosterId}/members
   * @secure
   * @response `200` `AddRosterMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace AddRosterMembers {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AddRosterMembersInput;
    export type RequestHeaders = {};
    export type ResponseBody = AddRosterMembersData;
  }

  /**
   * No description
   * @tags Rosters
   * @name DeleteRosterMembers
   * @summary Remove players from a roster
   * @request DELETE:/rosters/{guildId}/{rosterId}/members
   * @secure
   * @response `200` `DeleteRosterMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteRosterMembers {
    export type RequestParams = {
      rosterId: string;
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RemoveMembersBulkInput;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteRosterMembersData;
  }

  /**
   * @description Updates each member's game data and Discord link, and the roster's clan details.
   * @tags Rosters
   * @name RefreshRosterMembers
   * @summary Refresh a roster's members from the game
   * @request POST:/rosters/{guildId}/{rosterId}/members/refresh
   * @secure
   * @response `201` `RefreshRosterMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RefreshRosterMembers {
    export type RequestParams = {
      guildId: string;
      rosterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RefreshRosterMembersData;
  }

  /**
   * @description To move players to another group on the same roster, send only `newGroupId`. Players who fail the other roster's sign-up checks stay where they are.
   * @tags Rosters
   * @name TransferRosterMembers
   * @summary Move players to another roster or group
   * @request PUT:/rosters/{guildId}/{rosterId}/members/transfer
   * @secure
   * @response `200` `TransferRosterMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace TransferRosterMembers {
    export type RequestParams = {
      rosterId: string;
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TransferRosterMembersInput;
    export type RequestHeaders = {};
    export type ResponseBody = TransferRosterMembersData;
  }
}

export namespace Users {
  /**
   * No description
   * @tags Users
   * @name GetUserSettings
   * @summary Get your default clan, bookmarks and timezone
   * @request GET:/users/me
   * @secure
   * @response `200` `GetUserSettingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetUserSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserSettingsData;
  }

  /**
   * @description Covers your linked accounts that you haven't hidden. CWL rounds still show even if the account has left the clan.
   * @tags Users
   * @name GetWarTasks
   * @summary List your accounts' current wars
   * @request GET:/users/me/tasks/wars
   * @secure
   * @response `200` `GetWarTasksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetWarTasks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetWarTasksData;
  }

  /**
   * @description Empty outside raid weekends.
   * @tags Users
   * @name GetCapitalRaidTasks
   * @summary List your accounts' capital raid attacks
   * @request GET:/users/me/tasks/capital-raids
   * @secure
   * @response `200` `GetCapitalRaidTasksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetCapitalRaidTasks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCapitalRaidTasksData;
  }

  /**
   * @description Empty outside Clan Games.
   * @tags Users
   * @name GetClanGamesTasks
   * @summary List your accounts' Clan Games points
   * @request GET:/users/me/tasks/clan-games
   * @secure
   * @response `200` `GetClanGamesTasksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanGamesTasks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanGamesTasksData;
  }

  /**
   * No description
   * @tags Users
   * @name GetLegendTasks
   * @summary List your accounts' Legend League attacks today
   * @request GET:/users/me/tasks/legends
   * @secure
   * @response `200` `GetLegendTasksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetLegendTasks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetLegendTasksData;
  }

  /**
   * No description
   * @tags Users
   * @name GetRankedTasks
   * @summary List your accounts' ranked attacks this week
   * @request GET:/users/me/tasks/ranked
   * @secure
   * @response `200` `GetRankedTasksData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetRankedTasks {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRankedTasksData;
  }

  /**
   * No description
   * @tags Users
   * @name SetDefaultClan
   * @summary Set your default clan
   * @request PUT:/users/me/clan
   * @secure
   * @response `200` `SetDefaultClanData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SetDefaultClan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClanTagInput;
    export type RequestHeaders = {};
    export type ResponseBody = SetDefaultClanData;
  }

  /**
   * No description
   * @tags Users
   * @name ClearDefaultClan
   * @summary Clear your default clan
   * @request DELETE:/users/me/clan
   * @secure
   * @response `200` `ClearDefaultClanData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ClearDefaultClan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ClearDefaultClanData;
  }

  /**
   * @description You can bookmark up to 50 clans. Bookmarking a clan again updates its saved name.
   * @tags Users
   * @name AddBookmark
   * @summary Bookmark a clan
   * @request POST:/users/me/bookmarks
   * @secure
   * @response `201` `AddBookmarkData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace AddBookmark {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ClanTagInput;
    export type RequestHeaders = {};
    export type ResponseBody = AddBookmarkData;
  }

  /**
   * No description
   * @tags Users
   * @name RemoveBookmark
   * @summary Remove a clan bookmark
   * @request DELETE:/users/me/bookmarks/{clanTag}
   * @secure
   * @response `200` `RemoveBookmarkData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RemoveBookmark {
    export type RequestParams = {
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveBookmarkData;
  }

  /**
   * No description
   * @tags Users
   * @name SetTimezone
   * @summary Set your timezone
   * @request PUT:/users/me/timezone
   * @secure
   * @response `200` `SetTimezoneData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SetTimezone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TimezoneInput;
    export type RequestHeaders = {};
    export type ResponseBody = SetTimezoneData;
  }

  /**
   * No description
   * @tags Users
   * @name ClearTimezone
   * @summary Clear your timezone
   * @request DELETE:/users/me/timezone
   * @secure
   * @response `200` `ClearTimezoneData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ClearTimezone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ClearTimezoneData;
  }

  /**
   * @description Only the exports you saved, even if someone else has linked the same account.
   * @tags Users
   * @name GetGameExports
   * @summary List your saved game data exports
   * @request GET:/users/me/game-exports
   * @secure
   * @response `200` `GetGameExportsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetGameExports {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetGameExportsData;
  }

  /**
   * @description The account must be linked to you, and the export must be for the same player tag.
   * @tags Users
   * @name SaveGameExport
   * @summary Save a game data export for an account
   * @request PUT:/users/me/game-exports/{playerTag}
   * @secure
   * @response `200` `SaveGameExportData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveGameExport {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = GameExportInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveGameExportData;
  }

  /**
   * No description
   * @tags Users
   * @name RemoveGameExport
   * @summary Delete a saved game data export
   * @request DELETE:/users/me/game-exports/{playerTag}
   * @secure
   * @response `200` `RemoveGameExportData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RemoveGameExport {
    export type RequestParams = {
      playerTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveGameExportData;
  }
}

export namespace Guilds {
  /**
   * No description
   * @tags Guilds
   * @name GetGuildClans
   * @summary List the server's clans by category
   * @request GET:/guilds/{guildId}/clans
   * @secure
   * @response `200` `GetGuildClansData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetGuildClans {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetGuildClansData;
  }

  /**
   * @description Servers can add 5, 20 or 100 clans depending on their member count. Going past that, or adding a clan that's already in more than 10 other servers, needs proof that you lead the clan. Supporter servers skip this check.
   * @tags Guilds
   * @name AddGuildClan
   * @summary Add a clan to the server
   * @request POST:/guilds/{guildId}/clans
   * @secure
   * @response `201` `AddGuildClanData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace AddGuildClan {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AddGuildClanInput;
    export type RequestHeaders = {};
    export type ResponseBody = AddGuildClanData;
  }

  /**
   * @description Send every category with its clans, in the order you want. Clans you put under `uncategorized` are taken out of their category.
   * @tags Guilds
   * @name ReorderGuildClans
   * @summary Reorder the server's clans and categories
   * @request PATCH:/guilds/{guildId}/clans/reorder
   * @secure
   * @response `200` `ReorderGuildClansData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ReorderGuildClans {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReorderClanCategoriesInput;
    export type RequestHeaders = {};
    export type ResponseBody = ReorderGuildClansData;
  }

  /**
   * @description This also deletes the clan's logs and removes it from reminders. Any reminder left with no clans is deleted.
   * @tags Guilds
   * @name RemoveGuildClan
   * @summary Remove a clan from the server
   * @request DELETE:/guilds/{guildId}/clans/{clanTag}
   * @secure
   * @response `200` `RemoveGuildClanData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RemoveGuildClan {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveGuildClanData;
  }

  /**
   * @description You only need to send the fields you want to change. Each alias must be unique in the server, and a channel can only belong to one clan.
   * @tags Guilds
   * @name UpdateGuildClan
   * @summary Update a clan's alias, short name and channels
   * @request PATCH:/guilds/{guildId}/clans/{clanTag}
   * @secure
   * @response `200` `UpdateGuildClanData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateGuildClan {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanSettingsInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateGuildClanData;
  }

  /**
   * No description
   * @tags Guilds
   * @name CreateClanCategory
   * @summary Create a clan category
   * @request POST:/guilds/{guildId}/categories
   * @secure
   * @response `201` `CreateClanCategoryData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateClanCategory {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanCategoryInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateClanCategoryData;
  }

  /**
   * No description
   * @tags Guilds
   * @name RenameClanCategory
   * @summary Rename a clan category
   * @request PATCH:/guilds/{guildId}/categories/{categoryId}
   * @secure
   * @response `200` `RenameClanCategoryData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RenameClanCategory {
    export type RequestParams = {
      guildId: string;
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanCategoryInput;
    export type RequestHeaders = {};
    export type ResponseBody = RenameClanCategoryData;
  }

  /**
   * @description Its clans aren't removed. They move to Uncategorized.
   * @tags Guilds
   * @name DeleteClanCategory
   * @summary Delete a clan category
   * @request DELETE:/guilds/{guildId}/categories/{categoryId}
   * @secure
   * @response `200` `DeleteClanCategoryData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteClanCategory {
    export type RequestParams = {
      guildId: string;
      categoryId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteClanCategoryData;
  }

  /**
   * @description A channel the bot can't post in still shows up if it has threads the bot can use, but the channel itself can't be picked.
   * @tags Guilds
   * @name ListChannels
   * @summary List channels and threads the bot can post in
   * @request GET:/guilds/{guildId}/channels
   * @secure
   * @response `200` `ListChannelsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListChannels {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListChannelsData;
  }

  /**
   * No description
   * @tags Guilds
   * @name ListChannelCategories
   * @summary List the server's channel categories
   * @request GET:/guilds/{guildId}/channel-categories
   * @secure
   * @response `200` `ListChannelCategoriesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListChannelCategories {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListChannelCategoriesData;
  }

  /**
   * No description
   * @tags Guilds
   * @name ListMentionableChannels
   * @summary List channels a message can mention
   * @request GET:/guilds/{guildId}/channels/mentionable
   * @secure
   * @response `200` `ListMentionableChannelsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListMentionableChannels {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListMentionableChannelsData;
  }

  /**
   * @description Sorted from highest to lowest. @everyone and roles owned by bots or integrations are left out.
   * @tags Guilds
   * @name ListRoles
   * @summary List the server's roles
   * @request GET:/guilds/{guildId}/roles
   * @secure
   * @response `200` `ListRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListRoles {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListRolesData;
  }

  /**
   * @description Includes the server's own emojis and the bot's emojis.
   * @tags Guilds
   * @name ListEmojis
   * @summary List custom emojis the bot can use
   * @request GET:/guilds/{guildId}/emojis
   * @secure
   * @response `200` `ListEmojisData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListEmojis {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListEmojisData;
  }

  /**
   * No description
   * @tags Guilds
   * @name ListGuildClanLogs
   * @summary List every clan log in the server
   * @request GET:/guilds/{guildId}/clan-logs
   * @secure
   * @response `200` `ListGuildClanLogsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListGuildClanLogs {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListGuildClanLogsData;
  }

  /**
   * @description Shows how many clans can have logs in this server, and which clans already count toward that limit.
   * @tags Guilds
   * @name GetClanLogLimit
   * @summary Get the server's clan log limit
   * @request GET:/guilds/{guildId}/clan-logs/limit
   * @secure
   * @response `200` `GetClanLogLimitData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanLogLimit {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanLogLimitData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetClanEmbed
   * @summary Get a clan's embed
   * @request GET:/guilds/{guildId}/clans/{clanTag}/embed
   * @secure
   * @response `200` `GetClanEmbedData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetClanEmbed {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClanEmbedData;
  }

  /**
   * @description The bot posts or updates the message the next time it refreshes. A clan's first log or embed counts toward the server's clan log limit.
   * @tags Guilds
   * @name SaveClanEmbed
   * @summary Create or update a clan's embed
   * @request PUT:/guilds/{guildId}/clans/{clanTag}/embed
   * @secure
   * @response `200` `SaveClanEmbedData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveClanEmbed {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanEmbedInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveClanEmbedData;
  }

  /**
   * @description The message already posted stays in the channel, but the bot stops updating it.
   * @tags Guilds
   * @name DeleteClanEmbed
   * @summary Delete a clan's embed
   * @request DELETE:/guilds/{guildId}/clans/{clanTag}/embed
   * @secure
   * @response `204` `DeleteClanEmbedData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteClanEmbed {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteClanEmbedData;
  }

  /**
   * No description
   * @tags Guilds
   * @name ListClanLogs
   * @summary List a clan's logs
   * @request GET:/guilds/{guildId}/clans/{clanTag}/logs
   * @secure
   * @response `200` `ListClanLogsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListClanLogs {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListClanLogsData;
  }

  /**
   * @description A clan's first log counts toward the server's clan log limit. A new log starts by posting the last 30 minutes of activity.
   * @tags Guilds
   * @name SaveClanLog
   * @summary Create or update a clan log
   * @request PUT:/guilds/{guildId}/clans/{clanTag}/logs/{logType}
   * @secure
   * @response `200` `SaveClanLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveClanLog {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
      logType: ClanLogType;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanLogInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveClanLogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name DeleteClanLog
   * @summary Delete a clan log
   * @request DELETE:/guilds/{guildId}/clans/{clanTag}/logs/{logType}
   * @secure
   * @response `204` `DeleteClanLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteClanLog {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
      logType: ClanLogType;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteClanLogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetAutoRoles
   * @summary Get the server's auto-role settings
   * @request GET:/guilds/{guildId}/auto-roles
   * @secure
   * @response `200` `GetAutoRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetAutoRoles {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAutoRolesData;
  }

  /**
   * @description You only need to send the fields you want to change. Roles must be below the bot's highest role, and the server needs at least one clan first.
   * @tags Guilds
   * @name UpdateAutoRoles
   * @summary Update the server-wide auto-role settings
   * @request PATCH:/guilds/{guildId}/auto-roles
   * @secure
   * @response `200` `UpdateAutoRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateAutoRoles {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AutoRolesInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateAutoRolesData;
  }

  /**
   * @description This replaces all of the clan's roles, so any role you leave out is cleared. An in-war role can only be used by one clan.
   * @tags Guilds
   * @name SaveClanAutoRoles
   * @summary Set a clan's auto-roles
   * @request PUT:/guilds/{guildId}/auto-roles/clans/{clanTag}
   * @secure
   * @response `200` `SaveClanAutoRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveClanAutoRoles {
    export type RequestParams = {
      guildId: string;
      clanTag: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AutoRoleClanInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveClanAutoRolesData;
  }

  /**
   * @description Also shows how many active flags the server has and how many it's allowed. Supporter servers have no limit.
   * @tags Guilds
   * @name ListFlags
   * @summary List the server's active flags
   * @request GET:/guilds/{guildId}/flags
   * @secure
   * @response `200` `ListFlagsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListFlags {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {
      /** Only flags of this type */
      flagType?: FlagType;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListFlagsData;
  }

  /**
   * @description Each player found gets their own flag. Servers without a subscription can have up to 1,000 active flags.
   * @tags Guilds
   * @name CreateFlags
   * @summary Flag one or more players
   * @request POST:/guilds/{guildId}/flags
   * @secure
   * @response `201` `CreateFlagsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateFlags {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FlagInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateFlagsData;
  }

  /**
   * No description
   * @tags Guilds
   * @name DeleteFlag
   * @summary Delete an active flag
   * @request DELETE:/guilds/{guildId}/flags/{flagId}
   * @secure
   * @response `204` `DeleteFlagData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteFlag {
    export type RequestParams = {
      guildId: string;
      flagId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteFlagData;
  }

  /**
   * @description Finds members whose username or server nickname starts with what you type. Returns up to 50.
   * @tags Guilds
   * @name SearchMembers
   * @summary Search the server's members
   * @request GET:/guilds/{guildId}/members/list
   * @secure
   * @response `200` `SearchMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SearchMembers {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {
      query: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = SearchMembersData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetServerLogs
   * @summary Get the server-wide log settings
   * @request GET:/guilds/{guildId}/server-logs
   * @secure
   * @response `200` `GetServerLogsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetServerLogs {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetServerLogsData;
  }

  /**
   * No description
   * @tags Guilds
   * @name SaveFlagAlertLog
   * @summary Set up the flag alert log
   * @request PUT:/guilds/{guildId}/server-logs/flag-alert
   * @secure
   * @response `200` `SaveFlagAlertLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveFlagAlertLog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FlagAlertLogInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveFlagAlertLogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name DeleteFlagAlertLog
   * @summary Turn off the flag alert log
   * @request DELETE:/guilds/{guildId}/server-logs/flag-alert
   * @secure
   * @response `200` `DeleteFlagAlertLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteFlagAlertLog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteFlagAlertLogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name SaveRosterChangelog
   * @summary Set up the roster changelog
   * @request PUT:/guilds/{guildId}/server-logs/roster-changelog
   * @secure
   * @response `200` `SaveRosterChangelogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveRosterChangelog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ServerLogChannelInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveRosterChangelogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name DeleteRosterChangelog
   * @summary Turn off the roster changelog
   * @request DELETE:/guilds/{guildId}/server-logs/roster-changelog
   * @secure
   * @response `200` `DeleteRosterChangelogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteRosterChangelog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteRosterChangelogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name SaveMaintenanceLog
   * @summary Set up the maintenance log
   * @request PUT:/guilds/{guildId}/server-logs/maintenance
   * @secure
   * @response `200` `SaveMaintenanceLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveMaintenanceLog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MaintenanceLogInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveMaintenanceLogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name DeleteMaintenanceLog
   * @summary Turn off the maintenance log
   * @request DELETE:/guilds/{guildId}/server-logs/maintenance
   * @secure
   * @response `200` `DeleteMaintenanceLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteMaintenanceLog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteMaintenanceLogData;
  }

  /**
   * @description Saves the message and turns it on.
   * @tags Guilds
   * @name SaveWelcomeLog
   * @summary Set up the welcome message
   * @request PUT:/guilds/{guildId}/server-logs/welcome
   * @secure
   * @response `200` `SaveWelcomeLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveWelcomeLog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = WelcomeLogInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveWelcomeLogData;
  }

  /**
   * @description The message is saved, so you can turn it back on later.
   * @tags Guilds
   * @name DeleteWelcomeLog
   * @summary Turn off the welcome message
   * @request DELETE:/guilds/{guildId}/server-logs/welcome
   * @secure
   * @response `200` `DeleteWelcomeLogData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteWelcomeLog {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteWelcomeLogData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetButtonMessages
   * @summary Get the server's button messages
   * @request GET:/guilds/{guildId}/buttons
   * @secure
   * @response `200` `GetButtonMessagesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetButtonMessages {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetButtonMessagesData;
  }

  /**
   * @description Changes what `/setup buttons` posts. Messages that were already posted keep their old look.
   * @tags Guilds
   * @name UpdateButtonMessage
   * @summary Update a button message
   * @request PUT:/guilds/{guildId}/buttons/{buttonType}
   * @secure
   * @response `200` `UpdateButtonMessageData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateButtonMessage {
    export type RequestParams = {
      guildId: string;
      buttonType: ButtonType;
    };
    export type RequestQuery = {};
    export type RequestBody = ButtonMessageInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateButtonMessageData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetManagerRoles
   * @summary Get the server's manager roles
   * @request GET:/guilds/{guildId}/managers
   * @secure
   * @response `200` `GetManagerRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetManagerRoles {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetManagerRolesData;
  }

  /**
   * @description You only need to send the lists you want to change. Sending an empty list clears it.
   * @tags Guilds
   * @name UpdateManagerRoles
   * @summary Update the server's manager roles
   * @request PATCH:/guilds/{guildId}/managers
   * @secure
   * @response `200` `UpdateManagerRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateManagerRoles {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ManagerRolesInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateManagerRolesData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetGuildConfig
   * @summary Get the server's embed color, webhook limit and subscription
   * @request GET:/guilds/{guildId}/config
   * @secure
   * @response `200` `GetGuildConfigData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetGuildConfig {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetGuildConfigData;
  }

  /**
   * @description You only need to send the fields you want to change. Set the color to null to go back to the default.
   * @tags Guilds
   * @name UpdateGuildConfig
   * @summary Update the server's embed color or webhook limit
   * @request PATCH:/guilds/{guildId}/config
   * @secure
   * @response `200` `UpdateGuildConfigData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateGuildConfig {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ServerConfigInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateGuildConfigData;
  }

  /**
   * No description
   * @tags Guilds
   * @name GetGuildBetaStatus
   * @summary Check whether the server is in the beta
   * @request GET:/guilds/{guildId}/beta
   * @secure
   * @response `200` `GetGuildBetaStatusData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetGuildBetaStatus {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetGuildBetaStatusData;
  }
}

export namespace Tickets {
  /**
   * No description
   * @tags Tickets
   * @name GetTicketSettings
   * @summary Get the server's ticket panels and saved replies
   * @request GET:/tickets/{guildId}
   * @secure
   * @response `200` `GetTicketSettingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetTicketSettings {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTicketSettingsData;
  }

  /**
   * @description Newest first, 25 per page. To get the next page, pass the `nextCursor` from the response as `before`.
   * @tags Tickets
   * @name ListTickets
   * @summary List tickets opened in the server
   * @request GET:/tickets/{guildId}/list
   * @secure
   * @response `200` `ListTicketsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListTickets {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {
      status?: TicketStatus;
      /** The `nextCursor` of the page before, for the tickets opened before it. */
      before?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListTicketsData;
  }

  /**
   * @description Does the same as the Close button in Discord. The last 100 messages are saved to the ticket log, and the channel is deleted.
   * @tags Tickets
   * @name CloseTicket
   * @summary Close an opened ticket
   * @request POST:/tickets/{guildId}/{ticketId}/close
   * @secure
   * @response `204` `CloseTicketData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CloseTicket {
    export type RequestParams = {
      guildId: string;
      ticketId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CloseTicketData;
  }

  /**
   * @description The panel starts with default settings and one General ticket type. Each panel in a server needs a different name.
   * @tags Tickets
   * @name CreateTicketPanel
   * @summary Create a ticket panel
   * @request POST:/tickets/{guildId}/panels
   * @secure
   * @response `201` `CreateTicketPanelData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateTicketPanel {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateTicketPanelInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateTicketPanelData;
  }

  /**
   * @description You only need to send the fields you want to change. If the panel is already posted in Discord, post it again to show the changes.
   * @tags Tickets
   * @name UpdateTicketPanel
   * @summary Update a ticket panel
   * @request PATCH:/tickets/{guildId}/panels/{panelId}
   * @secure
   * @response `200` `UpdateTicketPanelData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateTicketPanel {
    export type RequestParams = {
      guildId: string;
      panelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TicketPanelInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateTicketPanelData;
  }

  /**
   * @description Tickets already opened from it aren't affected. Its message in Discord stops opening new tickets.
   * @tags Tickets
   * @name DeleteTicketPanel
   * @summary Delete a ticket panel
   * @request DELETE:/tickets/{guildId}/panels/{panelId}
   * @secure
   * @response `200` `DeleteTicketPanelData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteTicketPanel {
    export type RequestParams = {
      guildId: string;
      panelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteTicketPanelData;
  }

  /**
   * @description A panel can have up to 25 ticket types.
   * @tags Tickets
   * @name AddTicketType
   * @summary Add a ticket type to a panel
   * @request POST:/tickets/{guildId}/panels/{panelId}/types
   * @secure
   * @response `201` `AddTicketTypeData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace AddTicketType {
    export type RequestParams = {
      guildId: string;
      panelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateTicketTypeInput;
    export type RequestHeaders = {};
    export type ResponseBody = AddTicketTypeData;
  }

  /**
   * @description Send all of the panel's ticket type IDs, each once, in the order you want.
   * @tags Tickets
   * @name ReorderTicketTypes
   * @summary Reorder a panel's ticket types
   * @request PUT:/tickets/{guildId}/panels/{panelId}/types/order
   * @secure
   * @response `200` `ReorderTicketTypesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ReorderTicketTypes {
    export type RequestParams = {
      guildId: string;
      panelId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReorderTicketTypesInput;
    export type RequestHeaders = {};
    export type ResponseBody = ReorderTicketTypesData;
  }

  /**
   * @description You only need to send the fields you want to change.
   * @tags Tickets
   * @name UpdateTicketType
   * @summary Update a ticket type
   * @request PATCH:/tickets/{guildId}/panels/{panelId}/types/{typeId}
   * @secure
   * @response `200` `UpdateTicketTypeData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateTicketType {
    export type RequestParams = {
      guildId: string;
      panelId: string;
      typeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TicketTypeInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateTicketTypeData;
  }

  /**
   * @description Tickets already opened with this type stay open.
   * @tags Tickets
   * @name DeleteTicketType
   * @summary Delete a ticket type
   * @request DELETE:/tickets/{guildId}/panels/{panelId}/types/{typeId}
   * @secure
   * @response `200` `DeleteTicketTypeData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteTicketType {
    export type RequestParams = {
      guildId: string;
      panelId: string;
      typeId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteTicketTypeData;
  }

  /**
   * @description Staff can use these replies in any ticket in the server. You can save up to 25, and each needs a different name.
   * @tags Tickets
   * @name ReplaceSavedReplies
   * @summary Replace the server's saved ticket replies
   * @request PUT:/tickets/{guildId}/saved-replies
   * @secure
   * @response `200` `ReplaceSavedRepliesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ReplaceSavedReplies {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TicketSavedRepliesInput;
    export type RequestHeaders = {};
    export type ResponseBody = ReplaceSavedRepliesData;
  }
}

export namespace Reminders {
  /**
   * @description Includes clan war, capital raid and Clan Games reminders, with when each one will go off next.
   * @tags Reminders
   * @name ListReminders
   * @summary List the server's reminders
   * @request GET:/reminders/{guildId}
   * @secure
   * @response `200` `ListRemindersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListReminders {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListRemindersData;
  }

  /**
   * No description
   * @tags Reminders
   * @name GetReminderPings
   * @summary Get the roles that control reminder pings
   * @request GET:/reminders/{guildId}/pings
   * @secure
   * @response `200` `GetReminderPingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GetReminderPings {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReminderPingsData;
  }

  /**
   * @description Sending an empty list clears the setting. Members with these roles are saved right away, and the bot keeps the list up to date.
   * @tags Reminders
   * @name SaveReminderPings
   * @summary Set the roles that control reminder pings
   * @request PUT:/reminders/{guildId}/pings
   * @secure
   * @response `200` `SaveReminderPingsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace SaveReminderPings {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ReminderPingsInput;
    export type RequestHeaders = {};
    export type ResponseBody = SaveReminderPingsData;
  }

  /**
   * @description Set `duration` to how long before the war ends the reminder should go off, in milliseconds. It can be up to 48 hours, in 15-minute steps. A server can have 25 reminders of each type, or 5 per clan if that's more. Supporter servers have no limit.
   * @tags Reminders
   * @name CreateClanWarReminder
   * @summary Create a clan war reminder
   * @request POST:/reminders/{guildId}/clan-wars
   * @secure
   * @response `201` `CreateClanWarReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateClanWarReminder {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanWarReminderInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateClanWarReminderData;
  }

  /**
   * @description Send the whole reminder, the same as when you created it. Moving it to another channel removes its thread.
   * @tags Reminders
   * @name UpdateClanWarReminder
   * @summary Update a clan war reminder
   * @request PUT:/reminders/{guildId}/clan-wars/{reminderId}
   * @secure
   * @response `200` `UpdateClanWarReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateClanWarReminder {
    export type RequestParams = {
      guildId: string;
      reminderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanWarReminderInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateClanWarReminderData;
  }

  /**
   * No description
   * @tags Reminders
   * @name DeleteClanWarReminder
   * @summary Delete a clan war reminder
   * @request DELETE:/reminders/{guildId}/clan-wars/{reminderId}
   * @secure
   * @response `204` `DeleteClanWarReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteClanWarReminder {
    export type RequestParams = {
      guildId: string;
      reminderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteClanWarReminderData;
  }

  /**
   * @description Set `duration` to how long before the raid weekend ends the reminder should go off, in milliseconds. It can be up to 3 days, in 15-minute steps. A server can have 25 reminders of each type, or 5 per clan if that's more. Supporter servers have no limit.
   * @tags Reminders
   * @name CreateCapitalRaidReminder
   * @summary Create a capital raid reminder
   * @request POST:/reminders/{guildId}/capital-raids
   * @secure
   * @response `201` `CreateCapitalRaidReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateCapitalRaidReminder {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CapitalRaidReminderInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateCapitalRaidReminderData;
  }

  /**
   * @description Send the whole reminder, the same as when you created it. Moving it to another channel removes its thread.
   * @tags Reminders
   * @name UpdateCapitalRaidReminder
   * @summary Update a capital raid reminder
   * @request PUT:/reminders/{guildId}/capital-raids/{reminderId}
   * @secure
   * @response `200` `UpdateCapitalRaidReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateCapitalRaidReminder {
    export type RequestParams = {
      guildId: string;
      reminderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CapitalRaidReminderInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateCapitalRaidReminderData;
  }

  /**
   * No description
   * @tags Reminders
   * @name DeleteCapitalRaidReminder
   * @summary Delete a capital raid reminder
   * @request DELETE:/reminders/{guildId}/capital-raids/{reminderId}
   * @secure
   * @response `204` `DeleteCapitalRaidReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteCapitalRaidReminder {
    export type RequestParams = {
      guildId: string;
      reminderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteCapitalRaidReminderData;
  }

  /**
   * @description Set `duration` to how long before Clan Games end the reminder should go off, in milliseconds. It can be up to 6 days, in 15-minute steps. A server can have 25 reminders of each type, or 5 per clan if that's more. Supporter servers have no limit.
   * @tags Reminders
   * @name CreateClanGamesReminder
   * @summary Create a Clan Games reminder
   * @request POST:/reminders/{guildId}/clan-games
   * @secure
   * @response `201` `CreateClanGamesReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace CreateClanGamesReminder {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanGamesReminderInput;
    export type RequestHeaders = {};
    export type ResponseBody = CreateClanGamesReminderData;
  }

  /**
   * @description Send the whole reminder, the same as when you created it. Moving it to another channel removes its thread.
   * @tags Reminders
   * @name UpdateClanGamesReminder
   * @summary Update a Clan Games reminder
   * @request PUT:/reminders/{guildId}/clan-games/{reminderId}
   * @secure
   * @response `200` `UpdateClanGamesReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateClanGamesReminder {
    export type RequestParams = {
      guildId: string;
      reminderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ClanGamesReminderInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateClanGamesReminderData;
  }

  /**
   * No description
   * @tags Reminders
   * @name DeleteClanGamesReminder
   * @summary Delete a Clan Games reminder
   * @request DELETE:/reminders/{guildId}/clan-games/{reminderId}
   * @secure
   * @response `204` `DeleteClanGamesReminderData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace DeleteClanGamesReminder {
    export type RequestParams = {
      guildId: string;
      reminderId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteClanGamesReminderData;
  }
}

export namespace Exports {
  /**
   * @description For a scheduled export, the sheet already made for the same server and clans is returned instead of a new one.
   * @tags Internal
   * @name ExportClanMembers
   * @summary Export clan members to a Google Sheet
   * @request POST:/exports/members
   * @response `201` `ExportClanMembersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ExportClanMembers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ExportMembersInput;
    export type RequestHeaders = {};
    export type ResponseBody = ExportClanMembersData;
  }
}

export namespace Admin {
  /**
   * No description
   * @tags Admin
   * @name ListBetaGuilds
   * @summary List beta servers
   * @request GET:/admin/beta-guilds
   * @secure
   * @response `200` `ListBetaGuildsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListBetaGuilds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListBetaGuildsData;
  }

  /**
   * @description Servers that are already in the beta are left as they are, with their original note.
   * @tags Admin
   * @name AddBetaGuilds
   * @summary Add servers to the beta
   * @request POST:/admin/beta-guilds
   * @secure
   * @response `201` `AddBetaGuildsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace AddBetaGuilds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AddBetaGuildsInput;
    export type RequestHeaders = {};
    export type ResponseBody = AddBetaGuildsData;
  }

  /**
   * No description
   * @tags Admin
   * @name RemoveBetaGuild
   * @summary Remove a server from the beta
   * @request DELETE:/admin/beta-guilds/{guildId}
   * @secure
   * @response `200` `RemoveBetaGuildData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RemoveBetaGuild {
    export type RequestParams = {
      guildId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RemoveBetaGuildData;
  }

  /**
   * No description
   * @tags Admin
   * @name ListSubscribers
   * @summary List Patreon and manual subscriptions
   * @request GET:/admin/subscribers
   * @secure
   * @response `200` `ListSubscribersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListSubscribers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListSubscribersData;
  }

  /**
   * @description For payments an admin has checked by hand, such as Ko-fi or PayPal. A user can only have one active manual subscription.
   * @tags Admin
   * @name GrantSubscription
   * @summary Grant a subscription by hand
   * @request POST:/admin/subscribers
   * @secure
   * @response `201` `GrantSubscriptionData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace GrantSubscription {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GrantSubscriptionInput;
    export type RequestHeaders = {};
    export type ResponseBody = GrantSubscriptionData;
  }

  /**
   * @description Use it to extend, renew, change the plan of or add servers to a manual subscription. Patreon subscriptions can't be changed here.
   * @tags Admin
   * @name UpdateSubscription
   * @summary Update a manual subscription
   * @request PATCH:/admin/subscribers/{id}
   * @secure
   * @response `200` `UpdateSubscriptionData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateSubscription {
    export type RequestParams = {
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateSubscriptionInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateSubscriptionData;
  }

  /**
   * No description
   * @tags Admin
   * @name ListDevelopers
   * @summary List developer accounts
   * @request GET:/admin/developers
   * @secure
   * @response `200` `ListDevelopersData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListDevelopers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListDevelopersData;
  }

  /**
   * @description The response includes the new account's passkey. Save it, because it's only shown once. Admin accounts can't be created here.
   * @tags Admin
   * @name AddDeveloper
   * @summary Add a developer account
   * @request POST:/admin/developers
   * @secure
   * @response `201` `AddDeveloperData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace AddDeveloper {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AddDeveloperInput;
    export type RequestHeaders = {};
    export type ResponseBody = AddDeveloperData;
  }

  /**
   * @description The new roles take effect the next time the developer logs in. Admin accounts can't be changed.
   * @tags Admin
   * @name UpdateDeveloperRoles
   * @summary Change a developer's roles
   * @request PATCH:/admin/developers/{userId}
   * @secure
   * @response `200` `UpdateDeveloperRolesData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace UpdateDeveloperRoles {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = EditDeveloperInput;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateDeveloperRolesData;
  }

  /**
   * @description The passkey stops working right away. Tokens already issued keep working until they expire, which takes up to 2 hours. Admin accounts can't be revoked.
   * @tags Admin
   * @name RevokeDeveloper
   * @summary Revoke a developer account
   * @request DELETE:/admin/developers/{userId}
   * @secure
   * @response `200` `RevokeDeveloperData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace RevokeDeveloper {
    export type RequestParams = {
      userId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = RevokeDeveloperData;
  }
}

export namespace BetaGuilds {
  /**
   * No description
   * @tags Internal
   * @name ListBetaGuildIds
   * @summary List beta server IDs, oldest first
   * @request GET:/beta-guilds/ids
   * @secure
   * @response `200` `ListBetaGuildIdsData`
   * @response `500` `ErrorResponseDto`
   */
  export namespace ListBetaGuildIds {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ListBetaGuildIdsData;
  }
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<
  AxiosRequestConfig,
  'data' | 'params' | 'url' | 'responseType'
> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<
  AxiosRequestConfig,
  'data' | 'cancelToken'
> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '/v1'
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    });
  };
}

/**
 * @title ClashPerk Discord Bot API
 * @version v2.0.130
 * @baseUrl /v1
 * @contact
 *
 * ### API Routes for ClashPerk Discord Bot and Services
 *
 * [Terms of Service](https://clashperk.com/terms) | [Privacy Policy](https://clashperk.com/privacy)
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  auth = {
    /**
     * @description Returns an access token that works for 2 hours. After that, log in again to get a new one.<br/><br/>Send the token with every request in the `Authorization: Bearer <accessToken>` header.
     *
     * @tags Auth
     * @name Login
     * @summary Exchange a passKey for an access token
     * @request POST:/auth/login
     * @response `201` `LoginData`
     * @response `500` `ErrorResponseDto`
     */
    login: (data: LoginInputDto, params: RequestParams = {}) =>
      this.http.request<LoginData, LoginError>({
        path: `/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name GetAuthUser
     * @summary Get a user's roles and display name
     * @request GET:/auth/users/{userId}
     * @secure
     * @response `200` `GetAuthUserData`
     * @response `500` `ErrorResponseDto`
     */
    getAuthUser: ({ userId }: GetAuthUserParams, params: RequestParams = {}) =>
      this.http.request<GetAuthUserData, GetAuthUserError>({
        path: `/auth/users/${userId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description The dashboard calls this to find out who is signing in from the bot. Tokens expire after an hour. The server is included only if the user can manage it.
     *
     * @tags Auth
     * @name GetHandoffUser
     * @summary Read the Discord user behind a handoff token
     * @request GET:/auth/handoff/{token}
     * @secure
     * @response `200` `GetHandoffUserData`
     * @response `500` `ErrorResponseDto`
     */
    getHandoffUser: ({ token }: GetHandoffUserParams, params: RequestParams = {}) =>
      this.http.request<GetHandoffUserData, GetHandoffUserError>({
        path: `/auth/handoff/${token}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description The bot calls this when a user opens the dashboard from Discord, so they arrive already signed in. The token expires after an hour.
     *
     * @tags Auth
     * @name CreateHandoffToken
     * @summary Create a handoff token for the dashboard
     * @request POST:/auth/handoff
     * @secure
     * @response `201` `CreateHandoffTokenData`
     * @response `500` `ErrorResponseDto`
     */
    createHandoffToken: (data: HandoffTokenInputDto, params: RequestParams = {}) =>
      this.http.request<CreateHandoffTokenData, CreateHandoffTokenError>({
        path: `/auth/handoff`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send a list of server IDs and get back the ones ClashPerk is in, with each server's name, icon and number of clans.
     *
     * @tags Auth
     * @name GetBotGuilds
     * @summary Find which servers ClashPerk is in
     * @request QUERY:/auth/bot-guilds
     * @secure
     * @response `200` `GetBotGuildsData`
     * @response `500` `ErrorResponseDto`
     */
    getBotGuilds: (data: BotGuildsInputDto, params: RequestParams = {}) =>
      this.http.request<GetBotGuildsData, GetBotGuildsError>({
        path: `/auth/bot-guilds`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send a user and a list of server IDs to get back the servers where that user has the bot manager role. Discord permissions such as Manage Server aren't checked here.
     *
     * @tags Auth
     * @name GetManagedGuilds
     * @summary Find servers where a user has the manager role
     * @request QUERY:/auth/managed-guilds
     * @secure
     * @response `200` `GetManagedGuildsData`
     * @response `500` `ErrorResponseDto`
     */
    getManagedGuilds: (data: ManagedGuildsInputDto, params: RequestParams = {}) =>
      this.http.request<GetManagedGuildsData, GetManagedGuildsError>({
        path: `/auth/managed-guilds`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Tells you whether a bot is in the server and whether the user is allowed to manage it. If you don't name a bot, a running custom bot is checked first, then ClashPerk.
     *
     * @tags Auth
     * @name GetGuildAccess
     * @summary Check a user's access to a server
     * @request QUERY:/auth/guild-access
     * @secure
     * @response `200` `GetGuildAccessData`
     * @response `500` `ErrorResponseDto`
     */
    getGuildAccess: (data: GuildAccessInputDto, params: RequestParams = {}) =>
      this.http.request<GetGuildAccessData, GetGuildAccessError>({
        path: `/auth/guild-access`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  };
  links = {
    /**
     * @description To link a player to someone else, you need to be a verified Leader or Co-Leader of the player's clan. If the player is already linked to another user, you also need the player's in-game API token.
     *
     * @tags Links
     * @name CreateLink
     * @summary Link a player to a Discord user
     * @request POST:/links
     * @secure
     * @response `201` `CreateLinkData`
     * @response `500` `ErrorResponseDto`
     */
    createLink: (data: CreateLinkInputDto, params: RequestParams = {}) =>
      this.http.request<CreateLinkData, CreateLinkError>({
        path: `/links`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Only the owner can unlink a verified player. An unverified link can also be removed by the person who made it, or by a verified Leader or Co-Leader of the player's clan.
     *
     * @tags Links
     * @name DeleteLink
     * @summary Unlink a player from its Discord user
     * @request DELETE:/links/{playerTag}
     * @secure
     * @response `200` `DeleteLinkData`
     * @response `500` `ErrorResponseDto`
     */
    deleteLink: ({ playerTag }: DeleteLinkParams, params: RequestParams = {}) =>
      this.http.request<DeleteLinkData, DeleteLinkError>({
        path: `/links/${playerTag}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Links
     * @name SetDefaultLink
     * @summary Make one of your linked players your default
     * @request PUT:/links/{playerTag}/default
     * @secure
     * @response `200` `SetDefaultLinkData`
     * @response `500` `ErrorResponseDto`
     */
    setDefaultLink: ({ playerTag }: SetDefaultLinkParams, params: RequestParams = {}) =>
      this.http.request<SetDefaultLinkData, SetDefaultLinkError>({
        path: `/links/${playerTag}/default`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Links
     * @name SetLinkHidden
     * @summary Hide or show a linked player in your task lists
     * @request PUT:/links/{playerTag}/hidden
     * @secure
     * @response `200` `SetLinkHiddenData`
     * @response `500` `ErrorResponseDto`
     */
    setLinkHidden: (
      { playerTag }: SetLinkHiddenParams,
      data: SetHiddenInputDto,
      params: RequestParams = {}
    ) =>
      this.http.request<SetLinkHiddenData, SetLinkHiddenError>({
        path: `/links/${playerTag}/hidden`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send either `playerTags` or `userIds`, not both, with up to 100 values. Player tags must be exact, including the `#`.
     *
     * @tags Links
     * @name GetLinks
     * @summary Get links by player tags or user IDs
     * @request QUERY:/links/query
     * @secure
     * @response `200` `GetLinksData`
     * @response `500` `ErrorResponseDto`
     */
    getLinks: (data: GetLinksInputDto, params: RequestParams = {}) =>
      this.http.request<GetLinksData, GetLinksError>({
        path: `/links/query`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
     *
     * @tags Links
     * @name GetLinksViaPost
     * @summary Get links by player tags or user IDs
     * @request POST:/links/query
     * @deprecated
     * @secure
     * @response `200` `GetLinksViaPostData`
     * @response `500` `ErrorResponseDto`
     */
    getLinksViaPost: (data: GetLinksInputDto, params: RequestParams = {}) =>
      this.http.request<GetLinksViaPostData, GetLinksViaPostError>({
        path: `/links/query`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  };
  clans = {
    /**
     * @description Shows Town Hall upgrades, members joining and leaving, and clan milestones, newest first.
     *
     * @tags Clans
     * @name GetClanActivity
     * @summary List recent activity in clans
     * @request QUERY:/clans/activity
     * @secure
     * @response `200` `GetClanActivityData`
     * @response `500` `ErrorResponseDto`
     */
    getClanActivity: (data: ClanActivityInputDto, params: RequestParams = {}) =>
      this.http.request<GetClanActivityData, GetClanActivityError>({
        path: `/clans/activity`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
     *
     * @tags Clans
     * @name GetClanActivityViaPost
     * @summary List recent activity in clans
     * @request POST:/clans/activity
     * @deprecated
     * @secure
     * @response `200` `GetClanActivityViaPostData`
     * @response `500` `ErrorResponseDto`
     */
    getClanActivityViaPost: (data: ClanActivityInputDto, params: RequestParams = {}) =>
      this.http.request<GetClanActivityViaPostData, GetClanActivityViaPostError>({
        path: `/clans/activity`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Clans
     * @name GetClan
     * @summary Get a clan's profile
     * @request GET:/clans/{clanTag}
     * @secure
     * @response `200` `GetClanData`
     * @response `500` `ErrorResponseDto`
     */
    getClan: ({ clanTag }: GetClanParams, params: RequestParams = {}) =>
      this.http.request<GetClanData, GetClanError>({
        path: `/clans/${clanTag}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Shows when each member was last active, and how active they've been over the last day and the last 30 days. Members ClashPerk hasn't seen yet are left out.
     *
     * @tags Clans
     * @name GetClanLastSeen
     * @summary Get last-seen times for a clan's members
     * @request GET:/clans/{clanTag}/lastseen
     * @secure
     * @response `200` `GetClanLastSeenData`
     * @response `500` `ErrorResponseDto`
     */
    getClanLastSeen: ({ clanTag }: GetClanLastSeenParams, params: RequestParams = {}) =>
      this.http.request<GetClanLastSeenData, GetClanLastSeenError>({
        path: `/clans/${clanTag}/lastseen`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Pass a month such as `2026-10` to see that month. Without one, you get the last 10 days.
     *
     * @tags Clans
     * @name GetClanCapitalContributions
     * @summary List a clan's Capital Gold contributions
     * @request GET:/clans/{clanTag}/capital-contribution
     * @secure
     * @response `200` `GetClanCapitalContributionsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanCapitalContributions: (
      { clanTag, ...query }: GetClanCapitalContributionsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetClanCapitalContributionsData, GetClanCapitalContributionsError>({
        path: `/clans/${clanTag}/capital-contribution`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Clans
     * @name GetClanCapitalRaids
     * @summary List a clan's Capital raid weekends
     * @request GET:/clans/{clanTag}/capital-raids
     * @secure
     * @response `200` `GetClanCapitalRaidsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanCapitalRaids: (
      { clanTag, ...query }: GetClanCapitalRaidsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetClanCapitalRaidsData, GetClanCapitalRaidsError>({
        path: `/clans/${clanTag}/capital-raids`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Clans
     * @name GetClanGames
     * @summary Get a clan's Clan Games points
     * @request GET:/clans/{clanTag}/clan-games
     * @secure
     * @response `200` `GetClanGamesData`
     * @response `500` `ErrorResponseDto`
     */
    getClanGames: ({ clanTag, ...query }: GetClanGamesParams, params: RequestParams = {}) =>
      this.http.request<GetClanGamesData, GetClanGamesError>({
        path: `/clans/${clanTag}/clan-games`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Also tells you which of these links you're allowed to remove.
     *
     * @tags Clans
     * @name GetClanLinks
     * @summary List a clan's members with their Discord links
     * @request GET:/clans/{clanTag}/links
     * @secure
     * @response `200` `GetClanLinksData`
     * @response `500` `ErrorResponseDto`
     */
    getClanLinks: ({ clanTag }: GetClanLinksParams, params: RequestParams = {}) =>
      this.http.request<GetClanLinksData, GetClanLinksError>({
        path: `/clans/${clanTag}/links`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  };
  players = {
    /**
     * No description
     *
     * @tags Players
     * @name GetPlayer
     * @summary Get a player's profile
     * @request GET:/players/{playerTag}
     * @secure
     * @response `200` `GetPlayerData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayer: ({ playerTag }: GetPlayerParams, params: RequestParams = {}) =>
      this.http.request<GetPlayerData, GetPlayerError>({
        path: `/players/${playerTag}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description If the player was banned from tracking, the ban is lifted.
     *
     * @tags Players
     * @name TrackLegendPlayer
     * @summary Add a player to Legend League tracking
     * @request PUT:/players/{playerTag}
     * @secure
     * @response `200` `TrackLegendPlayerData`
     * @response `500` `ErrorResponseDto`
     */
    trackLegendPlayer: ({ playerTag }: TrackLegendPlayerParams, params: RequestParams = {}) =>
      this.http.request<TrackLegendPlayerData, TrackLegendPlayerError>({
        path: `/players/${playerTag}`,
        method: 'PUT',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Players
     * @name GetPlayerSeasons
     * @summary Get a player's season stats
     * @request GET:/players/{playerTag}/seasons
     * @secure
     * @response `200` `GetPlayerSeasonsData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerSeasons: (
      { playerTag, ...query }: GetPlayerSeasonsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetPlayerSeasonsData, GetPlayerSeasonsError>({
        path: `/players/${playerTag}/seasons`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description If the player isn't in a league group right now, there's no current week in the response.
     *
     * @tags Players
     * @name GetPlayerRankedWeeks
     * @summary Get a player's ranked league weeks
     * @request GET:/players/{playerTag}/ranked
     * @secure
     * @response `200` `GetPlayerRankedWeeksData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerRankedWeeks: ({ playerTag }: GetPlayerRankedWeeksParams, params: RequestParams = {}) =>
      this.http.request<GetPlayerRankedWeeksData, GetPlayerRankedWeeksError>({
        path: `/players/${playerTag}/ranked`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Only battles ClashPerk has tracked, up to 448.
     *
     * @tags Players
     * @name GetPlayerBattleLog
     * @summary Get a player's battle log
     * @request GET:/players/{playerTag}/battle-log
     * @secure
     * @response `200` `GetPlayerBattleLogData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerBattleLog: ({ playerTag }: GetPlayerBattleLogParams, params: RequestParams = {}) =>
      this.http.request<GetPlayerBattleLogData, GetPlayerBattleLogError>({
        path: `/players/${playerTag}/battle-log`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Trophies, attacks and defenses for each battle day, oldest first.
     *
     * @tags Players
     * @name GetPlayerDailyBattles
     * @summary Get a player's daily battle totals
     * @request GET:/players/{playerTag}/battle-log/aggregate
     * @secure
     * @response `200` `GetPlayerDailyBattlesData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerDailyBattles: (
      { playerTag }: GetPlayerDailyBattlesParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetPlayerDailyBattlesData, GetPlayerDailyBattlesError>({
        path: `/players/${playerTag}/battle-log/aggregate`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Players
     * @name GetBattleLogLeaderboard
     * @summary Rank players by Legend League trophies
     * @request QUERY:/players/battle-log/leaderboard
     * @secure
     * @response `200` `GetBattleLogLeaderboardData`
     * @response `500` `ErrorResponseDto`
     */
    getBattleLogLeaderboard: (data: BattleLogLeaderboardInputDto, params: RequestParams = {}) =>
      this.http.request<GetBattleLogLeaderboardData, GetBattleLogLeaderboardError>({
        path: `/players/battle-log/leaderboard`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
     *
     * @tags Players
     * @name GetBattleLogLeaderboardViaPost
     * @summary Rank players by Legend League trophies
     * @request POST:/players/battle-log/leaderboard
     * @deprecated
     * @secure
     * @response `201` `GetBattleLogLeaderboardViaPostData`
     * @response `500` `ErrorResponseDto`
     */
    getBattleLogLeaderboardViaPost: (
      data: BattleLogLeaderboardInputDto,
      params: RequestParams = {}
    ) =>
      this.http.request<GetBattleLogLeaderboardViaPostData, GetBattleLogLeaderboardViaPostError>({
        path: `/players/battle-log/leaderboard`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Newest first. For the clan the player is in now, the last-seen time is the current time.
     *
     * @tags Players
     * @name GetPlayerClanHistory
     * @summary Get a player's clan history
     * @request GET:/players/{playerTag}/history
     * @secure
     * @response `200` `GetPlayerClanHistoryData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerClanHistory: ({ playerTag }: GetPlayerClanHistoryParams, params: RequestParams = {}) =>
      this.http.request<GetPlayerClanHistoryData, GetPlayerClanHistoryError>({
        path: `/players/${playerTag}/history`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Players
     * @name GetPlayerWars
     * @summary List a player's wars and attacks
     * @request GET:/players/{playerTag}/wars
     * @secure
     * @response `200` `GetPlayerWarsData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerWars: ({ playerTag, ...query }: GetPlayerWarsParams, params: RequestParams = {}) =>
      this.http.request<GetPlayerWarsData, GetPlayerWarsError>({
        path: `/players/${playerTag}/wars`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Only counts wars that started on or after `startDate`.
     *
     * @tags Players
     * @name GetPlayerWarTotals
     * @summary Get a player's war totals per season
     * @request GET:/players/{playerTag}/wars/aggregate
     * @secure
     * @response `200` `GetPlayerWarTotalsData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerWarTotals: (
      { playerTag, ...query }: GetPlayerWarTotalsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetPlayerWarTotalsData, GetPlayerWarTotalsError>({
        path: `/players/${playerTag}/wars/aggregate`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Only counts rounds that started on or after `startDate`, newest group first. An attack counts as missed once its round ends.
     *
     * @tags Players
     * @name GetPlayerClanWarLeagueTotals
     * @summary Get a player's CWL totals per league group
     * @request GET:/players/{playerTag}/clan-war-leagues/aggregate
     * @secure
     * @response `200` `GetPlayerClanWarLeagueTotalsData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerClanWarLeagueTotals: (
      { playerTag, ...query }: GetPlayerClanWarLeagueTotalsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetPlayerClanWarLeagueTotalsData, GetPlayerClanWarLeagueTotalsError>({
        path: `/players/${playerTag}/clan-war-leagues/aggregate`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  };
  legends = {
    /**
     * @description Shows how many trophies it takes to reach certain ranks among the players ClashPerk tracks. Includes live numbers, the latest daily snapshot and up to 45 days of history.
     *
     * @tags Legends
     * @name GetLegendRankingThresholds
     * @summary Get Legend League rank thresholds
     * @request GET:/legends/ranking-thresholds
     * @secure
     * @response `200` `GetLegendRankingThresholdsData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendRankingThresholds: (params: RequestParams = {}) =>
      this.http.request<GetLegendRankingThresholdsData, GetLegendRankingThresholdsError>({
        path: `/legends/ranking-thresholds`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Only covers the current season. Players with no attacks logged are left out.
     *
     * @tags Legends
     * @name GetLegendAttacks
     * @summary Get legend attack logs for players
     * @request QUERY:/legends/attacks/query
     * @secure
     * @response `200` `GetLegendAttacksData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendAttacks: (data: GetLegendAttacksInputDto, params: RequestParams = {}) =>
      this.http.request<GetLegendAttacksData, GetLegendAttacksError>({
        path: `/legends/attacks/query`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
     *
     * @tags Legends
     * @name GetLegendAttacksViaPost
     * @summary Get legend attack logs for players
     * @request POST:/legends/attacks/query
     * @deprecated
     * @secure
     * @response `200` `GetLegendAttacksViaPostData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendAttacksViaPost: (data: GetLegendAttacksInputDto, params: RequestParams = {}) =>
      this.http.request<GetLegendAttacksViaPostData, GetLegendAttacksViaPostError>({
        path: `/legends/attacks/query`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Returns 404 if the player has no attacks logged in that season.
     *
     * @tags Legends
     * @name GetPlayerLegendAttacks
     * @summary Get a player's legend attack log
     * @request GET:/legends/{playerTag}/attacks
     * @secure
     * @response `200` `GetPlayerLegendAttacksData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerLegendAttacks: (
      { playerTag, ...query }: GetPlayerLegendAttacksParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetPlayerLegendAttacksData, GetPlayerLegendAttacksError>({
        path: `/legends/${playerTag}/attacks`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Shows each day's starting and ending trophies, the Monday reset and every battle.
     *
     * @tags Legends
     * @name GetLegendDays
     * @summary Get a player's legend days in a season
     * @request GET:/legends/{playerTag}/days
     * @secure
     * @response `200` `GetLegendDaysData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendDays: ({ playerTag, ...query }: GetLegendDaysParams, params: RequestParams = {}) =>
      this.http.request<GetLegendDaysData, GetLegendDaysError>({
        path: `/legends/${playerTag}/days`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Each hero with the pet and equipment used most, and the army used most, from the season's legend attacks.
     *
     * @tags Legends
     * @name GetLegendArmies
     * @summary Get a player's most used legend armies
     * @request GET:/legends/{playerTag}/armies
     * @secure
     * @response `200` `GetLegendArmiesData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendArmies: ({ playerTag, ...query }: GetLegendArmiesParams, params: RequestParams = {}) =>
      this.http.request<GetLegendArmiesData, GetLegendArmiesError>({
        path: `/legends/${playerTag}/armies`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Legends
     * @name GetLegendSeasons
     * @summary Get a player's recent legend seasons
     * @request GET:/legends/{playerTag}/seasons
     * @secure
     * @response `200` `GetLegendSeasonsData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendSeasons: ({ playerTag }: GetLegendSeasonsParams, params: RequestParams = {}) =>
      this.http.request<GetLegendSeasonsData, GetLegendSeasonsError>({
        path: `/legends/${playerTag}/seasons`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description The rank is worked out from the players ClashPerk tracks this season, so it may differ from the game. Returns 404 if the player isn't tracked.
     *
     * @tags Legends
     * @name EstimateLegendRank
     * @summary Estimate a player's legend rank
     * @request GET:/legends/{playerTag}/estimate-rank
     * @secure
     * @response `200` `EstimateLegendRankData`
     * @response `500` `ErrorResponseDto`
     */
    estimateLegendRank: ({ playerTag }: EstimateLegendRankParams, params: RequestParams = {}) =>
      this.http.request<EstimateLegendRankData, EstimateLegendRankError>({
        path: `/legends/${playerTag}/estimate-rank`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  };
  rankings = {
    /**
     * No description
     *
     * @tags Rankings
     * @name GetRankingLocations
     * @summary List ranking locations
     * @request GET:/rankings/locations
     * @secure
     * @response `200` `GetRankingLocationsData`
     * @response `500` `ErrorResponseDto`
     */
    getRankingLocations: (params: RequestParams = {}) =>
      this.http.request<GetRankingLocationsData, GetRankingLocationsError>({
        path: `/rankings/locations`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Rankings
     * @name GetRankingSeasons
     * @summary List saved ranking seasons
     * @request GET:/rankings/seasons
     * @secure
     * @response `200` `GetRankingSeasonsData`
     * @response `500` `ErrorResponseDto`
     */
    getRankingSeasons: (params: RequestParams = {}) =>
      this.http.request<GetRankingSeasonsData, GetRankingSeasonsError>({
        path: `/rankings/seasons`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Looks through every saved board, in every country and worldwide.
     *
     * @tags Rankings
     * @name FindRankings
     * @summary Find where players and clans rank this season
     * @request QUERY:/rankings/standings
     * @secure
     * @response `200` `FindRankingsData`
     * @response `500` `ErrorResponseDto`
     */
    findRankings: (data: RankingStandingsInputDto, params: RequestParams = {}) =>
      this.http.request<FindRankingsData, FindRankingsError>({
        path: `/rankings/standings`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Shows where the clan sits on the clan and capital boards in its country and worldwide, and its country rank over the last 6 saved seasons.
     *
     * @tags Rankings
     * @name GetClanRankings
     * @summary Get a clan's rankings and rank history
     * @request GET:/rankings/clans/{clanTag}
     * @secure
     * @response `200` `GetClanRankingsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanRankings: ({ clanTag }: GetClanRankingsParams, params: RequestParams = {}) =>
      this.http.request<GetClanRankingsData, GetClanRankingsError>({
        path: `/rankings/clans/${clanTag}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Only seasons where the player made a board, newest first. The current season isn't included.
     *
     * @tags Rankings
     * @name GetPlayerRankings
     * @summary List a player's past season-end ranks
     * @request GET:/rankings/players/{playerTag}
     * @secure
     * @response `200` `GetPlayerRankingsData`
     * @response `500` `ErrorResponseDto`
     */
    getPlayerRankings: ({ playerTag }: GetPlayerRankingsParams, params: RequestParams = {}) =>
      this.http.request<GetPlayerRankingsData, GetPlayerRankingsError>({
        path: `/rankings/players/${playerTag}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Shows the live board, or pass `season` to see a saved one. Builder base boards are only available live.
     *
     * @tags Rankings
     * @name GetRankingBoard
     * @summary Get a ranking board
     * @request GET:/rankings/{countryCode}/{board}
     * @secure
     * @response `200` `GetRankingBoardData`
     * @response `500` `ErrorResponseDto`
     */
    getRankingBoard: (
      { countryCode, board, ...query }: GetRankingBoardParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetRankingBoardData, GetRankingBoardError>({
        path: `/rankings/${countryCode}/${board}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      })
  };
  wars = {
    /**
     * @description Comes straight from the game and includes every war in the group. Returns 404 if the clan isn't in CWL.
     *
     * @tags Wars
     * @name GetClanWarLeagueGroup
     * @summary Get a clan's current CWL group
     * @request GET:/wars/{clanTag}/clan-war-leagues/groups
     * @secure
     * @response `200` `GetClanWarLeagueGroupData`
     * @response `500` `ErrorResponseDto`
     */
    getClanWarLeagueGroup: ({ clanTag }: GetClanWarLeagueGroupParams, params: RequestParams = {}) =>
      this.http.request<GetClanWarLeagueGroupData, GetClanWarLeagueGroupError>({
        path: `/wars/${clanTag}/clan-war-leagues/groups`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Uses the clan's most recent saved CWL group and returns only the clan's own wars.
     *
     * @tags Wars
     * @name GetClanWarLeagueWars
     * @summary Get a clan's wars in its latest CWL group
     * @request GET:/wars/{clanTag}/clan-war-leagues/clan
     * @secure
     * @response `200` `GetClanWarLeagueWarsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanWarLeagueWars: ({ clanTag }: GetClanWarLeagueWarsParams, params: RequestParams = {}) =>
      this.http.request<GetClanWarLeagueWarsData, GetClanWarLeagueWarsError>({
        path: `/wars/${clanTag}/clan-war-leagues/clan`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Built from the wars ClashPerk tracked, newest first. Use the standings endpoint to see a group's table.
     *
     * @tags Wars
     * @name GetClanWarLeagueSeasons
     * @summary List a clan's CWL seasons with member totals
     * @request GET:/wars/{clanTag}/clan-war-leagues/seasons
     * @secure
     * @response `200` `GetClanWarLeagueSeasonsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanWarLeagueSeasons: (
      { clanTag, ...query }: GetClanWarLeagueSeasonsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetClanWarLeagueSeasonsData, GetClanWarLeagueSeasonsError>({
        path: `/wars/${clanTag}/clan-war-leagues/seasons`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Wars
     * @name GetClanMemberWarStats
     * @summary Get war stats for a clan's members
     * @request GET:/wars/{clanTag}/members/stats
     * @secure
     * @response `200` `GetClanMemberWarStatsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanMemberWarStats: (
      { clanTag, ...query }: GetClanMemberWarStatsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetClanMemberWarStatsData, GetClanMemberWarStatsError>({
        path: `/wars/${clanTag}/members/stats`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Get the `groupId` from the CWL seasons endpoint. Each war win adds 10 bonus stars, as in the game.
     *
     * @tags Wars
     * @name GetClanWarLeagueStandings
     * @summary Get a CWL group's standings
     * @request GET:/wars/{clanTag}/clan-war-leagues/groups/{groupId}/standings
     * @secure
     * @response `200` `GetClanWarLeagueStandingsData`
     * @response `500` `ErrorResponseDto`
     */
    getClanWarLeagueStandings: (
      { clanTag, groupId }: GetClanWarLeagueStandingsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<GetClanWarLeagueStandingsData, GetClanWarLeagueStandingsError>({
        path: `/wars/${clanTag}/clan-war-leagues/groups/${groupId}/standings`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Wars
     * @name ListClanWars
     * @summary List a clan's tracked wars
     * @request GET:/wars/{clanTag}
     * @secure
     * @response `200` `ListClanWarsData`
     * @response `500` `ErrorResponseDto`
     */
    listClanWars: ({ clanTag, ...query }: ListClanWarsParams, params: RequestParams = {}) =>
      this.http.request<ListClanWarsData, ListClanWarsError>({
        path: `/wars/${clanTag}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description During CWL, this is the clan's current round. The war is empty if the clan isn't in one, or if its war log is private outside CWL.
     *
     * @tags Wars
     * @name GetCurrentWar
     * @summary Get a clan's current war
     * @request GET:/wars/{clanTag}/current
     * @secure
     * @response `200` `GetCurrentWarData`
     * @response `500` `ErrorResponseDto`
     */
    getCurrentWar: ({ clanTag }: GetCurrentWarParams, params: RequestParams = {}) =>
      this.http.request<GetCurrentWarData, GetCurrentWarError>({
        path: `/wars/${clanTag}/current`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Use a war ID from the clan's war list.
     *
     * @tags Wars
     * @name GetClanWar
     * @summary Get a tracked war
     * @request GET:/wars/{clanTag}/{warId}
     * @secure
     * @response `200` `GetClanWarData`
     * @response `500` `ErrorResponseDto`
     */
    getClanWar: ({ clanTag, warId }: GetClanWarParams, params: RequestParams = {}) =>
      this.http.request<GetClanWarData, GetClanWarError>({
        path: `/wars/${clanTag}/${warId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  };
  events = {
    /**
     * No description
     *
     * @tags Events
     * @name GetEvents
     * @summary List game events in a date range
     * @request GET:/events
     * @secure
     * @response `200` `GetEventsData`
     * @response `500` `ErrorResponseDto`
     */
    getEvents: (query: GetEventsParams, params: RequestParams = {}) =>
      this.http.request<GetEventsData, GetEventsError>({
        path: `/events`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Events
     * @name GetUpcomingEvents
     * @summary List current and next game events
     * @request GET:/events/upcoming
     * @secure
     * @response `200` `GetUpcomingEventsData`
     * @response `500` `ErrorResponseDto`
     */
    getUpcomingEvents: (params: RequestParams = {}) =>
      this.http.request<GetUpcomingEventsData, GetUpcomingEventsError>({
        path: `/events/upcoming`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  };
  rosters = {
    /**
     * @description API tokens with the `fetch:rosters` role can use this too.
     *
     * @tags Rosters
     * @name ListRosters
     * @summary List the server's rosters and groups
     * @request GET:/rosters/{guildId}/list
     * @secure
     * @response `200` `ListRostersData`
     * @response `500` `ErrorResponseDto`
     */
    listRosters: ({ guildId }: ListRostersParams, params: RequestParams = {}) =>
      this.http.request<ListRostersData, ListRostersError>({
        path: `/rosters/${guildId}/list`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Its settings are saved as the server's defaults for the next roster. Set `importMembers` with a clan to sign up the clan's members right away.
     *
     * @tags Rosters
     * @name CreateRoster
     * @summary Create a roster
     * @request POST:/rosters/{guildId}/create
     * @secure
     * @response `201` `CreateRosterData`
     * @response `500` `ErrorResponseDto`
     */
    createRoster: (
      { guildId }: CreateRosterParams,
      data: RosterInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateRosterData, CreateRosterError>({
        path: `/rosters/${guildId}/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Rosters
     * @name CreateRosterGroup
     * @summary Create a roster group
     * @request POST:/rosters/{guildId}/groups
     * @secure
     * @response `201` `CreateRosterGroupData`
     * @response `500` `ErrorResponseDto`
     */
    createRosterGroup: (
      { guildId }: CreateRosterGroupParams,
      data: RosterGroupInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateRosterGroupData, CreateRosterGroupError>({
        path: `/rosters/${guildId}/groups`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change.
     *
     * @tags Rosters
     * @name UpdateRosterGroup
     * @summary Update a roster group
     * @request PATCH:/rosters/{guildId}/groups/{groupId}
     * @secure
     * @response `200` `UpdateRosterGroupData`
     * @response `500` `ErrorResponseDto`
     */
    updateRosterGroup: (
      { guildId, groupId }: UpdateRosterGroupParams,
      data: RosterGroupUpdateInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateRosterGroupData, UpdateRosterGroupError>({
        path: `/rosters/${guildId}/groups/${groupId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Its members stay on the roster without a group.
     *
     * @tags Rosters
     * @name DeleteRosterGroup
     * @summary Delete a roster group
     * @request DELETE:/rosters/{guildId}/groups/{groupId}
     * @secure
     * @response `200` `DeleteRosterGroupData`
     * @response `500` `ErrorResponseDto`
     */
    deleteRosterGroup: (
      { guildId, groupId }: DeleteRosterGroupParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteRosterGroupData, DeleteRosterGroupError>({
        path: `/rosters/${guildId}/groups/${groupId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Rosters
     * @name GetRoster
     * @summary Get a roster
     * @request GET:/rosters/{guildId}/{rosterId}
     * @secure
     * @response `200` `GetRosterData`
     * @response `500` `ErrorResponseDto`
     */
    getRoster: ({ rosterId, guildId }: GetRosterParams, params: RequestParams = {}) =>
      this.http.request<GetRosterData, GetRosterError>({
        path: `/rosters/${guildId}/${rosterId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change. The roster's settings are saved as the server's defaults for the next roster.
     *
     * @tags Rosters
     * @name UpdateRoster
     * @summary Update a roster
     * @request PATCH:/rosters/{guildId}/{rosterId}
     * @secure
     * @response `200` `UpdateRosterData`
     * @response `500` `ErrorResponseDto`
     */
    updateRoster: (
      { guildId, rosterId }: UpdateRosterParams,
      data: RosterUpdateInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateRosterData, UpdateRosterError>({
        path: `/rosters/${guildId}/${rosterId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Members keep their roster and group roles until the bot next refreshes roles.
     *
     * @tags Rosters
     * @name DeleteRoster
     * @summary Delete a roster
     * @request DELETE:/rosters/{guildId}/{rosterId}
     * @secure
     * @response `204` `DeleteRosterData`
     * @response `500` `ErrorResponseDto`
     */
    deleteRoster: ({ guildId, rosterId }: DeleteRosterParams, params: RequestParams = {}) =>
      this.http.request<DeleteRosterData, DeleteRosterError>({
        path: `/rosters/${guildId}/${rosterId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * @description Copies most settings, except the role, image and color. Members are copied over only if they still pass the sign-up checks.
     *
     * @tags Rosters
     * @name CloneRoster
     * @summary Clone a roster
     * @request POST:/rosters/{guildId}/{rosterId}/clone
     * @secure
     * @response `201` `CloneRosterData`
     * @response `500` `ErrorResponseDto`
     */
    cloneRoster: (
      { guildId, rosterId }: CloneRosterParams,
      data: CloneRosterInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CloneRosterData, CloneRosterError>({
        path: `/rosters/${guildId}/${rosterId}/clone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Runs the sign-up checks for up to 100 players without adding anyone.
     *
     * @tags Rosters
     * @name CheckRosterMembers
     * @summary Check which players can join a roster
     * @request QUERY:/rosters/{guildId}/{rosterId}/members/check
     * @secure
     * @response `200` `CheckRosterMembersData`
     * @response `500` `ErrorResponseDto`
     */
    checkRosterMembers: (
      { guildId, rosterId }: CheckRosterMembersParams,
      data: RosterTagsInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CheckRosterMembersData, CheckRosterMembersError>({
        path: `/rosters/${guildId}/${rosterId}/members/check`,
        method: 'QUERY',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Deprecated: send the same request with the `QUERY` method. This POST is removed on 2026-11-25.
     *
     * @tags Rosters
     * @name CheckRosterMembersViaPost
     * @summary Check which players can join a roster
     * @request POST:/rosters/{guildId}/{rosterId}/members/check
     * @deprecated
     * @secure
     * @response `200` `CheckRosterMembersViaPostData`
     * @response `500` `ErrorResponseDto`
     */
    checkRosterMembersViaPost: (
      { guildId, rosterId }: CheckRosterMembersViaPostParams,
      data: RosterTagsInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CheckRosterMembersViaPostData, CheckRosterMembersViaPostError>({
        path: `/rosters/${guildId}/${rosterId}/members/check`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Players who fail a sign-up check are skipped, and the response says why for each one.
     *
     * @tags Rosters
     * @name AddRosterMembers
     * @summary Add players to a roster
     * @request PUT:/rosters/{guildId}/{rosterId}/members
     * @secure
     * @response `200` `AddRosterMembersData`
     * @response `500` `ErrorResponseDto`
     */
    addRosterMembers: (
      { guildId, rosterId }: AddRosterMembersParams,
      data: AddRosterMembersInput,
      params: RequestParams = {}
    ) =>
      this.http.request<AddRosterMembersData, AddRosterMembersError>({
        path: `/rosters/${guildId}/${rosterId}/members`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Rosters
     * @name DeleteRosterMembers
     * @summary Remove players from a roster
     * @request DELETE:/rosters/{guildId}/{rosterId}/members
     * @secure
     * @response `200` `DeleteRosterMembersData`
     * @response `500` `ErrorResponseDto`
     */
    deleteRosterMembers: (
      { rosterId, guildId }: DeleteRosterMembersParams,
      data: RemoveMembersBulkInput,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteRosterMembersData, DeleteRosterMembersError>({
        path: `/rosters/${guildId}/${rosterId}/members`,
        method: 'DELETE',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Updates each member's game data and Discord link, and the roster's clan details.
     *
     * @tags Rosters
     * @name RefreshRosterMembers
     * @summary Refresh a roster's members from the game
     * @request POST:/rosters/{guildId}/{rosterId}/members/refresh
     * @secure
     * @response `201` `RefreshRosterMembersData`
     * @response `500` `ErrorResponseDto`
     */
    refreshRosterMembers: (
      { guildId, rosterId }: RefreshRosterMembersParams,
      params: RequestParams = {}
    ) =>
      this.http.request<RefreshRosterMembersData, RefreshRosterMembersError>({
        path: `/rosters/${guildId}/${rosterId}/members/refresh`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description To move players to another group on the same roster, send only `newGroupId`. Players who fail the other roster's sign-up checks stay where they are.
     *
     * @tags Rosters
     * @name TransferRosterMembers
     * @summary Move players to another roster or group
     * @request PUT:/rosters/{guildId}/{rosterId}/members/transfer
     * @secure
     * @response `200` `TransferRosterMembersData`
     * @response `500` `ErrorResponseDto`
     */
    transferRosterMembers: (
      { rosterId, guildId }: TransferRosterMembersParams,
      data: TransferRosterMembersInput,
      params: RequestParams = {}
    ) =>
      this.http.request<TransferRosterMembersData, TransferRosterMembersError>({
        path: `/rosters/${guildId}/${rosterId}/members/transfer`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name GetUserSettings
     * @summary Get your default clan, bookmarks and timezone
     * @request GET:/users/me
     * @secure
     * @response `200` `GetUserSettingsData`
     * @response `500` `ErrorResponseDto`
     */
    getUserSettings: (params: RequestParams = {}) =>
      this.http.request<GetUserSettingsData, GetUserSettingsError>({
        path: `/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Covers your linked accounts that you haven't hidden. CWL rounds still show even if the account has left the clan.
     *
     * @tags Users
     * @name GetWarTasks
     * @summary List your accounts' current wars
     * @request GET:/users/me/tasks/wars
     * @secure
     * @response `200` `GetWarTasksData`
     * @response `500` `ErrorResponseDto`
     */
    getWarTasks: (params: RequestParams = {}) =>
      this.http.request<GetWarTasksData, GetWarTasksError>({
        path: `/users/me/tasks/wars`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Empty outside raid weekends.
     *
     * @tags Users
     * @name GetCapitalRaidTasks
     * @summary List your accounts' capital raid attacks
     * @request GET:/users/me/tasks/capital-raids
     * @secure
     * @response `200` `GetCapitalRaidTasksData`
     * @response `500` `ErrorResponseDto`
     */
    getCapitalRaidTasks: (params: RequestParams = {}) =>
      this.http.request<GetCapitalRaidTasksData, GetCapitalRaidTasksError>({
        path: `/users/me/tasks/capital-raids`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Empty outside Clan Games.
     *
     * @tags Users
     * @name GetClanGamesTasks
     * @summary List your accounts' Clan Games points
     * @request GET:/users/me/tasks/clan-games
     * @secure
     * @response `200` `GetClanGamesTasksData`
     * @response `500` `ErrorResponseDto`
     */
    getClanGamesTasks: (params: RequestParams = {}) =>
      this.http.request<GetClanGamesTasksData, GetClanGamesTasksError>({
        path: `/users/me/tasks/clan-games`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetLegendTasks
     * @summary List your accounts' Legend League attacks today
     * @request GET:/users/me/tasks/legends
     * @secure
     * @response `200` `GetLegendTasksData`
     * @response `500` `ErrorResponseDto`
     */
    getLegendTasks: (params: RequestParams = {}) =>
      this.http.request<GetLegendTasksData, GetLegendTasksError>({
        path: `/users/me/tasks/legends`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetRankedTasks
     * @summary List your accounts' ranked attacks this week
     * @request GET:/users/me/tasks/ranked
     * @secure
     * @response `200` `GetRankedTasksData`
     * @response `500` `ErrorResponseDto`
     */
    getRankedTasks: (params: RequestParams = {}) =>
      this.http.request<GetRankedTasksData, GetRankedTasksError>({
        path: `/users/me/tasks/ranked`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SetDefaultClan
     * @summary Set your default clan
     * @request PUT:/users/me/clan
     * @secure
     * @response `200` `SetDefaultClanData`
     * @response `500` `ErrorResponseDto`
     */
    setDefaultClan: (data: ClanTagInput, params: RequestParams = {}) =>
      this.http.request<SetDefaultClanData, SetDefaultClanError>({
        path: `/users/me/clan`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ClearDefaultClan
     * @summary Clear your default clan
     * @request DELETE:/users/me/clan
     * @secure
     * @response `200` `ClearDefaultClanData`
     * @response `500` `ErrorResponseDto`
     */
    clearDefaultClan: (params: RequestParams = {}) =>
      this.http.request<ClearDefaultClanData, ClearDefaultClanError>({
        path: `/users/me/clan`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description You can bookmark up to 50 clans. Bookmarking a clan again updates its saved name.
     *
     * @tags Users
     * @name AddBookmark
     * @summary Bookmark a clan
     * @request POST:/users/me/bookmarks
     * @secure
     * @response `201` `AddBookmarkData`
     * @response `500` `ErrorResponseDto`
     */
    addBookmark: (data: ClanTagInput, params: RequestParams = {}) =>
      this.http.request<AddBookmarkData, AddBookmarkError>({
        path: `/users/me/bookmarks`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name RemoveBookmark
     * @summary Remove a clan bookmark
     * @request DELETE:/users/me/bookmarks/{clanTag}
     * @secure
     * @response `200` `RemoveBookmarkData`
     * @response `500` `ErrorResponseDto`
     */
    removeBookmark: ({ clanTag }: RemoveBookmarkParams, params: RequestParams = {}) =>
      this.http.request<RemoveBookmarkData, RemoveBookmarkError>({
        path: `/users/me/bookmarks/${clanTag}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name SetTimezone
     * @summary Set your timezone
     * @request PUT:/users/me/timezone
     * @secure
     * @response `200` `SetTimezoneData`
     * @response `500` `ErrorResponseDto`
     */
    setTimezone: (data: TimezoneInput, params: RequestParams = {}) =>
      this.http.request<SetTimezoneData, SetTimezoneError>({
        path: `/users/me/timezone`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name ClearTimezone
     * @summary Clear your timezone
     * @request DELETE:/users/me/timezone
     * @secure
     * @response `200` `ClearTimezoneData`
     * @response `500` `ErrorResponseDto`
     */
    clearTimezone: (params: RequestParams = {}) =>
      this.http.request<ClearTimezoneData, ClearTimezoneError>({
        path: `/users/me/timezone`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Only the exports you saved, even if someone else has linked the same account.
     *
     * @tags Users
     * @name GetGameExports
     * @summary List your saved game data exports
     * @request GET:/users/me/game-exports
     * @secure
     * @response `200` `GetGameExportsData`
     * @response `500` `ErrorResponseDto`
     */
    getGameExports: (params: RequestParams = {}) =>
      this.http.request<GetGameExportsData, GetGameExportsError>({
        path: `/users/me/game-exports`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description The account must be linked to you, and the export must be for the same player tag.
     *
     * @tags Users
     * @name SaveGameExport
     * @summary Save a game data export for an account
     * @request PUT:/users/me/game-exports/{playerTag}
     * @secure
     * @response `200` `SaveGameExportData`
     * @response `500` `ErrorResponseDto`
     */
    saveGameExport: (
      { playerTag }: SaveGameExportParams,
      data: GameExportInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveGameExportData, SaveGameExportError>({
        path: `/users/me/game-exports/${playerTag}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Users
     * @name RemoveGameExport
     * @summary Delete a saved game data export
     * @request DELETE:/users/me/game-exports/{playerTag}
     * @secure
     * @response `200` `RemoveGameExportData`
     * @response `500` `ErrorResponseDto`
     */
    removeGameExport: ({ playerTag }: RemoveGameExportParams, params: RequestParams = {}) =>
      this.http.request<RemoveGameExportData, RemoveGameExportError>({
        path: `/users/me/game-exports/${playerTag}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  };
  guilds = {
    /**
     * No description
     *
     * @tags Guilds
     * @name GetGuildClans
     * @summary List the server's clans by category
     * @request GET:/guilds/{guildId}/clans
     * @secure
     * @response `200` `GetGuildClansData`
     * @response `500` `ErrorResponseDto`
     */
    getGuildClans: ({ guildId }: GetGuildClansParams, params: RequestParams = {}) =>
      this.http.request<GetGuildClansData, GetGuildClansError>({
        path: `/guilds/${guildId}/clans`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Servers can add 5, 20 or 100 clans depending on their member count. Going past that, or adding a clan that's already in more than 10 other servers, needs proof that you lead the clan. Supporter servers skip this check.
     *
     * @tags Guilds
     * @name AddGuildClan
     * @summary Add a clan to the server
     * @request POST:/guilds/{guildId}/clans
     * @secure
     * @response `201` `AddGuildClanData`
     * @response `500` `ErrorResponseDto`
     */
    addGuildClan: (
      { guildId }: AddGuildClanParams,
      data: AddGuildClanInput,
      params: RequestParams = {}
    ) =>
      this.http.request<AddGuildClanData, AddGuildClanError>({
        path: `/guilds/${guildId}/clans`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send every category with its clans, in the order you want. Clans you put under `uncategorized` are taken out of their category.
     *
     * @tags Guilds
     * @name ReorderGuildClans
     * @summary Reorder the server's clans and categories
     * @request PATCH:/guilds/{guildId}/clans/reorder
     * @secure
     * @response `200` `ReorderGuildClansData`
     * @response `500` `ErrorResponseDto`
     */
    reorderGuildClans: (
      { guildId }: ReorderGuildClansParams,
      data: ReorderClanCategoriesInput,
      params: RequestParams = {}
    ) =>
      this.http.request<ReorderGuildClansData, ReorderGuildClansError>({
        path: `/guilds/${guildId}/clans/reorder`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description This also deletes the clan's logs and removes it from reminders. Any reminder left with no clans is deleted.
     *
     * @tags Guilds
     * @name RemoveGuildClan
     * @summary Remove a clan from the server
     * @request DELETE:/guilds/{guildId}/clans/{clanTag}
     * @secure
     * @response `200` `RemoveGuildClanData`
     * @response `500` `ErrorResponseDto`
     */
    removeGuildClan: ({ guildId, clanTag }: RemoveGuildClanParams, params: RequestParams = {}) =>
      this.http.request<RemoveGuildClanData, RemoveGuildClanError>({
        path: `/guilds/${guildId}/clans/${clanTag}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change. Each alias must be unique in the server, and a channel can only belong to one clan.
     *
     * @tags Guilds
     * @name UpdateGuildClan
     * @summary Update a clan's alias, short name and channels
     * @request PATCH:/guilds/{guildId}/clans/{clanTag}
     * @secure
     * @response `200` `UpdateGuildClanData`
     * @response `500` `ErrorResponseDto`
     */
    updateGuildClan: (
      { guildId, clanTag }: UpdateGuildClanParams,
      data: ClanSettingsInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateGuildClanData, UpdateGuildClanError>({
        path: `/guilds/${guildId}/clans/${clanTag}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name CreateClanCategory
     * @summary Create a clan category
     * @request POST:/guilds/{guildId}/categories
     * @secure
     * @response `201` `CreateClanCategoryData`
     * @response `500` `ErrorResponseDto`
     */
    createClanCategory: (
      { guildId }: CreateClanCategoryParams,
      data: ClanCategoryInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateClanCategoryData, CreateClanCategoryError>({
        path: `/guilds/${guildId}/categories`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name RenameClanCategory
     * @summary Rename a clan category
     * @request PATCH:/guilds/{guildId}/categories/{categoryId}
     * @secure
     * @response `200` `RenameClanCategoryData`
     * @response `500` `ErrorResponseDto`
     */
    renameClanCategory: (
      { guildId, categoryId }: RenameClanCategoryParams,
      data: ClanCategoryInput,
      params: RequestParams = {}
    ) =>
      this.http.request<RenameClanCategoryData, RenameClanCategoryError>({
        path: `/guilds/${guildId}/categories/${categoryId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Its clans aren't removed. They move to Uncategorized.
     *
     * @tags Guilds
     * @name DeleteClanCategory
     * @summary Delete a clan category
     * @request DELETE:/guilds/{guildId}/categories/{categoryId}
     * @secure
     * @response `200` `DeleteClanCategoryData`
     * @response `500` `ErrorResponseDto`
     */
    deleteClanCategory: (
      { guildId, categoryId }: DeleteClanCategoryParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteClanCategoryData, DeleteClanCategoryError>({
        path: `/guilds/${guildId}/categories/${categoryId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description A channel the bot can't post in still shows up if it has threads the bot can use, but the channel itself can't be picked.
     *
     * @tags Guilds
     * @name ListChannels
     * @summary List channels and threads the bot can post in
     * @request GET:/guilds/{guildId}/channels
     * @secure
     * @response `200` `ListChannelsData`
     * @response `500` `ErrorResponseDto`
     */
    listChannels: ({ guildId }: ListChannelsParams, params: RequestParams = {}) =>
      this.http.request<ListChannelsData, ListChannelsError>({
        path: `/guilds/${guildId}/channels`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name ListChannelCategories
     * @summary List the server's channel categories
     * @request GET:/guilds/{guildId}/channel-categories
     * @secure
     * @response `200` `ListChannelCategoriesData`
     * @response `500` `ErrorResponseDto`
     */
    listChannelCategories: ({ guildId }: ListChannelCategoriesParams, params: RequestParams = {}) =>
      this.http.request<ListChannelCategoriesData, ListChannelCategoriesError>({
        path: `/guilds/${guildId}/channel-categories`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name ListMentionableChannels
     * @summary List channels a message can mention
     * @request GET:/guilds/{guildId}/channels/mentionable
     * @secure
     * @response `200` `ListMentionableChannelsData`
     * @response `500` `ErrorResponseDto`
     */
    listMentionableChannels: (
      { guildId }: ListMentionableChannelsParams,
      params: RequestParams = {}
    ) =>
      this.http.request<ListMentionableChannelsData, ListMentionableChannelsError>({
        path: `/guilds/${guildId}/channels/mentionable`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Sorted from highest to lowest. @everyone and roles owned by bots or integrations are left out.
     *
     * @tags Guilds
     * @name ListRoles
     * @summary List the server's roles
     * @request GET:/guilds/{guildId}/roles
     * @secure
     * @response `200` `ListRolesData`
     * @response `500` `ErrorResponseDto`
     */
    listRoles: ({ guildId }: ListRolesParams, params: RequestParams = {}) =>
      this.http.request<ListRolesData, ListRolesError>({
        path: `/guilds/${guildId}/roles`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Includes the server's own emojis and the bot's emojis.
     *
     * @tags Guilds
     * @name ListEmojis
     * @summary List custom emojis the bot can use
     * @request GET:/guilds/{guildId}/emojis
     * @secure
     * @response `200` `ListEmojisData`
     * @response `500` `ErrorResponseDto`
     */
    listEmojis: ({ guildId }: ListEmojisParams, params: RequestParams = {}) =>
      this.http.request<ListEmojisData, ListEmojisError>({
        path: `/guilds/${guildId}/emojis`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name ListGuildClanLogs
     * @summary List every clan log in the server
     * @request GET:/guilds/{guildId}/clan-logs
     * @secure
     * @response `200` `ListGuildClanLogsData`
     * @response `500` `ErrorResponseDto`
     */
    listGuildClanLogs: ({ guildId }: ListGuildClanLogsParams, params: RequestParams = {}) =>
      this.http.request<ListGuildClanLogsData, ListGuildClanLogsError>({
        path: `/guilds/${guildId}/clan-logs`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Shows how many clans can have logs in this server, and which clans already count toward that limit.
     *
     * @tags Guilds
     * @name GetClanLogLimit
     * @summary Get the server's clan log limit
     * @request GET:/guilds/{guildId}/clan-logs/limit
     * @secure
     * @response `200` `GetClanLogLimitData`
     * @response `500` `ErrorResponseDto`
     */
    getClanLogLimit: ({ guildId }: GetClanLogLimitParams, params: RequestParams = {}) =>
      this.http.request<GetClanLogLimitData, GetClanLogLimitError>({
        path: `/guilds/${guildId}/clan-logs/limit`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetClanEmbed
     * @summary Get a clan's embed
     * @request GET:/guilds/{guildId}/clans/{clanTag}/embed
     * @secure
     * @response `200` `GetClanEmbedData`
     * @response `500` `ErrorResponseDto`
     */
    getClanEmbed: ({ guildId, clanTag }: GetClanEmbedParams, params: RequestParams = {}) =>
      this.http.request<GetClanEmbedData, GetClanEmbedError>({
        path: `/guilds/${guildId}/clans/${clanTag}/embed`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description The bot posts or updates the message the next time it refreshes. A clan's first log or embed counts toward the server's clan log limit.
     *
     * @tags Guilds
     * @name SaveClanEmbed
     * @summary Create or update a clan's embed
     * @request PUT:/guilds/{guildId}/clans/{clanTag}/embed
     * @secure
     * @response `200` `SaveClanEmbedData`
     * @response `500` `ErrorResponseDto`
     */
    saveClanEmbed: (
      { guildId, clanTag }: SaveClanEmbedParams,
      data: ClanEmbedInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveClanEmbedData, SaveClanEmbedError>({
        path: `/guilds/${guildId}/clans/${clanTag}/embed`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description The message already posted stays in the channel, but the bot stops updating it.
     *
     * @tags Guilds
     * @name DeleteClanEmbed
     * @summary Delete a clan's embed
     * @request DELETE:/guilds/{guildId}/clans/{clanTag}/embed
     * @secure
     * @response `204` `DeleteClanEmbedData`
     * @response `500` `ErrorResponseDto`
     */
    deleteClanEmbed: ({ guildId, clanTag }: DeleteClanEmbedParams, params: RequestParams = {}) =>
      this.http.request<DeleteClanEmbedData, DeleteClanEmbedError>({
        path: `/guilds/${guildId}/clans/${clanTag}/embed`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name ListClanLogs
     * @summary List a clan's logs
     * @request GET:/guilds/{guildId}/clans/{clanTag}/logs
     * @secure
     * @response `200` `ListClanLogsData`
     * @response `500` `ErrorResponseDto`
     */
    listClanLogs: ({ guildId, clanTag }: ListClanLogsParams, params: RequestParams = {}) =>
      this.http.request<ListClanLogsData, ListClanLogsError>({
        path: `/guilds/${guildId}/clans/${clanTag}/logs`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description A clan's first log counts toward the server's clan log limit. A new log starts by posting the last 30 minutes of activity.
     *
     * @tags Guilds
     * @name SaveClanLog
     * @summary Create or update a clan log
     * @request PUT:/guilds/{guildId}/clans/{clanTag}/logs/{logType}
     * @secure
     * @response `200` `SaveClanLogData`
     * @response `500` `ErrorResponseDto`
     */
    saveClanLog: (
      { guildId, clanTag, logType }: SaveClanLogParams,
      data: ClanLogInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveClanLogData, SaveClanLogError>({
        path: `/guilds/${guildId}/clans/${clanTag}/logs/${logType}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name DeleteClanLog
     * @summary Delete a clan log
     * @request DELETE:/guilds/{guildId}/clans/{clanTag}/logs/{logType}
     * @secure
     * @response `204` `DeleteClanLogData`
     * @response `500` `ErrorResponseDto`
     */
    deleteClanLog: (
      { guildId, clanTag, logType }: DeleteClanLogParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteClanLogData, DeleteClanLogError>({
        path: `/guilds/${guildId}/clans/${clanTag}/logs/${logType}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetAutoRoles
     * @summary Get the server's auto-role settings
     * @request GET:/guilds/{guildId}/auto-roles
     * @secure
     * @response `200` `GetAutoRolesData`
     * @response `500` `ErrorResponseDto`
     */
    getAutoRoles: ({ guildId }: GetAutoRolesParams, params: RequestParams = {}) =>
      this.http.request<GetAutoRolesData, GetAutoRolesError>({
        path: `/guilds/${guildId}/auto-roles`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change. Roles must be below the bot's highest role, and the server needs at least one clan first.
     *
     * @tags Guilds
     * @name UpdateAutoRoles
     * @summary Update the server-wide auto-role settings
     * @request PATCH:/guilds/{guildId}/auto-roles
     * @secure
     * @response `200` `UpdateAutoRolesData`
     * @response `500` `ErrorResponseDto`
     */
    updateAutoRoles: (
      { guildId }: UpdateAutoRolesParams,
      data: AutoRolesInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateAutoRolesData, UpdateAutoRolesError>({
        path: `/guilds/${guildId}/auto-roles`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description This replaces all of the clan's roles, so any role you leave out is cleared. An in-war role can only be used by one clan.
     *
     * @tags Guilds
     * @name SaveClanAutoRoles
     * @summary Set a clan's auto-roles
     * @request PUT:/guilds/{guildId}/auto-roles/clans/{clanTag}
     * @secure
     * @response `200` `SaveClanAutoRolesData`
     * @response `500` `ErrorResponseDto`
     */
    saveClanAutoRoles: (
      { guildId, clanTag }: SaveClanAutoRolesParams,
      data: AutoRoleClanInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveClanAutoRolesData, SaveClanAutoRolesError>({
        path: `/guilds/${guildId}/auto-roles/clans/${clanTag}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Also shows how many active flags the server has and how many it's allowed. Supporter servers have no limit.
     *
     * @tags Guilds
     * @name ListFlags
     * @summary List the server's active flags
     * @request GET:/guilds/{guildId}/flags
     * @secure
     * @response `200` `ListFlagsData`
     * @response `500` `ErrorResponseDto`
     */
    listFlags: ({ guildId, ...query }: ListFlagsParams, params: RequestParams = {}) =>
      this.http.request<ListFlagsData, ListFlagsError>({
        path: `/guilds/${guildId}/flags`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Each player found gets their own flag. Servers without a subscription can have up to 1,000 active flags.
     *
     * @tags Guilds
     * @name CreateFlags
     * @summary Flag one or more players
     * @request POST:/guilds/{guildId}/flags
     * @secure
     * @response `201` `CreateFlagsData`
     * @response `500` `ErrorResponseDto`
     */
    createFlags: ({ guildId }: CreateFlagsParams, data: FlagInput, params: RequestParams = {}) =>
      this.http.request<CreateFlagsData, CreateFlagsError>({
        path: `/guilds/${guildId}/flags`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name DeleteFlag
     * @summary Delete an active flag
     * @request DELETE:/guilds/{guildId}/flags/{flagId}
     * @secure
     * @response `204` `DeleteFlagData`
     * @response `500` `ErrorResponseDto`
     */
    deleteFlag: ({ guildId, flagId }: DeleteFlagParams, params: RequestParams = {}) =>
      this.http.request<DeleteFlagData, DeleteFlagError>({
        path: `/guilds/${guildId}/flags/${flagId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * @description Finds members whose username or server nickname starts with what you type. Returns up to 50.
     *
     * @tags Guilds
     * @name SearchMembers
     * @summary Search the server's members
     * @request GET:/guilds/{guildId}/members/list
     * @secure
     * @response `200` `SearchMembersData`
     * @response `500` `ErrorResponseDto`
     */
    searchMembers: ({ guildId, ...query }: SearchMembersParams, params: RequestParams = {}) =>
      this.http.request<SearchMembersData, SearchMembersError>({
        path: `/guilds/${guildId}/members/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetServerLogs
     * @summary Get the server-wide log settings
     * @request GET:/guilds/{guildId}/server-logs
     * @secure
     * @response `200` `GetServerLogsData`
     * @response `500` `ErrorResponseDto`
     */
    getServerLogs: ({ guildId }: GetServerLogsParams, params: RequestParams = {}) =>
      this.http.request<GetServerLogsData, GetServerLogsError>({
        path: `/guilds/${guildId}/server-logs`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name SaveFlagAlertLog
     * @summary Set up the flag alert log
     * @request PUT:/guilds/{guildId}/server-logs/flag-alert
     * @secure
     * @response `200` `SaveFlagAlertLogData`
     * @response `500` `ErrorResponseDto`
     */
    saveFlagAlertLog: (
      { guildId }: SaveFlagAlertLogParams,
      data: FlagAlertLogInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveFlagAlertLogData, SaveFlagAlertLogError>({
        path: `/guilds/${guildId}/server-logs/flag-alert`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name DeleteFlagAlertLog
     * @summary Turn off the flag alert log
     * @request DELETE:/guilds/{guildId}/server-logs/flag-alert
     * @secure
     * @response `200` `DeleteFlagAlertLogData`
     * @response `500` `ErrorResponseDto`
     */
    deleteFlagAlertLog: ({ guildId }: DeleteFlagAlertLogParams, params: RequestParams = {}) =>
      this.http.request<DeleteFlagAlertLogData, DeleteFlagAlertLogError>({
        path: `/guilds/${guildId}/server-logs/flag-alert`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name SaveRosterChangelog
     * @summary Set up the roster changelog
     * @request PUT:/guilds/{guildId}/server-logs/roster-changelog
     * @secure
     * @response `200` `SaveRosterChangelogData`
     * @response `500` `ErrorResponseDto`
     */
    saveRosterChangelog: (
      { guildId }: SaveRosterChangelogParams,
      data: ServerLogChannelInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveRosterChangelogData, SaveRosterChangelogError>({
        path: `/guilds/${guildId}/server-logs/roster-changelog`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name DeleteRosterChangelog
     * @summary Turn off the roster changelog
     * @request DELETE:/guilds/{guildId}/server-logs/roster-changelog
     * @secure
     * @response `200` `DeleteRosterChangelogData`
     * @response `500` `ErrorResponseDto`
     */
    deleteRosterChangelog: ({ guildId }: DeleteRosterChangelogParams, params: RequestParams = {}) =>
      this.http.request<DeleteRosterChangelogData, DeleteRosterChangelogError>({
        path: `/guilds/${guildId}/server-logs/roster-changelog`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name SaveMaintenanceLog
     * @summary Set up the maintenance log
     * @request PUT:/guilds/{guildId}/server-logs/maintenance
     * @secure
     * @response `200` `SaveMaintenanceLogData`
     * @response `500` `ErrorResponseDto`
     */
    saveMaintenanceLog: (
      { guildId }: SaveMaintenanceLogParams,
      data: MaintenanceLogInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveMaintenanceLogData, SaveMaintenanceLogError>({
        path: `/guilds/${guildId}/server-logs/maintenance`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name DeleteMaintenanceLog
     * @summary Turn off the maintenance log
     * @request DELETE:/guilds/{guildId}/server-logs/maintenance
     * @secure
     * @response `200` `DeleteMaintenanceLogData`
     * @response `500` `ErrorResponseDto`
     */
    deleteMaintenanceLog: ({ guildId }: DeleteMaintenanceLogParams, params: RequestParams = {}) =>
      this.http.request<DeleteMaintenanceLogData, DeleteMaintenanceLogError>({
        path: `/guilds/${guildId}/server-logs/maintenance`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Saves the message and turns it on.
     *
     * @tags Guilds
     * @name SaveWelcomeLog
     * @summary Set up the welcome message
     * @request PUT:/guilds/{guildId}/server-logs/welcome
     * @secure
     * @response `200` `SaveWelcomeLogData`
     * @response `500` `ErrorResponseDto`
     */
    saveWelcomeLog: (
      { guildId }: SaveWelcomeLogParams,
      data: WelcomeLogInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveWelcomeLogData, SaveWelcomeLogError>({
        path: `/guilds/${guildId}/server-logs/welcome`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description The message is saved, so you can turn it back on later.
     *
     * @tags Guilds
     * @name DeleteWelcomeLog
     * @summary Turn off the welcome message
     * @request DELETE:/guilds/{guildId}/server-logs/welcome
     * @secure
     * @response `200` `DeleteWelcomeLogData`
     * @response `500` `ErrorResponseDto`
     */
    deleteWelcomeLog: ({ guildId }: DeleteWelcomeLogParams, params: RequestParams = {}) =>
      this.http.request<DeleteWelcomeLogData, DeleteWelcomeLogError>({
        path: `/guilds/${guildId}/server-logs/welcome`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetButtonMessages
     * @summary Get the server's button messages
     * @request GET:/guilds/{guildId}/buttons
     * @secure
     * @response `200` `GetButtonMessagesData`
     * @response `500` `ErrorResponseDto`
     */
    getButtonMessages: ({ guildId }: GetButtonMessagesParams, params: RequestParams = {}) =>
      this.http.request<GetButtonMessagesData, GetButtonMessagesError>({
        path: `/guilds/${guildId}/buttons`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Changes what `/setup buttons` posts. Messages that were already posted keep their old look.
     *
     * @tags Guilds
     * @name UpdateButtonMessage
     * @summary Update a button message
     * @request PUT:/guilds/{guildId}/buttons/{buttonType}
     * @secure
     * @response `200` `UpdateButtonMessageData`
     * @response `500` `ErrorResponseDto`
     */
    updateButtonMessage: (
      { guildId, buttonType }: UpdateButtonMessageParams,
      data: ButtonMessageInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateButtonMessageData, UpdateButtonMessageError>({
        path: `/guilds/${guildId}/buttons/${buttonType}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetManagerRoles
     * @summary Get the server's manager roles
     * @request GET:/guilds/{guildId}/managers
     * @secure
     * @response `200` `GetManagerRolesData`
     * @response `500` `ErrorResponseDto`
     */
    getManagerRoles: ({ guildId }: GetManagerRolesParams, params: RequestParams = {}) =>
      this.http.request<GetManagerRolesData, GetManagerRolesError>({
        path: `/guilds/${guildId}/managers`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the lists you want to change. Sending an empty list clears it.
     *
     * @tags Guilds
     * @name UpdateManagerRoles
     * @summary Update the server's manager roles
     * @request PATCH:/guilds/{guildId}/managers
     * @secure
     * @response `200` `UpdateManagerRolesData`
     * @response `500` `ErrorResponseDto`
     */
    updateManagerRoles: (
      { guildId }: UpdateManagerRolesParams,
      data: ManagerRolesInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateManagerRolesData, UpdateManagerRolesError>({
        path: `/guilds/${guildId}/managers`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetGuildConfig
     * @summary Get the server's embed color, webhook limit and subscription
     * @request GET:/guilds/{guildId}/config
     * @secure
     * @response `200` `GetGuildConfigData`
     * @response `500` `ErrorResponseDto`
     */
    getGuildConfig: ({ guildId }: GetGuildConfigParams, params: RequestParams = {}) =>
      this.http.request<GetGuildConfigData, GetGuildConfigError>({
        path: `/guilds/${guildId}/config`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change. Set the color to null to go back to the default.
     *
     * @tags Guilds
     * @name UpdateGuildConfig
     * @summary Update the server's embed color or webhook limit
     * @request PATCH:/guilds/{guildId}/config
     * @secure
     * @response `200` `UpdateGuildConfigData`
     * @response `500` `ErrorResponseDto`
     */
    updateGuildConfig: (
      { guildId }: UpdateGuildConfigParams,
      data: ServerConfigInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateGuildConfigData, UpdateGuildConfigError>({
        path: `/guilds/${guildId}/config`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Guilds
     * @name GetGuildBetaStatus
     * @summary Check whether the server is in the beta
     * @request GET:/guilds/{guildId}/beta
     * @secure
     * @response `200` `GetGuildBetaStatusData`
     * @response `500` `ErrorResponseDto`
     */
    getGuildBetaStatus: ({ guildId }: GetGuildBetaStatusParams, params: RequestParams = {}) =>
      this.http.request<GetGuildBetaStatusData, GetGuildBetaStatusError>({
        path: `/guilds/${guildId}/beta`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  };
  tickets = {
    /**
     * No description
     *
     * @tags Tickets
     * @name GetTicketSettings
     * @summary Get the server's ticket panels and saved replies
     * @request GET:/tickets/{guildId}
     * @secure
     * @response `200` `GetTicketSettingsData`
     * @response `500` `ErrorResponseDto`
     */
    getTicketSettings: ({ guildId }: GetTicketSettingsParams, params: RequestParams = {}) =>
      this.http.request<GetTicketSettingsData, GetTicketSettingsError>({
        path: `/tickets/${guildId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Newest first, 25 per page. To get the next page, pass the `nextCursor` from the response as `before`.
     *
     * @tags Tickets
     * @name ListTickets
     * @summary List tickets opened in the server
     * @request GET:/tickets/{guildId}/list
     * @secure
     * @response `200` `ListTicketsData`
     * @response `500` `ErrorResponseDto`
     */
    listTickets: ({ guildId, ...query }: ListTicketsParams, params: RequestParams = {}) =>
      this.http.request<ListTicketsData, ListTicketsError>({
        path: `/tickets/${guildId}/list`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Does the same as the Close button in Discord. The last 100 messages are saved to the ticket log, and the channel is deleted.
     *
     * @tags Tickets
     * @name CloseTicket
     * @summary Close an opened ticket
     * @request POST:/tickets/{guildId}/{ticketId}/close
     * @secure
     * @response `204` `CloseTicketData`
     * @response `500` `ErrorResponseDto`
     */
    closeTicket: ({ guildId, ticketId }: CloseTicketParams, params: RequestParams = {}) =>
      this.http.request<CloseTicketData, CloseTicketError>({
        path: `/tickets/${guildId}/${ticketId}/close`,
        method: 'POST',
        secure: true,
        ...params
      }),

    /**
     * @description The panel starts with default settings and one General ticket type. Each panel in a server needs a different name.
     *
     * @tags Tickets
     * @name CreateTicketPanel
     * @summary Create a ticket panel
     * @request POST:/tickets/{guildId}/panels
     * @secure
     * @response `201` `CreateTicketPanelData`
     * @response `500` `ErrorResponseDto`
     */
    createTicketPanel: (
      { guildId }: CreateTicketPanelParams,
      data: CreateTicketPanelInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateTicketPanelData, CreateTicketPanelError>({
        path: `/tickets/${guildId}/panels`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change. If the panel is already posted in Discord, post it again to show the changes.
     *
     * @tags Tickets
     * @name UpdateTicketPanel
     * @summary Update a ticket panel
     * @request PATCH:/tickets/{guildId}/panels/{panelId}
     * @secure
     * @response `200` `UpdateTicketPanelData`
     * @response `500` `ErrorResponseDto`
     */
    updateTicketPanel: (
      { guildId, panelId }: UpdateTicketPanelParams,
      data: TicketPanelInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateTicketPanelData, UpdateTicketPanelError>({
        path: `/tickets/${guildId}/panels/${panelId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Tickets already opened from it aren't affected. Its message in Discord stops opening new tickets.
     *
     * @tags Tickets
     * @name DeleteTicketPanel
     * @summary Delete a ticket panel
     * @request DELETE:/tickets/{guildId}/panels/{panelId}
     * @secure
     * @response `200` `DeleteTicketPanelData`
     * @response `500` `ErrorResponseDto`
     */
    deleteTicketPanel: (
      { guildId, panelId }: DeleteTicketPanelParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteTicketPanelData, DeleteTicketPanelError>({
        path: `/tickets/${guildId}/panels/${panelId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description A panel can have up to 25 ticket types.
     *
     * @tags Tickets
     * @name AddTicketType
     * @summary Add a ticket type to a panel
     * @request POST:/tickets/{guildId}/panels/{panelId}/types
     * @secure
     * @response `201` `AddTicketTypeData`
     * @response `500` `ErrorResponseDto`
     */
    addTicketType: (
      { guildId, panelId }: AddTicketTypeParams,
      data: CreateTicketTypeInput,
      params: RequestParams = {}
    ) =>
      this.http.request<AddTicketTypeData, AddTicketTypeError>({
        path: `/tickets/${guildId}/panels/${panelId}/types`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send all of the panel's ticket type IDs, each once, in the order you want.
     *
     * @tags Tickets
     * @name ReorderTicketTypes
     * @summary Reorder a panel's ticket types
     * @request PUT:/tickets/{guildId}/panels/{panelId}/types/order
     * @secure
     * @response `200` `ReorderTicketTypesData`
     * @response `500` `ErrorResponseDto`
     */
    reorderTicketTypes: (
      { guildId, panelId }: ReorderTicketTypesParams,
      data: ReorderTicketTypesInput,
      params: RequestParams = {}
    ) =>
      this.http.request<ReorderTicketTypesData, ReorderTicketTypesError>({
        path: `/tickets/${guildId}/panels/${panelId}/types/order`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description You only need to send the fields you want to change.
     *
     * @tags Tickets
     * @name UpdateTicketType
     * @summary Update a ticket type
     * @request PATCH:/tickets/{guildId}/panels/{panelId}/types/{typeId}
     * @secure
     * @response `200` `UpdateTicketTypeData`
     * @response `500` `ErrorResponseDto`
     */
    updateTicketType: (
      { guildId, panelId, typeId }: UpdateTicketTypeParams,
      data: TicketTypeInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateTicketTypeData, UpdateTicketTypeError>({
        path: `/tickets/${guildId}/panels/${panelId}/types/${typeId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Tickets already opened with this type stay open.
     *
     * @tags Tickets
     * @name DeleteTicketType
     * @summary Delete a ticket type
     * @request DELETE:/tickets/{guildId}/panels/{panelId}/types/{typeId}
     * @secure
     * @response `200` `DeleteTicketTypeData`
     * @response `500` `ErrorResponseDto`
     */
    deleteTicketType: (
      { guildId, panelId, typeId }: DeleteTicketTypeParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteTicketTypeData, DeleteTicketTypeError>({
        path: `/tickets/${guildId}/panels/${panelId}/types/${typeId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Staff can use these replies in any ticket in the server. You can save up to 25, and each needs a different name.
     *
     * @tags Tickets
     * @name ReplaceSavedReplies
     * @summary Replace the server's saved ticket replies
     * @request PUT:/tickets/{guildId}/saved-replies
     * @secure
     * @response `200` `ReplaceSavedRepliesData`
     * @response `500` `ErrorResponseDto`
     */
    replaceSavedReplies: (
      { guildId }: ReplaceSavedRepliesParams,
      data: TicketSavedRepliesInput,
      params: RequestParams = {}
    ) =>
      this.http.request<ReplaceSavedRepliesData, ReplaceSavedRepliesError>({
        path: `/tickets/${guildId}/saved-replies`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  };
  reminders = {
    /**
     * @description Includes clan war, capital raid and Clan Games reminders, with when each one will go off next.
     *
     * @tags Reminders
     * @name ListReminders
     * @summary List the server's reminders
     * @request GET:/reminders/{guildId}
     * @secure
     * @response `200` `ListRemindersData`
     * @response `500` `ErrorResponseDto`
     */
    listReminders: ({ guildId }: ListRemindersParams, params: RequestParams = {}) =>
      this.http.request<ListRemindersData, ListRemindersError>({
        path: `/reminders/${guildId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Reminders
     * @name GetReminderPings
     * @summary Get the roles that control reminder pings
     * @request GET:/reminders/{guildId}/pings
     * @secure
     * @response `200` `GetReminderPingsData`
     * @response `500` `ErrorResponseDto`
     */
    getReminderPings: ({ guildId }: GetReminderPingsParams, params: RequestParams = {}) =>
      this.http.request<GetReminderPingsData, GetReminderPingsError>({
        path: `/reminders/${guildId}/pings`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Sending an empty list clears the setting. Members with these roles are saved right away, and the bot keeps the list up to date.
     *
     * @tags Reminders
     * @name SaveReminderPings
     * @summary Set the roles that control reminder pings
     * @request PUT:/reminders/{guildId}/pings
     * @secure
     * @response `200` `SaveReminderPingsData`
     * @response `500` `ErrorResponseDto`
     */
    saveReminderPings: (
      { guildId }: SaveReminderPingsParams,
      data: ReminderPingsInput,
      params: RequestParams = {}
    ) =>
      this.http.request<SaveReminderPingsData, SaveReminderPingsError>({
        path: `/reminders/${guildId}/pings`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Set `duration` to how long before the war ends the reminder should go off, in milliseconds. It can be up to 48 hours, in 15-minute steps. A server can have 25 reminders of each type, or 5 per clan if that's more. Supporter servers have no limit.
     *
     * @tags Reminders
     * @name CreateClanWarReminder
     * @summary Create a clan war reminder
     * @request POST:/reminders/{guildId}/clan-wars
     * @secure
     * @response `201` `CreateClanWarReminderData`
     * @response `500` `ErrorResponseDto`
     */
    createClanWarReminder: (
      { guildId }: CreateClanWarReminderParams,
      data: ClanWarReminderInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateClanWarReminderData, CreateClanWarReminderError>({
        path: `/reminders/${guildId}/clan-wars`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send the whole reminder, the same as when you created it. Moving it to another channel removes its thread.
     *
     * @tags Reminders
     * @name UpdateClanWarReminder
     * @summary Update a clan war reminder
     * @request PUT:/reminders/{guildId}/clan-wars/{reminderId}
     * @secure
     * @response `200` `UpdateClanWarReminderData`
     * @response `500` `ErrorResponseDto`
     */
    updateClanWarReminder: (
      { guildId, reminderId }: UpdateClanWarReminderParams,
      data: ClanWarReminderInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateClanWarReminderData, UpdateClanWarReminderError>({
        path: `/reminders/${guildId}/clan-wars/${reminderId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Reminders
     * @name DeleteClanWarReminder
     * @summary Delete a clan war reminder
     * @request DELETE:/reminders/{guildId}/clan-wars/{reminderId}
     * @secure
     * @response `204` `DeleteClanWarReminderData`
     * @response `500` `ErrorResponseDto`
     */
    deleteClanWarReminder: (
      { guildId, reminderId }: DeleteClanWarReminderParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteClanWarReminderData, DeleteClanWarReminderError>({
        path: `/reminders/${guildId}/clan-wars/${reminderId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * @description Set `duration` to how long before the raid weekend ends the reminder should go off, in milliseconds. It can be up to 3 days, in 15-minute steps. A server can have 25 reminders of each type, or 5 per clan if that's more. Supporter servers have no limit.
     *
     * @tags Reminders
     * @name CreateCapitalRaidReminder
     * @summary Create a capital raid reminder
     * @request POST:/reminders/{guildId}/capital-raids
     * @secure
     * @response `201` `CreateCapitalRaidReminderData`
     * @response `500` `ErrorResponseDto`
     */
    createCapitalRaidReminder: (
      { guildId }: CreateCapitalRaidReminderParams,
      data: CapitalRaidReminderInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateCapitalRaidReminderData, CreateCapitalRaidReminderError>({
        path: `/reminders/${guildId}/capital-raids`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send the whole reminder, the same as when you created it. Moving it to another channel removes its thread.
     *
     * @tags Reminders
     * @name UpdateCapitalRaidReminder
     * @summary Update a capital raid reminder
     * @request PUT:/reminders/{guildId}/capital-raids/{reminderId}
     * @secure
     * @response `200` `UpdateCapitalRaidReminderData`
     * @response `500` `ErrorResponseDto`
     */
    updateCapitalRaidReminder: (
      { guildId, reminderId }: UpdateCapitalRaidReminderParams,
      data: CapitalRaidReminderInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateCapitalRaidReminderData, UpdateCapitalRaidReminderError>({
        path: `/reminders/${guildId}/capital-raids/${reminderId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Reminders
     * @name DeleteCapitalRaidReminder
     * @summary Delete a capital raid reminder
     * @request DELETE:/reminders/{guildId}/capital-raids/{reminderId}
     * @secure
     * @response `204` `DeleteCapitalRaidReminderData`
     * @response `500` `ErrorResponseDto`
     */
    deleteCapitalRaidReminder: (
      { guildId, reminderId }: DeleteCapitalRaidReminderParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteCapitalRaidReminderData, DeleteCapitalRaidReminderError>({
        path: `/reminders/${guildId}/capital-raids/${reminderId}`,
        method: 'DELETE',
        secure: true,
        ...params
      }),

    /**
     * @description Set `duration` to how long before Clan Games end the reminder should go off, in milliseconds. It can be up to 6 days, in 15-minute steps. A server can have 25 reminders of each type, or 5 per clan if that's more. Supporter servers have no limit.
     *
     * @tags Reminders
     * @name CreateClanGamesReminder
     * @summary Create a Clan Games reminder
     * @request POST:/reminders/{guildId}/clan-games
     * @secure
     * @response `201` `CreateClanGamesReminderData`
     * @response `500` `ErrorResponseDto`
     */
    createClanGamesReminder: (
      { guildId }: CreateClanGamesReminderParams,
      data: ClanGamesReminderInput,
      params: RequestParams = {}
    ) =>
      this.http.request<CreateClanGamesReminderData, CreateClanGamesReminderError>({
        path: `/reminders/${guildId}/clan-games`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Send the whole reminder, the same as when you created it. Moving it to another channel removes its thread.
     *
     * @tags Reminders
     * @name UpdateClanGamesReminder
     * @summary Update a Clan Games reminder
     * @request PUT:/reminders/{guildId}/clan-games/{reminderId}
     * @secure
     * @response `200` `UpdateClanGamesReminderData`
     * @response `500` `ErrorResponseDto`
     */
    updateClanGamesReminder: (
      { guildId, reminderId }: UpdateClanGamesReminderParams,
      data: ClanGamesReminderInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateClanGamesReminderData, UpdateClanGamesReminderError>({
        path: `/reminders/${guildId}/clan-games/${reminderId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Reminders
     * @name DeleteClanGamesReminder
     * @summary Delete a Clan Games reminder
     * @request DELETE:/reminders/{guildId}/clan-games/{reminderId}
     * @secure
     * @response `204` `DeleteClanGamesReminderData`
     * @response `500` `ErrorResponseDto`
     */
    deleteClanGamesReminder: (
      { guildId, reminderId }: DeleteClanGamesReminderParams,
      params: RequestParams = {}
    ) =>
      this.http.request<DeleteClanGamesReminderData, DeleteClanGamesReminderError>({
        path: `/reminders/${guildId}/clan-games/${reminderId}`,
        method: 'DELETE',
        secure: true,
        ...params
      })
  };
  exports = {
    /**
     * @description For a scheduled export, the sheet already made for the same server and clans is returned instead of a new one.
     *
     * @tags Internal
     * @name ExportClanMembers
     * @summary Export clan members to a Google Sheet
     * @request POST:/exports/members
     * @response `201` `ExportClanMembersData`
     * @response `500` `ErrorResponseDto`
     */
    exportClanMembers: (data: ExportMembersInput, params: RequestParams = {}) =>
      this.http.request<ExportClanMembersData, ExportClanMembersError>({
        path: `/exports/members`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  };
  admin = {
    /**
     * No description
     *
     * @tags Admin
     * @name ListBetaGuilds
     * @summary List beta servers
     * @request GET:/admin/beta-guilds
     * @secure
     * @response `200` `ListBetaGuildsData`
     * @response `500` `ErrorResponseDto`
     */
    listBetaGuilds: (params: RequestParams = {}) =>
      this.http.request<ListBetaGuildsData, ListBetaGuildsError>({
        path: `/admin/beta-guilds`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Servers that are already in the beta are left as they are, with their original note.
     *
     * @tags Admin
     * @name AddBetaGuilds
     * @summary Add servers to the beta
     * @request POST:/admin/beta-guilds
     * @secure
     * @response `201` `AddBetaGuildsData`
     * @response `500` `ErrorResponseDto`
     */
    addBetaGuilds: (data: AddBetaGuildsInput, params: RequestParams = {}) =>
      this.http.request<AddBetaGuildsData, AddBetaGuildsError>({
        path: `/admin/beta-guilds`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name RemoveBetaGuild
     * @summary Remove a server from the beta
     * @request DELETE:/admin/beta-guilds/{guildId}
     * @secure
     * @response `200` `RemoveBetaGuildData`
     * @response `500` `ErrorResponseDto`
     */
    removeBetaGuild: ({ guildId }: RemoveBetaGuildParams, params: RequestParams = {}) =>
      this.http.request<RemoveBetaGuildData, RemoveBetaGuildError>({
        path: `/admin/beta-guilds/${guildId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name ListSubscribers
     * @summary List Patreon and manual subscriptions
     * @request GET:/admin/subscribers
     * @secure
     * @response `200` `ListSubscribersData`
     * @response `500` `ErrorResponseDto`
     */
    listSubscribers: (params: RequestParams = {}) =>
      this.http.request<ListSubscribersData, ListSubscribersError>({
        path: `/admin/subscribers`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description For payments an admin has checked by hand, such as Ko-fi or PayPal. A user can only have one active manual subscription.
     *
     * @tags Admin
     * @name GrantSubscription
     * @summary Grant a subscription by hand
     * @request POST:/admin/subscribers
     * @secure
     * @response `201` `GrantSubscriptionData`
     * @response `500` `ErrorResponseDto`
     */
    grantSubscription: (data: GrantSubscriptionInput, params: RequestParams = {}) =>
      this.http.request<GrantSubscriptionData, GrantSubscriptionError>({
        path: `/admin/subscribers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Use it to extend, renew, change the plan of or add servers to a manual subscription. Patreon subscriptions can't be changed here.
     *
     * @tags Admin
     * @name UpdateSubscription
     * @summary Update a manual subscription
     * @request PATCH:/admin/subscribers/{id}
     * @secure
     * @response `200` `UpdateSubscriptionData`
     * @response `500` `ErrorResponseDto`
     */
    updateSubscription: (
      { id }: UpdateSubscriptionParams,
      data: UpdateSubscriptionInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateSubscriptionData, UpdateSubscriptionError>({
        path: `/admin/subscribers/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name ListDevelopers
     * @summary List developer accounts
     * @request GET:/admin/developers
     * @secure
     * @response `200` `ListDevelopersData`
     * @response `500` `ErrorResponseDto`
     */
    listDevelopers: (params: RequestParams = {}) =>
      this.http.request<ListDevelopersData, ListDevelopersError>({
        path: `/admin/developers`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description The response includes the new account's passkey. Save it, because it's only shown once. Admin accounts can't be created here.
     *
     * @tags Admin
     * @name AddDeveloper
     * @summary Add a developer account
     * @request POST:/admin/developers
     * @secure
     * @response `201` `AddDeveloperData`
     * @response `500` `ErrorResponseDto`
     */
    addDeveloper: (data: AddDeveloperInput, params: RequestParams = {}) =>
      this.http.request<AddDeveloperData, AddDeveloperError>({
        path: `/admin/developers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description The new roles take effect the next time the developer logs in. Admin accounts can't be changed.
     *
     * @tags Admin
     * @name UpdateDeveloperRoles
     * @summary Change a developer's roles
     * @request PATCH:/admin/developers/{userId}
     * @secure
     * @response `200` `UpdateDeveloperRolesData`
     * @response `500` `ErrorResponseDto`
     */
    updateDeveloperRoles: (
      { userId }: UpdateDeveloperRolesParams,
      data: EditDeveloperInput,
      params: RequestParams = {}
    ) =>
      this.http.request<UpdateDeveloperRolesData, UpdateDeveloperRolesError>({
        path: `/admin/developers/${userId}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description The passkey stops working right away. Tokens already issued keep working until they expire, which takes up to 2 hours. Admin accounts can't be revoked.
     *
     * @tags Admin
     * @name RevokeDeveloper
     * @summary Revoke a developer account
     * @request DELETE:/admin/developers/{userId}
     * @secure
     * @response `200` `RevokeDeveloperData`
     * @response `500` `ErrorResponseDto`
     */
    revokeDeveloper: ({ userId }: RevokeDeveloperParams, params: RequestParams = {}) =>
      this.http.request<RevokeDeveloperData, RevokeDeveloperError>({
        path: `/admin/developers/${userId}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      })
  };
  betaGuilds = {
    /**
     * No description
     *
     * @tags Internal
     * @name ListBetaGuildIds
     * @summary List beta server IDs, oldest first
     * @request GET:/beta-guilds/ids
     * @secure
     * @response `200` `ListBetaGuildIdsData`
     * @response `500` `ErrorResponseDto`
     */
    listBetaGuildIds: (params: RequestParams = {}) =>
      this.http.request<ListBetaGuildIdsData, ListBetaGuildIdsError>({
        path: `/beta-guilds/ids`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      })
  };
}
