import { Binary } from 'mongodb';

export interface BotProfileImagesEntity {
  guildId: string;
  kind: 'avatar' | 'banner';
  /** The upload link the image came from, matched against the patron's saved profile. */
  url: string;
  data: Binary;
  contentType: string;
  updatedAt: Date;
}
