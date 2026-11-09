import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  time,
  User
} from 'discord.js';
import moment from 'moment';
import ms from 'ms';
import { api, encode } from '../../api/axios.js';
import { GlobalClanEntity } from '../../api/generated.js';
import { Command } from '../../lib/handlers.js';
import { EMOJIS } from '../../util/emojis.js';

export default class ClanHistoryCommand extends Command {
  public constructor() {
    super('clan-history', {
      category: 'search',
      channel: 'guild',
      clientPermissions: ['UseExternalEmojis', 'EmbedLinks'],
      defer: true
    });
  }

  public async exec(interaction: CommandInteraction<'cached'>, args: { tag: string; user?: User }) {
    const data = await this.client.resolver.resolvePlayer(interaction, args.tag ?? args.user?.id);
    if (!data) return;

    // The API reports the current stint as running until now; the stored lastSeen
    // of an open stint is when it started.
    const history = await api.players
      .getPlayerClanHistory({ playerTag: encode(data.tag) })
      .then(({ data }) => data.items)
      .catch(() => null);
    if (!history) {
      return interaction.editReply(
        'Clan history is unavailable right now. Please try again later.'
      );
    }

    const clans = history.map(({ clan, firstSeen, lastSeen }) => ({
      clan,
      firstSeen: new Date(firstSeen),
      lastSeen: new Date(lastSeen)
    }));

    if (!clans.length) {
      return interaction.editReply(`No clan history found for **${data.name} (${data.tag})`);
    }

    const mostStayedClansMap = clans.reduce<
      Record<string, { clan: GlobalClanEntity; stay: number }>
    >((record, { firstSeen, lastSeen, clan }) => {
      const diff = lastSeen.getTime() - firstSeen.getTime();
      const stay = diff === 0 ? 0 : diff;
      if (!record[clan.tag]) {
        record[clan.tag] = { clan, stay };
      } else {
        record[clan.tag].stay += stay;
      }
      return record;
    }, {});
    const mostStayedClans = Object.values(mostStayedClansMap)
      .sort((a, b) => b.stay - a.stay)
      .filter((x) => x.stay > 0);

    const months = moment(clans.at(-1)?.lastSeen).diff(clans.at(0)?.firstSeen, 'months');

    const embed = new EmbedBuilder()
      .setColor(this.client.embed(interaction))
      .setTitle(`${data.name} (${data.tag})`)
      .setURL(`http://cprk.us/p/${data.tag.replace('#', '')}`)
      .setDescription(
        [
          '### Longest-Staying Clans',
          ...mostStayedClans.slice(0, 5).map(({ clan, stay }) => {
            const stayTime = ms(stay);
            return `\u200e${this.formatClan(clan, data.tag)} - ${stayTime}`;
          }),

          '### Most Recent Clans',
          ...clans.slice(0, 10).map(({ clan, firstSeen, lastSeen }) => {
            const diff = lastSeen.getTime() - firstSeen.getTime();
            const stay = diff === 0 ? '' : `- ${ms(diff)}`;
            const timeFrame =
              diff === 0
                ? `${time(firstSeen, 'f')}`
                : `${time(firstSeen, 'D')} to ${time(lastSeen, 'D')}`;
            return `\u200e${this.formatClan(clan, data.tag)} ${stay} \n-# ${timeFrame}\n`;
          })
        ].join('\n')
      )
      .setFooter({ text: `Last ${Math.max(months, 6)} months` })
      .setTimestamp();

    const payload = {
      cmd: this.id,
      tag: data.tag
    };

    const customIds = {
      refresh: JSON.stringify({ ...payload }),
      profile: JSON.stringify({ ...payload, cmd: 'player' })
    };

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setEmoji(EMOJIS.REFRESH)
          .setStyle(ButtonStyle.Secondary)
          .setCustomId(customIds.refresh)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel('View Profile')
          .setStyle(ButtonStyle.Primary)
          .setCustomId(customIds.profile)
      );

    return interaction.editReply({ embeds: [embed], components: [row] });
  }

  private formatClan(clan: GlobalClanEntity, playerTag: string) {
    if (clan.tag === '#00000') {
      return `[Not in any Clans](http://cprk.us/p/${playerTag.replace('#', '')})`;
    }
    return `[${clan.name} (${clan.tag})](http://cprk.us/c/${clan.tag.replace('#', '')})`;
  }
}
