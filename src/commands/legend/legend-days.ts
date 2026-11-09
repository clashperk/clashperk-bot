import {
  ATTACK_COUNTS,
  BattlesPerWeek,
  Collections,
  LEGEND_LEAGUE_ID,
  PLAYER_LEAGUE_MAP,
  UNRANKED_TIER_ID
} from '@app/constants';
import { APIPlayer } from 'clashofclans.js';
import {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  StringSelectMenuBuilder,
  User,
  escapeMarkdown,
  time
} from 'discord.js';
import moment from 'moment';
import ms from 'ms';
import pluralize from 'pluralize';
import { api, encode } from '../../api/axios.js';
import { LegendDayDto } from '../../api/generated.js';
import {
  aggregateLegendBattleLog,
  getLegendBattleLogAggregate,
  getLegendArmies,
  getLegendDays,
  getLegendTimestampAgainstDay,
  getRankedBattleLog,
  getTournament,
  Tournament
} from '../../helper/legends.helper.js';
import { Args, Command } from '../../lib/handlers.js';
import {
  createLegendGraph,
  createRankedGraph,
  LegendCardStats
} from '../../struct/image-helper.js';
import { EMOJIS, HOME_BASE_LEAGUES, PLAYER_LEAGUE_TIERS, TOWN_HALLS } from '../../util/emojis.js';
import {
  dashboardUrl,
  formatLeague,
  getMenuFromMessage,
  padStart,
  trimTag
} from '../../util/helper.js';
import { Season, Util } from '../../util/toolkit.js';

const MIN_LAST_SEASON_DAYS = 7;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export default class LegendDaysCommand extends Command {
  public constructor() {
    super('legend-days', {
      aliases: ['legends-search'],
      category: 'search',
      channel: 'dm',
      clientPermissions: ['EmbedLinks', 'UseExternalEmojis'],
      defer: true
    });
  }

  public args(): Args {
    return {
      player: {
        id: 'tag',
        match: 'STRING'
      }
    };
  }

  public async exec(
    interaction: CommandInteraction<'cached'> | ButtonInteraction<'cached'>,
    args: { tag?: string; user?: User; prev?: boolean; day?: number; graph?: boolean }
  ) {
    const data = await this.client.resolver.resolvePlayer(interaction, args.tag ?? args.user?.id);
    if (!data) return;

    const customIds = {
      refresh: this.createId({ cmd: this.id, prev: args.prev, tag: data.tag }),
      accounts: this.createId({ cmd: this.id, prev: args.prev, tag: data.tag, string_key: 'tag' }),
      overview: this.createId({ cmd: this.id, prev: !args.prev, _: 1, tag: data.tag })
    };

    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setEmoji(EMOJIS.REFRESH)
          .setCustomId(customIds.refresh)
          .setStyle(ButtonStyle.Secondary)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel(args.prev ? 'Today' : 'Season History')
          .setCustomId(customIds.overview)
          .setStyle(args.prev ? ButtonStyle.Success : ButtonStyle.Primary)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel('View season')
          .setStyle(ButtonStyle.Link)
          .setURL(
            dashboardUrl(
              `/web/players/${encodeURIComponent(data.tag)}/legends?utm_source=discord&utm_campaign=legend-days`
            )
          )
      );

    if (!data.leagueTier || data.leagueTier.id !== LEGEND_LEAGUE_ID) {
      if (await this.rankedBattles(interaction, data)) return;
      return interaction.followUp({
        content: `**${data.name} (${data.tag})** is not in the Legend League. \n**Ranked battle logs are coming soon!**`
      });
    }

    const days = await getLegendDays(data.tag);
    if (!days.length) {
      return interaction.followUp({
        content: [
          `No data available for **${data.name} (${data.tag})**`,
          `Going forward, Legend statistics will be collected.`
        ].join('\n')
      });
    }

    const embed = args.prev
      ? await this.logs(data, days)
      : await this.embed(interaction, data, days, args.day);

    embed.setTimestamp().setColor(this.client.embed(interaction));
    await interaction.editReply({
      embeds: [embed],
      components: [
        row,
        ...(interaction.isMessageComponent()
          ? getMenuFromMessage(interaction, data.tag, customIds.accounts)
          : [])
      ],
      content: null,
      files: []
    });

    const result = args.prev ? await this.graph(data, days) : null;
    if (result) {
      const rawFile = new AttachmentBuilder(result.file, { name: result.name });
      embed.setImage(result.attachmentKey);
      return interaction.editReply({
        embeds: [embed],
        components: [
          row,
          ...(interaction.isMessageComponent()
            ? getMenuFromMessage(interaction, data.tag, customIds.accounts)
            : [])
        ],
        files: [rawFile],
        content: null
      });
    }

    if (!data.user) return;

    const players = await this.client.resolver.getPlayers(data.user.id);
    const options = players
      .filter(
        (op) =>
          op.leagueTier?.id === LEGEND_LEAGUE_ID ||
          (op.currentLeagueGroupTag && op.currentLeagueGroupTag !== '#0')
      )
      .map((op) => ({
        label: `${op.name} (${op.tag})`,
        description: `${EMOJIS.TROPHY_UNICODE} ${op.trophies}`,
        value: op.tag,
        default: op.tag === data.tag,
        emoji: PLAYER_LEAGUE_TIERS[PLAYER_LEAGUE_MAP[op.leagueTier?.id ?? UNRANKED_TIER_ID]]
      }));

    if (!(options.length > 1)) return;

    const menuRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(customIds.accounts)
        .setPlaceholder('Select an account!')
        .addOptions(options)
    );

    return interaction.editReply({ components: [row, menuRow] });
  }

  private async getClan(clanTag: string) {
    const clan = await this.client.redis.getClan(clanTag);
    if (clan) return clan;

    const { body, res } = await this.client.coc.getClan(clanTag);
    if (res.ok && body) return body;

    return null;
  }

  private async addClanField(embed: EmbedBuilder, player: APIPlayer) {
    const clan = player.clan ? await this.getClan(player.clan.tag) : null;
    const member = (clan?.memberList ?? []).find((en) => en.tag === player.tag);

    if (clan && member) {
      embed.addFields({
        name: '**Clan**',
        value: [
          `- [${clan.name} (${clan.tag})](http://cprk.us/c/${trimTag(clan.tag)})`,
          `- Rank in Clan: ${member.clanRank}`
        ].join('\n')
      });
    }
  }

  private async embed(
    interaction: CommandInteraction | ButtonInteraction,
    data: APIPlayer,
    legendDays: LegendDayDto[],
    _day?: number
  ) {
    const { startTime, day } = getLegendTimestampAgainstDay(_day);
    const battleDate = new Date(startTime).toISOString().slice(0, 10);
    const legendDay = legendDays.find((d) => d.date === battleDate);
    const dayBattles = legendDay?.battles ?? [];

    const attacks = dayBattles.filter((b) => b.isAttack);
    const defenses = dayBattles.filter((b) => !b.isAttack);

    const trophiesFromAttacks = legendDay?.attackTrophies ?? 0;
    const trophiesFromDefenses = legendDay?.defenseTrophies ?? 0;
    const netTrophies = trophiesFromAttacks + trophiesFromDefenses;

    let streak = 0;
    for (const b of [...attacks].reverse()) {
      if (b.stars === 3) streak++;
      else break;
    }

    const initialTrophies = legendDay?.initialTrophies ?? data.trophies;
    const currentTrophies = legendDay?.currentTrophies ?? data.trophies;

    const { globalRank, countryRank } = await this.rankings(data.tag);

    const weaponLevel = data.townHallWeaponLevel ? ATTACK_COUNTS[data.townHallWeaponLevel] : '';
    const embed = new EmbedBuilder()
      .setColor(this.client.embed(interaction))
      .setTitle(`${escapeMarkdown(data.name)} (${data.tag})`)
      .setURL(`http://cprk.us/p/${trimTag(data.tag)}`);
    embed.setDescription(
      [
        `${TOWN_HALLS[data.townHallLevel]} **${data.townHallLevel}${weaponLevel}** ${
          data.leagueTier && data.leagueTier.id === LEGEND_LEAGUE_ID
            ? EMOJIS.LEGEND_LEAGUE
            : EMOJIS.TROPHY
        } **${data.trophies} ${HOME_BASE_LEAGUES[data.leagueTier?.id ?? UNRANKED_TIER_ID]} ${'Legend I'}**`
      ].join('\n')
    );

    embed.addFields([
      {
        name: '**Overview**',
        value: [
          ...(legendDay?.reset
            ? [`- Reset to ${legendDay.reset.to} (from ${legendDay.reset.from})`]
            : []),
          `- Initial Trophies: ${initialTrophies}`,
          `- Current Trophies: ${currentTrophies}`,
          `- ${attacks.length} attack${attacks.length === 1 ? '' : 's'} (+${trophiesFromAttacks} trophies)`,
          `- ${defenses.length} defense${defenses.length === 1 ? '' : 's'} (${trophiesFromDefenses} trophies)`,
          `- ${Math.abs(netTrophies)} trophies ${netTrophies >= 0 ? 'gained' : 'lost'}`,
          `- Streak: ${streak}`
        ].join('\n')
      }
    ]);

    if (globalRank || countryRank) {
      embed.addFields({
        name: '**Ranking**',
        value: [
          `- Global Rank: ${globalRank ?? 'N/A'}`,
          `- Local Rank: ${
            countryRank
              ? `${countryRank.players.rank} (${countryRank.country} :flag_${countryRank.countryCode.toLowerCase()}:)`
              : 'N/A'
          }`
        ].join('\n')
      });
    }

    await this.addClanField(embed, data);

    embed.addFields([
      {
        name: '**Attacks**',
        value: attacks.length
          ? attacks
              .map(
                (b) =>
                  `\` ${padStart(`+${b.trophyChange}`, 3)}\` \u200b \`${'★'.repeat(b.stars)}${'☆'.repeat(3 - b.stars)}\` \u200b \`${padStart(b.destruction, 3)}%\` \u200b ${time(new Date(b.battleTime), 'R')}`
              )
              .join('\n')
          : '-',
        inline: true
      },
      {
        name: '**Defenses**',
        value: defenses.length
          ? defenses
              .map(
                (b) =>
                  `\` ${padStart(`${b.trophyChange === 0 ? '+' : ''}${b.trophyChange}`, 3)}\` \u200b \`${'★'.repeat(b.stars)}${'☆'.repeat(3 - b.stars)}\` \u200b \`${padStart(b.destruction, 3)}%\` \u200b ${time(new Date(b.battleTime), 'R')}`
              )
              .join('\n')
          : '-',
        inline: true
      }
    ]);

    const season = Season.getLeagueSeason();
    embed.setFooter({
      text: `Day ${day}/${moment(season.endTime).diff(season.startTime, 'days')} (${Util.leagueSeasonLabel(Season.leagueId)})`
    });
    return embed;
  }

  private async graph(data: APIPlayer, legendDays: LegendDayDto[]) {
    const dailyItems = await getLegendBattleLogAggregate(data.tag);
    if (!dailyItems.length) return null;

    const {
      items: result,
      seasonStart,
      seasonEnd,
      lastSeasonEnd
    } = aggregateLegendBattleLog(dailyItems);
    if (!result.length) return null;

    const season = result.at(0)!;
    const prevSeason = result.at(1);
    const prevFinalTrophies = prevSeason?.logs.at(-1)?.trophies ?? '';
    // A few tracked days aren't a season: comparing against them gives nonsense like "+267 vs last".
    const lastSeason =
      prevSeason && prevSeason.logs.length >= MIN_LAST_SEASON_DAYS ? prevSeason : undefined;

    if (season._id !== Season.leagueId) return null;

    const labels = Array.from({ length: moment(seasonEnd).diff(seasonStart, 'days') + 1 }, (_, i) =>
      moment(seasonStart).add(i, 'days').toDate()
    );

    for (const label of labels) {
      const log = season.logs.find((log) => moment(log.timestamp).isSame(label, 'day'));
      if (!log) season.logs.push({ timestamp: label, trophies: null });
    }
    season.logs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const lastSeasonLabels = Array.from({ length: labels.length }, (_, i) =>
      moment(lastSeasonEnd).subtract(i, 'days').toDate()
    ).reverse();

    if (lastSeason) {
      lastSeasonLabels.forEach((label) => {
        const log = lastSeason.logs.find((log) => moment(log.timestamp).isSame(label, 'day'));
        if (!log) lastSeason.logs.push({ timestamp: label, trophies: null });
      });
      lastSeason.logs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      lastSeason.logs = lastSeason.logs.map((log, i) => {
        if (log.trophies === null) {
          return { ...log, trophies: lastSeason.logs[i - 1]?.trophies ?? null };
        }
        return log;
      });
      lastSeason.logs = lastSeason.logs.slice(-season.logs.length);
    }

    return createLegendGraph({
      stats: await this.cardStats(data.tag, legendDays),
      datasets: lastSeason ? [season, lastSeason] : [season],
      data: {
        name: data.name,
        townHallLevel: data.townHallLevel,
        trophies: data.trophies,
        clan: data.clan
      },
      labels,
      prevFinalTrophies,
      season,
      seasonEnd,
      seasonStart,
      lastSeason
    });
  }

  private async cardStats(tag: string, legendDays: LegendDayDto[]): Promise<LegendCardStats> {
    const [armies, { globalRank }] = await Promise.all([getLegendArmies(tag), this.rankings(tag)]);

    const byDate = new Map(legendDays.map((day) => [day.date, day]));
    const days = Util.getLegendDays().map(({ startTime }) => {
      const day = byDate.get(new Date(startTime).toISOString().slice(0, 10));
      return day
        ? { offense: day.attackTrophies, defense: day.defenseTrophies, attacks: day.attackCount }
        : null;
    });

    const attackStars = [0, 0, 0, 0];
    const defenseStars = [0, 0, 0, 0];
    for (const battle of legendDays.flatMap((day) => day.battles)) {
      (battle.isAttack ? attackStars : defenseStars)[battle.stars]++;
    }

    return {
      rank: globalRank ? { rank: globalRank } : undefined,
      days,
      attackStars,
      defenseStars,
      mostUsed: armies?.army ? armies : undefined
    };
  }

  private async logs(data: APIPlayer, legendDays: LegendDayDto[]) {
    const days = Util.getLegendDays();

    const perDayLogs = days.map(({ startTime }) => {
      const battleDate = new Date(startTime).toISOString().slice(0, 10);
      const legendDay = legendDays.find((d) => d.date === battleDate);

      const gain = legendDay?.attackTrophies ?? 0;
      const loss = legendDay?.defenseTrophies ?? 0;
      const initial = legendDay?.initialTrophies;
      const final = legendDay?.currentTrophies;

      return {
        attackCount: legendDay?.attackCount ?? 0,
        defenseCount: legendDay?.defenseCount ?? 0,
        gain,
        loss,
        net: initial && final ? final - initial : gain + loss,
        final: final || '-',
        initial: initial || '-'
      };
    });

    const totalAttacks = perDayLogs.reduce((acc, cur) => acc + cur.attackCount, 0);
    const weaponLevel = data.townHallWeaponLevel ? ATTACK_COUNTS[data.townHallWeaponLevel] : '';

    const description = [
      ...[
        `${TOWN_HALLS[data.townHallLevel]} **${data.townHallLevel}${weaponLevel}** ${
          data.leagueTier && data.leagueTier.id === LEGEND_LEAGUE_ID
            ? EMOJIS.LEGEND_LEAGUE
            : EMOJIS.TROPHY
        } **${data.trophies}**`,
        ''
      ],
      `**Legend Season Logs (${Util.leagueSeasonLabel(Season.leagueId)})**`,
      `- ${data.attackWins || totalAttacks} ${pluralize('attack', data.attackWins)} and ${data.defenseWins} ${pluralize('defense', data.defenseWins)} won`,
      '',
      [
        '`DAY` `  ATK ` `  DEF ` ` +/- ` ` INIT ` `FINAL `',
        ...perDayLogs.map((day, i) => {
          const def = padStart(
            `-${Math.abs(day.loss)}${ATTACK_COUNTS[Math.min(8, day.defenseCount)]}`,
            5
          );
          const atk = padStart(`+${day.gain}${ATTACK_COUNTS[Math.min(8, day.attackCount)]}`, 5);
          const ng = padStart(`${day.net > 0 ? '+' : ''}${day.net}`, 4);
          const final = padStart(day.final, 4);
          const init = padStart(day.initial, 5);
          const n = (i + 1).toString().padStart(2, ' ');
          return `\`\u200e${n} \` \`${atk} \` \`${def} \` \`${ng} \` \`${init} \` \` ${final} \``;
        })
      ].join('\n')
    ].join('\n');

    const embed = new EmbedBuilder();
    embed.setTitle(`${escapeMarkdown(data.name)} (${data.tag})`);
    embed.setURL(`http://cprk.us/p/${trimTag(data.tag)}`);
    embed.setDescription(description);

    const season = Season.getLeagueSeason();
    embed.setFooter({
      text: `Day ${days.length}/${moment(season.endTime).diff(season.startTime, 'days')} (${Util.leagueSeasonLabel(Season.leagueId)})`
    });

    return embed;
  }

  private async rankings(tag: string) {
    const ranks = await this.client.db
      .collection(Collections.PLAYER_RANKS)
      .aggregate<{ country: string; countryCode: string; players: { rank: number } }>([
        { $match: { season: Season.leagueId } },
        { $unwind: { path: '$players' } },
        { $match: { 'players.tag': tag } }
      ])
      .toArray();

    let globalRank =
      ranks.find(({ countryCode }) => countryCode === 'global')?.players.rank ?? null;

    if (!globalRank) {
      try {
        const estimate = await api.legends.estimateLegendRank({ playerTag: encode(tag) });
        globalRank = estimate.data.rank;
      } catch {
        // Silently ignore estimate errors
      }
    }

    return {
      globalRank,
      countryRank: ranks.find(({ countryCode }) => countryCode !== 'global') ?? null
    };
  }

  private async rankedBattles(
    interaction: CommandInteraction<'cached'> | ButtonInteraction<'cached'>,
    player: APIPlayer
  ) {
    const week = await this.shownTournament(player);
    if (!week) return null;
    const { tournament, weekStart, isLastWeek } = week;
    const { battles } = tournament;

    const leagueId = tournament.league?.id ?? UNRANKED_TIER_ID;
    if (!battles.length || leagueId === UNRANKED_TIER_ID) return null;

    const attacks = battles.filter((b) => b.isAttack);
    const defenses = battles.filter((b) => !b.isAttack);

    const avgStat = (arr: typeof battles, key: 'stars' | 'destruction') =>
      arr.length ? (arr.reduce((s, b) => s + b[key], 0) / arr.length).toFixed(1) : '0';
    const avgOffenseStars = avgStat(attacks, 'stars');
    const avgOffenseDestruction = avgStat(attacks, 'destruction');
    const avgDefenseStars = avgStat(defenses, 'stars');
    const avgDefenseDestruction = avgStat(defenses, 'destruction');
    const trophiesFromAttacks = attacks.reduce((acc, b) => acc + b.trophyChange, 0);
    const trophiesFromDefenses = defenses.reduce((acc, b) => acc + b.trophyChange, 0);

    const embed = new EmbedBuilder()
      .setColor(this.client.embed(interaction))
      .setTitle(`${escapeMarkdown(player.name)} (${player.tag})`)
      .setURL(`http://cprk.us/p/${trimTag(player.tag)}`);

    const leagueLabel = formatLeague(PLAYER_LEAGUE_MAP[leagueId]);
    embed.setDescription(
      [
        `${TOWN_HALLS[player.townHallLevel]} **${player.townHallLevel}** ${EMOJIS.TROPHY} **${tournament.member.leagueTrophies} ${HOME_BASE_LEAGUES[leagueId]} ${leagueLabel}**`
      ].join('\n')
    );

    {
      const startTime = weekStart;
      const endTime = new Date(weekStart.getTime() + WEEK_MS);

      const zoneLine = tournament.isInPromotionZone
        ? `- **Promotion Zone** (top ${tournament.promotionZone} players) ${EMOJIS.UP_KEY}`
        : tournament.isInDemotionZone
          ? `- **Demotion Zone** (last ${tournament.demotionZone} players) ${EMOJIS.DOWN_KEY}`
          : `- **Safe Zone** (rank ${tournament.promotionZone + 1}-${tournament.total - tournament.demotionZone})`;

      embed.addFields({
        name: `${isLastWeek ? 'Last Week' : 'Overview'} (${moment(startTime).format('D MMM')} - ${moment(endTime).format('D MMM')})`,
        value: [
          `- ${tournament.member.leagueTrophies} trophies gained`,
          `- ${attacks.length}/${BattlesPerWeek[leagueId]} attacks`,
          `- ${defenses.length}/${BattlesPerWeek[leagueId]} defenses`,
          `- +${trophiesFromAttacks} from attacks (Avg: ${avgOffenseStars} | ${avgOffenseDestruction}%)`,
          `- +${trophiesFromDefenses} from defenses (Avg: ${avgDefenseStars} | ${avgDefenseDestruction}%)`,
          `- Rank **#${tournament.rank}** / ${tournament.total} (Top **${tournament.topPercentage}%**)`,
          zoneLine
        ]
          .filter(Boolean)
          .join('\n')
      });
    }

    // if (lastTournament.result) {
    //   embed.addFields({
    //     name: `Previous Week (${moment(lastTournament.startTime).format('D MMM')} - ${moment(lastTournament.endTime).format('D MMM')})`,
    //     value: [
    //       `- ${lastTournament.result.trophies} trophies gained`,
    //       `- ${lastTournament.result.attacks}/${BattlesPerWeek[lastTournament.result.leagueId]} attacks`,
    //       `- ${lastTournament.result.defenses}/${BattlesPerWeek[leagueId]} defenses`,
    //       leagueId > lastTournament.result.leagueId
    //         ? `- Promoted to **${formatLeague(player.leagueTier.name)} (${EMOJIS.UP_KEY} ${leagueId - lastTournament.result.leagueId})**`
    //         : leagueId < lastTournament.result.leagueId
    //           ? `- Demoted to **${formatLeague(player.leagueTier.name)} (${EMOJIS.DOWN_KEY} ${lastTournament.result.leagueId - leagueId})**`
    //           : `- Stayed in **${formatLeague(player.leagueTier.name)}**`
    //     ].join('\n')
    //   });
    // }

    if (Season.isTournamentReset) {
      const { startTime, endTime } = Util.getTournamentWindow();
      embed.addFields([
        {
          name: 'Upcoming Tournament',
          value: `${time(startTime, 'D')} - ${time(endTime, 'D')}`
        }
      ]);
    }

    await this.addClanField(embed, player);

    embed.addFields([
      {
        name: `**Attacks**`,
        value: attacks.length
          ? [
              ...attacks.reverse().map((b, idx) => {
                const timeLabel =
                  idx >= 5
                    ? `${ms(Date.now() - new Date(b.ingestedAt).getTime())}`
                    : `${time(new Date(b.ingestedAt), 'R')}`;
                return `\` ${padStart(`+${b.trophyChange}`, 3)}\` \u200b \`${'★'.repeat(b.stars)}${'☆'.repeat(3 - b.stars)}\` \u200b \`${padStart(b.destruction, 3)}%\` \u200b ${timeLabel}`;
              })
            ].join('\n')
          : '-',

        inline: true
      },
      {
        name: `**Defenses**`,
        value: defenses.length
          ? [
              ...defenses.reverse().map((b, idx) => {
                const timeLabel =
                  idx >= 5
                    ? `${ms(Date.now() - new Date(b.ingestedAt).getTime())}`
                    : `${time(new Date(b.ingestedAt), 'R')}`;
                return `\` ${padStart(`+${b.trophyChange}`, 3)}\` \u200b \`${'★'.repeat(b.stars)}${'☆'.repeat(3 - b.stars)}\` \u200b \`${padStart(b.destruction, 3)}%\` \u200b ${timeLabel}`;
              })
            ].join('\n')
          : '-',
        inline: true
      }
    ]);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setEmoji(EMOJIS.REFRESH)
        .setCustomId(JSON.stringify({ cmd: this.id, tag: player.tag }))
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.editReply({ embeds: [embed], components: [row], content: null });

    const card = await this.rankedCard(player, tournament, weekStart, isLastWeek);
    if (!card) return;
    embed.setImage(card.attachmentKey);
    return interaction.editReply({
      embeds: [embed],
      components: [row],
      files: [new AttachmentBuilder(card.file, { name: card.name })]
    });
  }

  /**
   * This week's group once it has battles; otherwise (the Monday reset, or before the first battle)
   * last week's, in the league the player was in then.
   */
  private async shownTournament(player: APIPlayer) {
    const thisWeekStart = Util.getTournamentWindow().startTime;
    const current = player.currentLeagueGroupTag
      ? await getTournament(player).catch(() => null)
      : null;
    if (current?.battles.length)
      return { tournament: current, weekStart: thisWeekStart, isLastWeek: false };
    if (!player.previousLeagueGroupTag) return null;

    const { result } = await this.getLastTournament(player.tag);
    const league =
      result && result.leagueId !== player.leagueTier?.id
        ? await this.client.coc
            .getLeagueTier(result.leagueId)
            .then(({ body, res }) => (res.ok ? body : player.leagueTier))
            .catch(() => player.leagueTier)
        : player.leagueTier;
    const last = await getTournament(player, true, league).catch(() => null);
    if (!last) return null;
    return {
      tournament: last,
      weekStart: new Date(thisWeekStart.getTime() - WEEK_MS),
      isLastWeek: true
    };
  }

  private async rankedCard(
    player: APIPlayer,
    tournament: Tournament,
    weekStart: Date,
    isLastWeek: boolean
  ) {
    // Last week's own previous group isn't in the API, so it has no comparison line.
    const lastTournament = isLastWeek ? null : await getTournament(player, true).catch(() => null);
    return createRankedGraph({ player, tournament, lastTournament, weekStart }).catch(() => null);
  }

  private async getLastTournament(playerTag: string) {
    const lastWeek = moment(Util.getTournamentWindow().startTime)
      .subtract(7, 'days')
      .format('YYYY-MM-DD');
    const { id, startTime, endTime } = Util.getTournamentWindowById(lastWeek);

    const battles = await getRankedBattleLog(playerTag, id);
    if (!battles.length) return { result: null, startTime, endTime, id };

    const attacks = battles.filter((b) => b.isAttack).length;
    const defenses = battles.filter((b) => !b.isAttack).length;
    const lastBattle = battles.at(0)!;

    return {
      result: { trophies: lastBattle.trophies, attacks, defenses, leagueId: lastBattle.leagueId },
      startTime,
      endTime,
      id
    };
  }
}
