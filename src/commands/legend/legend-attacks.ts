import { ATTACK_COUNTS } from '@app/constants';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  escapeMarkdown,
  Guild,
  User
} from 'discord.js';
import moment from 'moment';
import {
  getClanDailyLegendBattles,
  getLegendTimestampAgainstDay
} from '../../helper/legends.helper.js';
import { Command } from '../../lib/handlers.js';
import { EMOJIS } from '../../util/emojis.js';
import { padStart, trimTag } from '../../util/helper.js';
import { Season, Util } from '../../util/toolkit.js';

export default class LegendAttacksCommand extends Command {
  public constructor() {
    super('legend-attacks', {
      category: 'search',
      channel: 'guild',
      clientPermissions: ['EmbedLinks', 'UseExternalEmojis'],
      defer: true
    });
  }

  public async exec(
    interaction: CommandInteraction<'cached'>,
    args: {
      clans?: string;
      user?: User;
      day?: number;
    }
  ) {
    const resolved = await this.getClans(interaction, args);
    if (!resolved) return;

    const { clans, resolvedArgs } = resolved;
    const embed = await this.getAttackLog({
      clans,
      guild: interaction.guild,
      leagueDay: args.day
    });

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setEmoji(EMOJIS.REFRESH)
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(this.createId({ cmd: this.id, clans: resolvedArgs }))
    );

    const isCurrentDay = Util.getLegendDay() === getLegendTimestampAgainstDay(args.day).day;
    return interaction.editReply({ embeds: [embed], components: isCurrentDay ? [row] : [] });
  }

  private async getAttackLog({
    leagueDay,
    clans,
    guild
  }: {
    leagueDay?: number;
    clans: { tag: string; name: string }[];
    guild: Guild;
  }) {
    const { startTime, day } = getLegendTimestampAgainstDay(leagueDay);
    const battleDate = new Date(startTime).toISOString().slice(0, 10);

    const dailyItems = await Promise.all(
      clans.map((clan) => getClanDailyLegendBattles(clan.tag, battleDate))
    );
    const members = dailyItems
      .flat()
      .map((entry) => ({
        name: entry.name,
        tag: entry.tag,
        attackCount: entry.attackCount,
        defenseCount: entry.defenseCount,
        trophiesFromAttacks: entry.offenseTrophies,
        trophiesFromDefenses: entry.defenseTrophies,
        netTrophies: entry.gain,
        currentTrophies: entry.trophies
      }))
      .sort((a, b) => b.currentTrophies - a.currentTrophies);

    const embed = new EmbedBuilder().setColor(this.client.embed(guild.id));

    if (clans.length === 1) {
      const [clan] = clans;
      embed.setTitle(`${escapeMarkdown(clan.name)} (${clan.tag})`);
      embed.setURL(`http://cprk.us/c/${trimTag(clan.tag)}`);
    } else {
      embed.setAuthor({
        name: `Legend League Attacks (${Util.leagueSeasonLabel(Season.leagueId)})`,
        iconURL: guild.iconURL()!
      });
    }

    embed.setDescription(
      [
        clans.length === 1 ? '**Legend League Attacks**' : '',
        `\`GAIN  LOSS  FINAL \` **NAME**`,
        ...members.slice(0, 99).map((mem) => {
          const attacks = padStart(
            `+${mem.trophiesFromAttacks}${ATTACK_COUNTS[Math.min(8, mem.attackCount)]}`,
            5
          );
          const defense = padStart(
            `-${Math.abs(mem.trophiesFromDefenses)}${ATTACK_COUNTS[Math.min(8, mem.defenseCount)]}`,
            5
          );
          return `\`${attacks} ${defense}  ${padStart(mem.currentTrophies, 4)} \` \u200e${escapeMarkdown(mem.name)}`;
        })
      ].join('\n')
    );

    const season = Season.getLeagueSeason();
    embed.setTimestamp();
    embed.setFooter({
      text: `Day ${day}/${moment(season.endTime).diff(season.startTime, 'days')} (${Util.leagueSeasonLabel(Season.leagueId)})`
    });

    return embed;
  }

  private async getClans(
    interaction: CommandInteraction<'cached'>,
    args: { clans?: string; user?: User }
  ) {
    const isSingleTag =
      args.clans && this.client.coc.isValidTag(this.client.coc.fixTag(args.clans));

    if (args.clans && !isSingleTag) {
      const { resolvedArgs, clans } = await this.client.storage.handleSearch(interaction, {
        args: args.clans
      });
      if (!clans) return;

      const _clans = await this.client.redis.getClans(clans.map((clan) => clan.tag));
      if (_clans.length) return { clans: _clans, resolvedArgs };
    }

    const clan = await this.client.resolver.resolveClan(interaction, args?.clans ?? args.user?.id);
    if (!clan) return;

    return { clans: [clan], resolvedArgs: clan.tag };
  }
}
