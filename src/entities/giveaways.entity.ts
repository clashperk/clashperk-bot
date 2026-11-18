import { ObjectId } from 'mongodb';

export type GiveawayMode = 'open' | 'boosted' | 'restricted';

export interface GiveawayEligibility {
  mode: GiveawayMode;
  allGuildClans?: boolean;
  clanTags?: string[];
  boostFactor?: number;
}

export interface GiveawaysEntity {
  _id: ObjectId;
  guild: string;
  channelId: string;
  messageId: string | null;
  hostUserId: string;
  prize: string;
  imageUrl: string | null;
  winnerCount: number;
  eligibility: GiveawayEligibility;
  status: 'active' | 'drawing' | 'ended' | 'cancelled';
  entryCount: number;
  winners: string[];
  createdAt: Date;
  endsAt: Date;
  endedAt?: Date;
}

export interface GiveawayEntriesEntity {
  _id: ObjectId;
  giveawayId: ObjectId;
  guild: string;
  userId: string;
  tags: string[];
  enteredAt: Date;
}
