export interface LinkButtonConfig {
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  token_field: string;
  button_style: number;
  embed_color: number;
}

export interface WelcomeLogConfig {
  enabled: boolean;
  channelId: string;
  webhook: { id: string; token: string } | null;
  buttons: string[]; // ['link-account', 'role-refresh'];
  welcomeText: string;
  description: string;
  bannerImage: string | null;
  embedColor: number | null;
}

/** Where one kind of Clash of Clans share link pasted in chat gets a card. Written by the API. */
export type LinkParsingMode = 'reply' | 'message' | 'replace';

export interface LinkParsingRule {
  enabled: boolean;
  /** Missing on rules saved before modes existed, which reply. */
  mode?: LinkParsingMode;
  channelIds: string[];
  categoryIds: string[];
}

export type ClashLinkType = 'player' | 'clan' | 'army' | 'base';

/** One rule per link type. A missing type is off. */
export type LinkParsingConfig = Partial<Record<ClashLinkType, LinkParsingRule>>;

export interface SettingsEntity {
  guildId: string;
  commandWhitelist?: {
    key: string;
    userOrRoleId: string;
    commandId: string;
    isRole: boolean;
  }[];
  rosterManagerRole?: string | string[];
  color?: number;
  hasFlagAlertLog?: boolean;
  clanCategoryExclusion?: string[];
  roleRemovalDelays?: number;
  roleAdditionDelays?: number;
  webhookLimit?: number;
  nonFamilyNicknameFormat?: string;
  familyNicknameFormat?: string;
  useAutoRole?: boolean;
  linkEmbeds?: {
    title: string;
    description: string;
    token_field: string;
    thumbnail_url: string;
  };
  verifiedOnlyClanRoles?: boolean;
  autoNickname?: boolean;
  accountVerifiedRole?: string;
  clansSortingKey?: string;
  rosterDefaultSettings?: {
    allowMultiSignup: boolean;
    allowCategorySelection: boolean;
    maxMembers: number;
    minHeroLevels: number | null;
    minTownHall: number | null;
    maxTownHall: number | null;
    sortBy: string;
    allowUnlinked: boolean;
    layout: string;
    colorCode: number;
    useClanAlias: boolean;
  };
  roleRefreshed?: number;
  clanLimit?: number;
  allowExternalAccounts?: boolean;
  allowExternalAccountsLeague?: boolean;
  leagueRoles?: Record<string, string>;
  townHallRoles?: Record<string, string>;
  builderHallRoles?: Record<string, string>;
  forceRefreshRoles?: boolean;
  familyRole?: string;
  roleReplacementLabels?: {
    leader: string;
    coLeader: string;
    admin: string;
    member: string;
  };
  reminderExclusion?: {
    type: string;
    wars: string;
    raids: string;
    games: string;
    warsExclusionUserIds: string[];
    raidsExclusionUserIds: string[];
    gamesExclusionUserIds: string[];
  };
  isTrustedGuild?: boolean;
  nicknamingAccountPreference?: string;
  refreshEmbeds?: {
    title: string;
    description: string;
    thumbnailUrl: string;
    image_url: string;
    thumbnail_url: string;
  };
  eosPushClanRoles?: string[];
  eosPushClans?: string[];
  rosterChangeLog?: {
    channelId: string;
    webhook: {
      token: string;
      id: string;
    };
  };
  welcomeLog?: WelcomeLogConfig;
}
