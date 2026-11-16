# Emojis

Every unit, Town Hall, league and number the bot shows is a custom emoji, mapped by name in
[`src/util/emojis.ts`](../src/util/emojis.ts). This page covers where they live and how to add new
ones when a game update ships.

## Where they live

The emojis are guild emojis on a set of emoji servers, not application emojis. The server names are
a rough guide only: newer emojis went wherever there was room (Portal Pendant is on LEAGUE & SPELL,
Ruin Witch on TOWNHALL).

| Server | ID |
| --- | --- |
| HERO & CWL EMOJIS | `637705498732396574` |
| TROOP EMOJIS | `696278607730966600` |
| COMMON EMOJIS | `696292172319817770` |
| LEAGUE & SPELL EMOJIS | `696300782160707624` |
| TOWNHALL EMOJIS | `696303884464816219` |
| LABEL & SUPER TROOP EMOJIS | `731493580371394591` |
| WAR EMOJIS | `786959944641544202` |
| BUILDER BASE EMOJIS | `1130572457175175293` |

The number emojis (`BLUE_NUMBERS`, `RED_NUMBERS` and so on) have servers of their own and are full.

Uploading needs a bot in the server with the **Create Expressions** (or Manage Expressions)
permission. ClashPerk II has it on TROOP, TOWNHALL, LEAGUE & SPELL and HERO & CWL EMOJIS.

## Slots

A server without boosts holds **50 static and 50 animated emojis**, counted separately. The static
slots are almost all used, while the animated ones are free. An emoji counts as animated when its
file has more than one frame, even if every frame looks the same.

So a new emoji goes into a static slot while the right server has one, and otherwise into an
animated slot as a two-frame WebP:

- The two frames differ by one invisible pixel, because image tools merge identical frames into one.
- WebP keeps smooth transparent edges, where GIF would leave them jagged. Discord serves a converted
  GIF to clients that need one, and it still looks clean on dark and light themes.
- In code an animated emoji is written `<a:name:id>` instead of `<:name:id>`. `parseEmoji` and the
  CDN URLs (`/emojis/<id>.png`) handle both.

## Adding emojis for a game update

1. Publish the new assets from clash-asset-library first. The images come from
   `https://assets.clashperk.com/<slug>`, where the slug is the unit's `slug` in `raw.json`.
2. Build each emoji, 128x128 and cropped to the image, with a `.webp` output for an animated slot
   or `.png` for a static one:

   ```bash
   uv run --with pillow python scripts/make_emoji.py \
     https://assets.clashperk.com/troops/barch_squad/icon.webp /tmp/emojis/barch_squad.webp
   ```

   The file name becomes the emoji name. Use snake_case names, except Town Halls (`TownHall19`).
   An animated game icon (the Blizzard Axe is one) is rendered from its last frame, which is the
   finished icon.
3. Look at the files before uploading them.
4. Upload them to a server with free slots of the right kind. It prints the lines for `emojis.ts`:

   ```bash
   npx tsx -r dotenv/config scripts/upload_emojis.ts 696278607730966600 /tmp/emojis/*_squad.webp
   ```

5. Add the lines to the matching map in `emojis.ts`: `TOWN_HALLS`, `ELIXIR_TROOPS`, `SQUADS`,
   `ELIXIR_SPELLS`, `HERO_EQUIPMENT` and so on. A unit without an emoji is left out of `/units`,
   `/rushed` and the other unit lists, so nothing breaks while it waits for one.
6. Run `npm run check:units`. It lists any non-seasonal unit still missing an emoji or a unit id, and
   rewrites `scripts/assets/troops_export.json`, which the backend copies as its `troops.json`.

## The 19.32 update

Town Hall 19 brought 16 new emojis while the matching servers had 11 free static slots between
them, so most went into animated slots:

| Emojis | Server | Slot |
| --- | --- | --- |
| `TownHall19` | TOWNHALL EMOJIS | Animated |
| The 12 squads (`barch_squad` to `baby_dragon_squad`) | TROOP EMOJIS | Animated |
| `heroic_spell` | LEAGUE & SPELL EMOJIS | Static |
| `shield_brooch` | HERO & CWL EMOJIS | Static |
| `blizzard_axe` | HERO & CWL EMOJIS | Animated |
