import { CustomTiers } from '../struct/subscribers.js';

export interface PatreonMembersEntity {
  id: string;
  name: string;
  rewardId: string;

  userId: string;
  username: string;

  guilds: {
    id: string;
    name: string;
    limit: number;
  }[];
  redeemed: boolean;

  active: boolean;
  declined: boolean;
  cancelled: boolean;

  entitledAmount: number;
  lifetimeSupport: number;

  isGifted: boolean;
  isLifetime: boolean;
  /** A special tier for Patreon, or `<source>: <reference>` for a manual grant. */
  note: CustomTiers;
  email: string;
  /** Patreon's patron status, or `manual` for a grant paid elsewhere. */
  status: string;

  applicationId?: string;
  customBots?: Record<
    string,
    {
      active: boolean;
      avatarUrl: string;
      nickname: string;
      bio: string | null;
      banner: string | null;
    }
  >;

  lastChargeDate: Date;
  /** Manual grants only: when it ends, null for lifetime. */
  expiresAt?: Date | null;
  createdAt: Date;
}
