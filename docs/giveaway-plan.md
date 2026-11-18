# Giveaway plan

User request: a button under a posted embed to join a giveaway, a set end time, and an
automatic or manual draw at the end. Optionally restrict entrants to users with a ClashPerk-linked
Clash of Clans account in a chosen set of the guild's clans.

Status: design only, nothing built yet. Decisions taken up front:

- **API first.** Every write (create, enter, draw, reroll, cancel) is a `clashperk-backend`
  endpoint. The bot owns all Discord rendering and the end-time timer, and calls the API for writes.
- **Three eligibility modes, open by default** (from the suggestion thread, 2026-11-18):
  - **Open** — everyone can enter, uniform odds. The default.
  - **Boosted** — everyone can enter, but a user with a connected account in one of the chosen clans
    gets a host-set multiplier (e.g. 2×) on their winning chance, evaluated **at draw time**.
  - **Restricted** — only users with a connected account in one of the chosen clans can enter.
    Everyone else gets a friendly error on the button.
  - The gate is **clan-specific** (confirmed by the requester — not player-specific), and the common
    case is "all clans connected to this server".

## Goals

- Host posts a giveaway message (Components v2, with an optional banner image) with an **Enter**
  button. Entries survive bot restarts and work on any
  shard without re-binding (the roster button model).
- A draw fires automatically at the end time, with a manual **end now** and **reroll** for the host.
- Three eligibility modes — open, boosted (weighted odds for clan members), restricted (clan
  members only) — over a chosen clan set that defaults to all of the guild's connected clans.

## Non-goals (v1)

- No recurring or scheduled-to-start-later giveaways. End time only.
- No per-account entries (one entry per Discord user, not per linked account).
- No prize fulfilment or inventory. The prize is free text the host announces.
- No role reward on win in v1 (easy follow-up — the draw path already has the member).

## Architecture (who owns what)

| Concern | Lives in | Reuses |
|---|---|---|
| Data + all writes (create/enter/draw/reroll/cancel) + eligibility checks | `clashperk-backend` `apps/api` | `apps/api/src/subscribers/` module shape, `JwtAuthGuard` API-key path, `ErrorCodes` |
| The posted message, Enter button, admin commands, announcements | `clashperk-bot` | roster post/signup button scheme |
| End-time timer → calls the draw endpoint | `clashperk-bot` scheduler | `src/struct/clan-war-scheduler.ts` (change stream + `setTimeout` + boot refresh) |

Both repos share the same MongoDB (`MONGODB_URL`, db `clashperk`, replica set) and the same Redis.
The bot already calls the backend through `src/api/axios.ts` (`${INTERNAL_API_BASE_URL}/v1`,
`x-api-key: INTERNAL_API_KEY`). New endpoints are added to the backend, then `npm run generate:api`
in the bot regenerates the typed client (`api.giveaways.*`).

**No backend → Discord call.** The backend never touches discord.js. The bot learns about giveaways
it did not create (another cluster created them) through the DB change stream and a boot sweep, so
any cluster can arm the end-time timer. The single-fire race is resolved in the backend draw
endpoint by an atomic status claim, not in the bot.

### End-to-end flow

1. **Create.** `/giveaway create` → bot calls `POST /v1/giveaways` → gets the giveaway id → posts
   the Components v2 message + Enter button to the channel → `PATCH /v1/giveaways/:id` to attach `channelId` +
   `messageId`. The bot arms a timer for `endsAt`. Every other cluster picks it up via the change
   stream / boot sweep.
2. **Enter.** User clicks Enter → bot routes the custom id to `giveaway-enter` → calls
   `POST /v1/giveaways/:id/enter` with the clicker's `userId`. The backend validates eligibility
   (below), dedupes on `userId`, and returns the new entry count or an `ErrorCodes` reason. The bot
   replies ephemerally ("You're in." or the reason) and throttles edits to the public entry counter.
3. **Draw.** At `endsAt` (or on `/giveaway end`) the bot's scheduler calls
   `POST /v1/giveaways/:id/draw`. The backend atomically claims the giveaway
   (`active → drawing`, returns 409 if already claimed), selects winners, writes
   `status: ended` + `winners`, and returns them. The bot edits the message to **Ended**, lists the
   winners, and announces them with a mention.

## Data model (backend-owned)

Add to `apps/api/src/db/mongodb.module.ts` `Collections`, mirror the same string names into the bot's
`src/util/constants.ts` `Collections`. Entities in `libs/collections/` (backend) and `src/entities/`
(bot).

**`Giveaways`** — one document per giveaway.

```ts
interface GiveawaysEntity {
  _id: ObjectId;
  guildId: string;
  channelId: string;
  messageId: string | null;   // null until the bot posts and PATCHes it back
  hostUserId: string;
  prize: string;
  imageUrl: string | null;    // banner shown in the post, on our R2 CDN (see Images)
  winnerCount: number;        // default 1
  eligibility: GiveawayEligibility;
  status: 'active' | 'drawing' | 'ended' | 'cancelled';
  entryCount: number;         // denormalised for the live counter
  winners: string[];          // userIds, set at draw
  createdAt: Date;
  endsAt: Date;
  endedAt?: Date;
}

interface GiveawayEligibility {
  mode: 'open' | 'boosted' | 'restricted';
  allGuildClans?: boolean;    // resolve the clan set to every clan connected to the guild, live
  clanTags?: string[];        // or an explicit subset. Ignored when mode = 'open'
  boostFactor?: number;       // 'boosted' only. Clan members get this many tickets. Default 2
}
```

**`GiveawayEntries`** — one document per entrant, a separate collection so a popular giveaway never
hits the 16 MB document limit.

```ts
interface GiveawayEntriesEntity {
  _id: ObjectId;
  giveawayId: ObjectId;
  userId: string;
  tags: string[];      // the user's linked tags snapshot at entry, re-checked live at draw
  enteredAt: Date;
}
```

Indexes: `Giveaways` on `{ status: 1, endsAt: 1 }` (scheduler sweep) and `{ guildId: 1, status: 1 }`
(list). `GiveawayEntries` **unique** on `{ giveawayId: 1, userId: 1 }` — this is the dedupe.

No separate schedulers collection. A giveaway has exactly one fire time, so the bot watches
`Giveaways` on `endsAt` directly rather than copying the reminders' two-collection design.

## REST API (backend, `/v1/giveaways`)

New module `apps/api/src/giveaways/` (controller + service + `dto/`), guarded by the API-key path,
registered in `app.module.ts`. DTOs use `class-validator`. Errors are status + `ErrorCodes` only —
no user text, per the house rule. The bot maps each code to the words the user reads.

| Method | Path | Does |
|---|---|---|
| `POST` | `/v1/giveaways` | Create. Body: guildId, hostUserId, channelId, prize, imageUrl, winnerCount, endsAt, eligibility. Returns the giveaway. |
| `PATCH` | `/v1/giveaways/:id` | Attach `messageId` after the bot posts, or edit prize/winnerCount/endsAt while active. |
| `POST` | `/v1/giveaways/:id/enter` | Body: userId. Validates eligibility, dedupes, increments `entryCount`. Returns `{ entryCount }` or an eligibility `ErrorCode`. |
| `POST` | `/v1/giveaways/:id/draw` | Atomic claim `active → drawing`, select winners, set `ended`. Idempotent: 409 / `ErrorCode` if already drawn. Returns winners. |
| `POST` | `/v1/giveaways/:id/reroll` | Re-draw from the remaining eligible pool, excluding current winners. Returns new winners. |
| `POST` | `/v1/giveaways/:id/cancel` | `active → cancelled`, no winners. |
| `GET` | `/v1/giveaways/:id` | State (for refresh / list). |
| `GET` | `/v1/giveaways?guildId=&status=` | List a guild's giveaways (for `/giveaway list`). |

New `ErrorCodes` values to add: `GIVEAWAY_NOT_FOUND`, `GIVEAWAY_NOT_ACTIVE`, `GIVEAWAY_ALREADY_DRAWN`,
`GIVEAWAY_NO_LINKED_ACCOUNT`, `GIVEAWAY_NOT_IN_CLAN`, `GIVEAWAY_ALREADY_ENTERED`.

## Eligibility and odds (the three modes)

The clan set is resolved live: `allGuildClans` expands to `ClanStores` for the guild, else `clanTags`.
"In a chosen clan" means one of the user's `PlayerLinks` accounts is currently a member, checked
against the backend's **tracked** clan membership first (no CoC call), falling back to the CoC API.

| Mode | `enter` behaviour | `draw` odds |
|---|---|---|
| **open** | Anyone, linked or not. | Every entrant 1 ticket. |
| **boosted** | Anyone, linked or not. | 1 ticket, or `boostFactor` tickets if the user is in a chosen clan **at draw time**. |
| **restricted** | Must be in a chosen clan, else reject with `GIVEAWAY_NOT_IN_CLAN` (the bot shows a friendly message). | Every eligible entrant 1 ticket. |

Membership is satisfied by *any* of the user's accounts. The boost and the restricted re-check both
run **at draw time** against live membership — the requester specifically wants the boost evaluated
"at the time of the raffle", so a user who joined or left a clan after entering is scored on where
they are when it ends. Entry-time validation (restricted mode) is fast feedback. Draw-time is the
source of truth.

## Bot: commands + interaction

Commands in `src/commands/giveaway/`, payload `GIVEAWAY_COMMAND` in `scripts/commands/`, wired into
`scripts/commands.ts`, shipped by `npm run deploy`. Manager gate like rosters: `userPermissions:
['ManageGuild']` with a `Settings.GIVEAWAY_MANAGER_ROLE` bypass.

- `/giveaway create` — `prize`, `winners` (default 1), `duration` or `ends-at`, `channel`
  (default current), `mode` (`open` | `boosted` | `restricted`, default `open`), `image` (an
  attachment or image URL, optional). For boosted / restricted: `clans` (a connected-clan picker,
  default all guild clans) and, for boosted, `boost-factor` (default 2). A transient config step
  (ephemeral collector) refines the clan set before posting.
- `/giveaway end <id>` — draw now.
- `/giveaway reroll <id>` — reroll winners.
- `/giveaway cancel <id>` — cancel without drawing.
- `/giveaway list` — active giveaways in the guild.

**The post is a Components v2 message** (`MessageFlags.IsComponentsV2`), not a classic embed — the
`discord-components` skill in this repo is the reference. One `ContainerBuilder` with a mode-coloured
accent holds, top to bottom:

- `TextDisplayBuilder` — `# 🎉 Giveaway · <prize>` and the description.
- `MediaGalleryBuilder` with the banner — only when `imageUrl` is set (see Images).
- `TextDisplayBuilder` — winners, ends-at (Discord relative timestamp), eligibility line, and a
  `-#` subtext footer with the host and live entry count.
- `SeparatorBuilder`, then an `ActionRowComponents` row with the **Enter** button.

A v2 message carries **no `content` and no `embeds`** — everything is components, and the two cannot
be mixed. The ended message and the winner announcement are built the same way (greyed accent, the
Enter button disabled, winners listed).

**Enter button** uses the persistent, restart-safe scheme (roster model): custom id
`client.redis.createCustomId({ cmd: 'giveaway-enter', giveaway: <ObjectId hex> })`. On click,
`handleComponentInteraction` routes `cmd` to the `giveaway-enter` command, which loads nothing from
memory — it calls the enter endpoint and renders the result. Works across restarts and all clusters
with no re-binding.

**Images.** The host attaches an image to `/giveaway create`. The bot uploads it as the posted
message's own attachment and references it from a `MediaGalleryBuilder` with `attachment://`, so the
banner lives with the message and never breaks — no R2 needed in v1. The attachment URL is also sent
to the API as `imageUrl` for the record and the future dashboard. The ended message drops the banner.
(Follow-up: a dashboard upload has no Discord message to host it, so that path will need R2.)

**End-time timer**: new `src/struct/giveaway-scheduler.ts` modelled on `clan-war-scheduler.ts` —
watch `Collections.GIVEAWAYS` via `client.changeStreams` for active giveaways, `setTimeout` to
`endsAt`, a 5-minute `_refresh` sweep for overdue / near-future rows after a restart, and on fire
call `POST /v1/giveaways/:id/draw` then render. `.init()` next to the other schedulers in
`src/struct/client.ts`. The backend's atomic claim means several clusters firing the same giveaway is
harmless — only one draw wins, the rest get 409.

**Entry counter**: v1 does not live-edit the posted message (editing a banner message means
re-uploading the attachment). The running count is shown in the private "You're in" reply, and the
final total appears when the giveaway ends. A throttled live counter on the message is a follow-up.

## Winner selection

- Build a ticket pool at draw: each eligible entrant gets 1 ticket, or `boostFactor` tickets in
  boosted mode when they are in a chosen clan at draw time.
- Draw `winnerCount` **distinct** winners by weighted sampling without replacement (pick one by
  weight, remove, repeat). One Discord user wins at most once regardless of ticket count.
- Resolve live membership for boosted/restricted by fetching each allowed clan's member list once
  (CoC API, one call per clan) into a tag set, not a call per entrant, so a large giveaway stays cheap.

## Edge cases

- Fewer eligible entrants than `winnerCount` → everyone eligible wins, note it in the announcement.
- No eligible entrants at draw → the post shows "No valid entries", no winners.
- Restricted winner left the clan after entering → dropped at the draw re-check, pool tops up.
- Boosted entrant who left every chosen clan → stays in the draw at 1 ticket (base odds), not removed.
- Message deleted before draw → draw still records winners, announce in-channel, skip the edit.
- Bot removed from guild → `hasCustomBot` / membership guard, cancel quietly.
- Restart mid-giveaway → change-stream row + boot sweep re-arm the timer, no lost draws.
- Host edits `endsAt` while active → change stream re-queues the timer.

## Build order

Backend first (API-first), bot second, because the bot's client is generated from the backend spec.

1. **Backend**: `Giveaways` + `GiveawayEntries` collections + entities + indexes, new `ErrorCodes`,
   the `giveaways` module (create / patch / enter / draw / reroll / cancel / get / list) with
   eligibility + atomic draw claim. Swagger annotated.
2. **Bot client**: `npm run generate:api` to pull in `api.giveaways.*`.
3. **Bot**: `Collections.GIVEAWAYS` / `GIVEAWAY_ENTRIES` mirror + entities, `src/commands/giveaway/*`,
   the Enter button + `giveaway-enter` routing, `GIVEAWAY_COMMAND` payload, `src/struct/giveaway-scheduler.ts`
   + `.init()`, Components v2 message rendering + banner upload + announcement,
   `Settings.GIVEAWAY_MANAGER_ROLE`.
4. **Deploy**: backend ship, then bot `npm run deploy` for the slash commands.
5. **Docs**: user-facing page on `docs.clashperk.com`, bump `package.json` patch in both repos.

## Status

Built on branch `feat/giveaways` in **clashperk-backend** (2.0.176) and **clashperk-bot** (4.2.199).
Backend builds + swagger spec passes; bot builds + lint passes; the API client is regenerated.
Not deployed, not committed. Remaining before it runs: deploy the backend, run the bot's
`npm run deploy` for the slash commands, and smoke-test in a server.

Decisions settled during the build:

- **One entry per Discord user** (unique index on `{giveawayId, userId}`), not per account.
- **Boost factor** defaults to 2 and is host-settable per giveaway (2–100).
- **Clan membership** is read live from the CoC API clan member lists, one call per allowed clan.
- **Banner** is hosted as the message's own attachment (no R2 in v1).
- **No winner role reward** in v1.
- Clan scope in v1 is "all server clans" by default, or **one** clan via the `clan` option. Narrowing
  to an arbitrary subset is a follow-up (the data model already supports `clanTags[]`).

## Open items

- Deploy order, then smoke-test create → enter (all three modes) → draw → reroll → cancel.
- `docs.clashperk.com` user-facing page.
- Dashboard surface (the second front end) — not built this pass.
- Follow-ups: live entry counter on the message, multi-clan subset picker, R2 for dashboard uploads,
  winner role reward.
