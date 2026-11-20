import { MAX_TOWN_HALL_LEVEL } from '@app/constants';
import { ArmyLinkUnit, parseArmyLink } from 'clashofclans.js';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  Guild,
  Message
} from 'discord.js';
import { Command } from '../../lib/handlers.js';
import {
  DARK_ELIXIR_TROOPS,
  DARK_SPELLS,
  ELIXIR_SPELLS,
  ELIXIR_TROOPS,
  EMOJIS,
  HERO_EQUIPMENT,
  HERO_PETS,
  HOME_HEROES,
  SIEGE_MACHINES,
  SQUADS,
  SUPER_TROOPS
} from '../../util/emojis.js';
import { ARMY_CAPACITY } from '../../util/troops.js';

const [TOTAL_UNITS, TOTAL_SPELLS] = [352, 11];
const ARMY_LINK_IN_TEXT = /https?:\/\/link\.clashofclans\.com\/\S+/i;

const SPELLS: Record<string, string> = { ...DARK_SPELLS, ...ELIXIR_SPELLS };
const TROOPS: Record<string, string> = { ...ELIXIR_TROOPS, ...DARK_ELIXIR_TROOPS };
const CC_TROOPS: Record<string, string> = { ...TROOPS, ...SIEGE_MACHINES, ...SUPER_TROOPS };

export default class ArmyCommand extends Command {
  public constructor() {
    super('army', {
      category: 'search',
      clientPermissions: ['EmbedLinks', 'UseExternalEmojis'],
      defer: true
    });
  }

  public async run(message: Message<true>, args: { link: string }) {
    const payload = this.embed(message.guild, 'en-US', args);
    return message.channel.send({
      ...payload,
      allowedMentions: { repliedUser: false },
      reply: { messageReference: message, failIfNotExists: false }
    });
  }

  public async exec(interaction: CommandInteraction, args: { link: string }) {
    const payload = this.embed(interaction.guild!, interaction.locale, args);
    return interaction.editReply(payload);
  }

  public embed(
    guild: Guild,
    locale: string,
    args: { link: string; message?: string; army_name?: string; tips?: string }
  ) {
    const input = (args.link ?? args.message ?? '').trim();
    const link = input.match(ARMY_LINK_IN_TEXT)?.[0];
    const army = parseArmyLink(link ?? input);
    if (!army) {
      const key = link ? 'command.army.invalid_link' : 'command.army.no_link';
      return { embeds: [], content: this.i18n(key, { lng: locale }) };
    }

    const malformed = [...army.troops, ...army.spells].some((en) => en.count > TOTAL_UNITS);
    if (malformed) {
      return { embeds: [], content: this.i18n('command.army.invalid_link', { lng: locale }) };
    }

    const toEntries = (list: ArmyLinkUnit[], emojis: Record<string, string>) =>
      list
        .filter((en) => en.unit.name in emojis)
        .map((en) => ({
          name: en.unit.name,
          total: en.count,
          housing: en.unit.housingSpace,
          hallLevel: en.unit.unlock.hall
        }));

    const troops = toEntries(
      army.troops.filter((en) => en.unit.subCategory === 'troop' && !en.unit.superTroop),
      TROOPS
    );
    const superTroops = toEntries(
      army.troops.filter((en) => en.unit.superTroop),
      SUPER_TROOPS
    );
    const siegeMachines = toEntries(
      army.troops.filter((en) => en.unit.subCategory === 'siege'),
      SIEGE_MACHINES
    );
    const squads = toEntries(
      army.troops.filter((en) => en.unit.subCategory === 'squad'),
      SQUADS
    );
    const spells = toEntries(army.spells, SPELLS);
    const ccTroops = toEntries(army.clanCastle.troops, CC_TROOPS);
    const ccSpells = toEntries(army.clanCastle.spells, SPELLS);

    const heroes = army.heroes
      .filter((en) => en.unit.name in HOME_HEROES)
      .map((en) => ({
        name: en.unit.name,
        pets: en.pet && en.pet.name in HERO_PETS ? [{ name: en.pet.name }] : [],
        equipment: en.equipment
          .filter((eq) => eq.name in HERO_EQUIPMENT)
          .map((eq) => ({ name: eq.name }))
      }));

    if (
      !spells.length &&
      !troops.length &&
      !superTroops.length &&
      !siegeMachines.length &&
      !squads.length
    ) {
      return { embeds: [], content: this.i18n('command.army.invalid_link', { lng: locale }) };
    }

    const hallByUnlockTH = Math.max(
      ...troops.map((en) => en.hallLevel),
      ...spells.map((en) => en.hallLevel),
      ...siegeMachines.map((en) => en.hallLevel),
      ...superTroops.map((en) => en.hallLevel),
      ...squads.map((en) => en.hallLevel)
    );

    // Siege machines have their own slots, so they don't count toward the camps.
    const totalTroop = [...troops, ...superTroops, ...squads].reduce(
      (pre, cur) => pre + cur.housing * cur.total,
      0
    );
    const totalSpell = spells.reduce((pre, cur) => pre + cur.housing * cur.total, 0);

    const hallByTroops =
      ARMY_CAPACITY.find((en) => en.troops >= Math.min(totalTroop, TOTAL_UNITS))?.hall ?? 0;
    const hallBySpells =
      ARMY_CAPACITY.find((en) => en.spells >= Math.min(totalSpell, TOTAL_SPELLS))?.hall ?? 0;
    const townHallLevel = Math.max(hallByUnlockTH, hallByTroops, hallBySpells);

    const embed = new EmbedBuilder()
      .setColor(this.client.embed(guild.id))
      .setDescription(
        [
          `**${args.army_name ?? 'Shared Army Composition'} [TH ${townHallLevel}${townHallLevel >= MAX_TOWN_HALL_LEVEL ? '' : '+'}]**`,
          '',
          `${EMOJIS.TROOPS} **${totalTroop}** ${EMOJIS.SPELLS} **${totalSpell}**`
        ].join('\n')
      );

    if (heroes.length) {
      embed.setDescription(
        [
          embed.data.description,
          '',
          '**Heroes**',
          heroes
            .map((en) => {
              const exts = en.pets
                .map((eq) => `${EMOJIS.GAP} ${HERO_PETS[eq.name]} ${eq.name}`)
                .concat(
                  ...en.equipment.map((eq) => `${EMOJIS.GAP} ${HERO_EQUIPMENT[eq.name]} ${eq.name}`)
                )
                .join('\n');
              return `${HOME_HEROES[en.name]} ${en.name}${exts.length ? '\n' : ''}${exts}`;
            })
            .join('\n')
        ].join('\n')
      );
    }

    if (troops.length) {
      embed.setDescription(
        [
          embed.data.description,
          '',
          '**Troops**',
          troops
            .map((en) => `\u200e\`${this.padding(en.total)}\` ${TROOPS[en.name]}  ${en.name}`)
            .join('\n')
        ].join('\n')
      );
    }

    if (spells.length) {
      embed.addFields([
        {
          name: '\u200b',
          value: [
            '**Spells**',
            spells
              .map((en) => `\u200e\`${this.padding(en.total)}\` ${SPELLS[en.name]} ${en.name}`)
              .join('\n')
          ].join('\n')
        }
      ]);
    }

    if (superTroops.length) {
      embed.addFields([
        {
          name: '\u200b',
          value: [
            '**Super Troops**',
            superTroops
              .map(
                (en) => `\u200e\`${this.padding(en.total)}\` ${SUPER_TROOPS[en.name]}  ${en.name}`
              )
              .join('\n')
          ].join('\n')
        }
      ]);
    }

    if (squads.length) {
      embed.addFields([
        {
          name: '\u200b',
          value: [
            '**Squads**',
            squads
              .map((en) => `\u200e\`${this.padding(en.total)}\` ${SQUADS[en.name]}  ${en.name}`)
              .join('\n')
          ].join('\n')
        }
      ]);
    }

    if (siegeMachines.length) {
      embed.addFields([
        {
          name: '\u200b',
          value: [
            '**Siege Machines**',
            siegeMachines
              .map(
                (en) => `\u200e\`${this.padding(en.total)}\` ${SIEGE_MACHINES[en.name]}  ${en.name}`
              )
              .join('\n')
          ].join('\n')
        }
      ]);
    }

    if (ccTroops.length || ccSpells.length) {
      embed.addFields([
        {
          name: '\u200b',
          value: [
            `**Clan Castle**`,
            [...ccTroops, ...ccSpells]
              .map(
                (en) =>
                  `\u200e\`${this.padding(en.total)}\` ${{ ...CC_TROOPS, ...SPELLS }[en.name]}  ${en.name}`
              )
              .join('\n')
          ].join('\n')
        }
      ]);
    }

    if (args.tips) {
      embed.addFields([
        {
          name: '\u200b',
          value: ['📌 **Tips**', `${args.tips}`].join('\n')
        }
      ]);
    }

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(army.url)
        .setLabel('Copy Army Link')
        .setEmoji(EMOJIS.TROOPS)
    );

    return {
      embeds: [embed],
      components: [row]
    };
  }

  private padding(num: number) {
    return `${num.toString().padStart(2, ' ')}${num > 99 ? '' : 'x'}`;
  }
}
