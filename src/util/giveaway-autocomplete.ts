import { AutocompleteInteraction } from 'discord.js';
import { api } from '../api/axios.js';

/** Lists a guild's giveaways for a management command's `giveaway` option. */
export async function giveawayAutocomplete(
  interaction: AutocompleteInteraction<'cached'>,
  status: 'active' | 'ended'
) {
  const { data } = await api.giveaways
    .listGiveaways({ guildId: interaction.guildId, status })
    .catch(() => ({ data: { giveaways: [] } }));

  const focused = interaction.options.getFocused().toString().toLowerCase();
  const choices = data.giveaways
    .filter((giveaway) => !focused || giveaway.prize.toLowerCase().includes(focused))
    .slice(0, 25)
    .map((giveaway) => ({
      name: `${giveaway.prize} · ${giveaway.entryCount} ${giveaway.entryCount === 1 ? 'entry' : 'entries'}`.slice(
        0,
        100
      ),
      value: giveaway.id
    }));

  return interaction.respond(
    choices.length ? choices : [{ name: `No ${status} giveaways found.`, value: '0' }]
  );
}
