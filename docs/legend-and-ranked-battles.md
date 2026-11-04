# Legend and Ranked Battles

> Developer reference for how Legend League battles, ranked tournament battles and the Monday trophy resets work in the game, and how ClashPerk tracks and shows them. All times are UTC.

---

## Table of Contents

- [Overview](#overview)
- [Trophy Calculation](#trophy-calculation)
- [Legend League](#legend-league)
- [What Happens at 05:00](#what-happens-at-0500)
- [Ranked Battles](#ranked-battles)
- [How ClashPerk Tracks Them](#how-clashperk-tracks-them)
- [Known Gaps](#known-gaps)
- [Sources](#sources)

---

## Overview

Clash of Clans has two trophy systems for home-village multiplayer. Legend League I is the top league and runs on a daily cycle. Every league below it, Legend League III and II included, runs weekly ranked tournaments. Both turn over on Monday at 05:00: Legend League resets trophies to 5000, and a new ranked week begins.

|                                | Legend League                                                                     | Ranked leagues                                                    |
| ------------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Who                            | Legend League I (`105000036`)                                                     | Skeleton League 1 (`105000001`) to Legend League II (`105000035`) |
| Cycle                          | Game days from 05:00 to 05:00, inside a 28-day season                             | Tournament weeks, Monday 05:00 to the next Monday                 |
| Battles                        | 8 attacks and 8 defenses a day                                                    | A per-league number of attacks a week, 6 to 30                    |
| Trophies                       | The attacker gains what the defender loses, 0 to 40                               | A 40-trophy pool is split between attacker and defender           |
| Reset                          | Players under 5000 go to 5000 every Monday. Everyone goes to 5000 at season start | Each week starts a new group. Rank decides promotion and demotion |
| `battle_type` in `battle_logs` | `legend`                                                                          | `ranked`                                                          |

Other battle types, such as `homeVillage` farming, don't move league trophies. The tracker skips them.

## Trophy Calculation

Both leagues use the same attack formula. They differ in what the defender gets and in what happens to defenses a player never received. The game's battle log has no trophy count and no trophy change, only stars and destruction, so radar-service computes each change with `calculateTrophies` (`services/battle_logs/entities.go`). The bot has the same function in `src/helper/legends.helper.ts`.

Each rule below is marked with where it comes from: **Supercell** (official support articles), **wiki** (the fan wiki), **our data** (checked against the game's own trophy count) or **our code** (only what our code does, not checked).

### Attacks: the same in both leagues

| Stars | Attacker gains                               | Example            | Source                                        |
| ----- | -------------------------------------------- | ------------------ | --------------------------------------------- |
| 3     | 40                                           | 3 stars → +40      | Supercell (40 at most), our data              |
| 2     | 16, plus 1 for every full 3% over 50%        | 2 stars, 80% → +26 | Wiki, our data                                |
| 1     | 5, plus 1 for every full 9% over 1%          | 1 star, 55% → +11  | Wiki, our data                                |
| 0     | 1 for every full 10%: 0 under 10%, at most 4 | 0 stars, 45% → +4  | Supercell (nothing under 10%), wiki, our data |

```math
\text{0 stars: } \lfloor d / 10 \rfloor \qquad \text{1 star: } 5 + \lfloor (d - 1) / 9 \rfloor \qquad \text{2 stars: } 16 + \lfloor (d - 50) / 3 \rfloor
```

Checked on the October 2026 season against Legend attacks with no other battle within 20 minutes: 99.7% of 1-, 2- and 3-star attacks match exactly. Until radar-service #64, the 0-star rule was `1 + (d − 9) / 10`, one trophy too many at 9%, 19%, 29%, 39% and 49%.

### Defenses

|                            | Legend League I                                                              | Ranked leagues                                                 |
| -------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| A defense                  | The defender loses what the attacker gains (Supercell)                       | The defender gains 40 minus what the attacker gains (our code) |
| A 0-star defense           | Costs nothing, even when the attacker earns a trophy or two (wiki, our data) | The defender gains all 40 (our code)                           |
| Trophies during the period | Go up and down all season                                                    | Only go up, and reset to 0 each week (wiki)                    |

### Defenses a player never got

A Legend player can be attacked 8 times a day, and a ranked player a set number of times a week. When fewer attacks come in, the game fills in the rest at the end of the period:

|          | Legend League I                                                                    | Ranked leagues                                                       |
| -------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| When     | At the end of each game day, 05:00                                                 | At the end of the week, Monday 05:00                                 |
| How much | Each missing defense costs the average defense loss of that day and the day before | Each missing defense earns the average of the week's defenses (wiki) |
| Source   | Wiki, and our data: 93% of these drops match exactly                               | Wiki only                                                            |

For Legend, the amount is `trunc(sum of the defense changes of both days / their count) × missing defenses`. For example, `#P9UUVG99P` had 7 defenses on 2026-10-18 (−259) and 8 the day before (−274). At 05:08 on 10-19 the trophy count dropped by `trunc(−533 / 15) × 1 = −35`, with no battle behind it.

### Ending a day or week

- **Legend League I:** end trophies = start + attack gains + defense losses + missing-defense deduction. Mondays may also have a reset (next section).
- **Ranked:** the week's total = attack gains + defense gains + missing-defense trophies.

## Legend League

A Legend player gets 8 attacks and 8 defenses per game day (Supercell).

- **Game day.** A game day runs from 05:00 to 05:00 the next day. A battle at 03:00 on a Tuesday belongs to Monday.
- **Season.** A season is 28 game days, a 4-week tournament, and starts on a Monday at 05:00. Seasons follow every 28 days from 2025-10-06 05:00. A season's id is its start date, for example `2026-11-02`.
- **Season helpers.** `Season.leagueId` and `Season.getLeagueSeasonById()` (from `clashofclans.js` in the bot and `@app/clash-client` in the backend) work out the current season, and the `battle_season` column uses the same anchor.

## What Happens at 05:00

Every day at 05:00 a Legend player's trophies can change with no battle behind them, and on Mondays more can happen. Supercell's [Legend League article](https://support.supercell.com/clash-of-clans/en/articles/legend-league-4.html) gives the weekly rules:

> If you finish the week in Legend I below rank 10,000, you'll be demoted to Legend II. If you remain in Legend I and finish the week below 5,000 Trophies, your Trophies will be reset to 5,000 at the start of the next week.

| Change                    | When                      | Who                                                                     | Example                                                     | Source              |
| ------------------------- | ------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------- |
| Missing-defense deduction | Every day 05:00           | Players with fewer than 8 defenses the day before                       | `#P9UUVG99P` 5035 → 5000 (10-19), −35 for 1 missing defense | Wiki, our data      |
| Weekly reset              | Every Monday 05:00        | Players in the top 10,000 under 5000, up to 5000                        | `#P2Y2098VC` 4931 → 5000 (10-26)                            | Supercell, our data |
| Season start              | Every fourth Monday 05:00 | Everyone, up or down to 5000. Trophies over 5000 become Legend Trophies | `#LCG09V2YP` 5064 → 5000 (11-02)                            | Supercell, our data |
| Demotion                  | Every Monday 05:00        | Players below rank 10,000, to Legend League II                          | Tracking stops                                              | Supercell, our data |

On a mid-season Monday a player can only move **up** to 5000. A move down that ends at 5000 is a missing-defense deduction that happened to land there, like `#P9UUVG99P` above.

Our data matches. On the October 2026 season's three mid-season Mondays:

- **Reset.** 1,869 to 3,934 tracked players moved up to exactly 5000 within 90 minutes of 05:00, with no battle behind it. 92–95% of them already had all 8 attacks of the day before stored, so it can't be missed battles. No one moved up to 5000 this way on the Tuesdays checked.
- **Demoted.** On 10-12, another 2,237 players under 5000 stopped being tracked at 05:00. The 517 who battled again by Tuesday did so as `ranked` battles, nearly all in Legend League II (`105000035`). Demotion goes by rank, not trophies, which is why their trophies overlap with the players who were reset.
- **Missing-defense deduction.** 25,110 days with 1 to 7 stored defenses were followed by a battle-free drop within 90 minutes of 05:00, and 93% match the deduction exactly. 87% of all battle-free drops right after 05:00 follow such a day.

### What the tracker sees

radar-service's `legend_logs` service polls each player's trophies. It writes every change to `LegendAttacks` (one document per player per season) as `{ timestamp, start, end, inc, type }`. A reset or a deduction looks like any other change:

- `type` is `attack` when trophies go up and `defense` when they go down.
- `timestamp` is when the tracker noticed the change, not when it happened. The tracker notices it on a later poll, a median of about 4 minutes after 05:00.
- If the player battles before that poll, the same logged change holds the battle too, for example `#8222989GL` 4942 → 5031 at 05:31 (reset to 5000, then a +31 attack at 05:29).

### How the API tells them apart

The backend does this in `apps/api/src/legends/services/legend-days.service.ts`. Nothing else re-implements it. Only the **first** logged change after 05:00 can hold what the game did at 05:00.

A change is a **reset** (`findResets`) when:

1. It's the first change after a Monday 05:00, logged within 90 minutes of it.
2. It starts below 5000, or anywhere but 5000 on a season's first Monday.
3. No stored battle in it ended before 05:00.
4. Its end equals 5000 plus the stored battles it holds. With no battles, it ends at exactly 5000.

A change is a **missing-defense deduction** (`findMissedDefenses`) when:

1. It's the first change after any 05:00, logged within 90 minutes of it, and it goes down.
2. No stored battle is in it.
3. The day before had 1 to 7 stored defenses, and the drop equals the deduction for them exactly.

Anything else is treated as battles. A change that's close but not exact is left alone rather than guessed at.

### How they're shown

A reset day starts after the reset. A deduction counts as defense trophies of the day it was for, the day before. Both days then add up: end = start + attack trophies + defense trophies.

| Where                             | What it shows                                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `GET /legends/:playerTag/days`    | `initialTrophies` after the reset, with `reset: { from, to }`. `defenseTrophies` includes `missedDefenseTrophies` |
| `GET /legends/:playerTag/seasons` | Season attack and defense totals without resets. Deductions count as defense trophies                             |
| Bot `/legend days`                | "Reset to 5000 (from 4931)" above Initial Trophies                                                                |
| Dashboard Legends tab             | Start, attacks, defenses, net and end for each day, with "Reset from" under a reset day's start                   |

## Ranked Battles

Below Legend League I, players compete in weekly tournaments. Each week a player joins a group in their league and attacks other members. When the week ends, rank in the group decides who moves up a league and who moves down.

- **Week.** A tournament week runs from Monday 05:00 to the next Monday 05:00. Its id is the Monday's date (`Util.getTournamentWindow()` in `clashofclans.js`).
- **Between weeks.** The bot treats Monday 05:00 to Tuesday 05:00 as a gap between tournaments (`Season.isTournamentReset`). During it, it shows the past week and when the next one starts.
- **Trophies.** See [Trophy Calculation](#trophy-calculation). The player's `trophies` is the week's tournament total.
- **Attacks and zones.** Each league allows a set number of attacks a week. The top share of the group is promoted and the bottom share is demoted:

| League                                  | Attacks a week | Promoted (top) | Demoted (bottom) |
| --------------------------------------- | -------------- | -------------- | ---------------- |
| Skeleton League 1                       | 6              | 50%            | 0%               |
| Skeleton League 2 to Barbarian League 6 | 6              | 50%            | 5%               |
| Archer League 7 and 8                   | 8              | 50%            | 5%               |
| Archer League 9                         | 8              | 40%            | 5%               |
| Wizard League 10                        | 8              | 35%            | 10%              |
| Wizard League 11                        | 8              | 50%            | 10%              |
| Wizard League 12                        | 8              | 40%            | 10%              |
| Valkyrie League 13                      | 10             | 35%            | 10%              |
| Valkyrie League 14                      | 10             | 50%            | 10%              |
| Valkyrie League 15                      | 10             | 40%            | 10%              |
| Witch League 16                         | 10             | 35%            | 10%              |
| Witch League 17                         | 10             | 50%            | 10%              |
| Witch League 18                         | 10             | 40%            | 10%              |
| Golem League 19                         | 12             | 35%            | 10%              |
| Golem League 20                         | 12             | 50%            | 10%              |
| Golem League 21                         | 12             | 40%            | 10%              |
| P.E.K.K.A League 22                     | 12             | 30%            | 15%              |
| P.E.K.K.A League 23                     | 12             | 50%            | 15%              |
| P.E.K.K.A League 24                     | 12             | 40%            | 15%              |
| Titan League 25                         | 12             | 30%            | 15%              |
| Titan League 26                         | 12             | 50%            | 15%              |
| Titan League 27                         | 12             | 40%            | 15%              |
| Dragon League 28                        | 14             | 30%            | 15%              |
| Dragon League 29 and 30                 | 14             | 25%            | 15%              |
| Electro League 31 and 32                | 18             | 20%            | 15%              |
| Electro League 33                       | 18             | 15%            | 15%              |
| Legend League III                       | 24             | 5%             | 15%              |
| Legend League II                        | 30             | 3%             | 15%              |

The table comes from `BattlesPerWeek` and `LeaguePromotionsMap` in `src/util/constants.ts`. Zone sizes are rounded up from the group size, so in a group of 30 a 15% demotion zone is the last 5.

### Where ranked data comes from

- **The player's group.** The official league group endpoint, using the player's `currentLeagueGroupTag` and `currentLeagueSeasonId`. It returns every member's rank and the player's attack and defense logs for the week. The bot reads it live in `getTournament` (`src/helper/legends.helper.ts`).
- **Battle history.** radar-service writes ranked battles to `battle_logs` like legend ones, with `battle_type = 'ranked'` and `battle_week` set to the week's Monday.
- **League moves.** The clan ranked log reads each member's league and trophies per week from ClickHouse `player_trophy_records` (`src/core/ranked-battle-log.ts`).

## How ClashPerk Tracks Them

Two trackers in radar-service write the data. Two official API endpoints feed them, and the endpoints don't update together.

| Store                    | Written by            | From                       | Holds                                                                                            | Lacks                                                                                                |
| ------------------------ | --------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| ClickHouse `battle_logs` | `battle_logs` service | `/players/{tag}/battlelog` | Every battle: type, attack or defense, stars, destruction, computed trophy change, when it ended | The player's trophy count at that moment. `trophies` is copied from the players endpoint and can lag |
| Mongo `LegendAttacks`    | `legend_logs` service | `/players/{tag}`           | Each change in the player's trophy count: start, end, change, when it was noticed                | Which battle caused it. Several battles between two polls merge into one entry                       |

- **`battle_logs`.** It's a `ReplacingMergeTree` keyed on `(player_tag, battle_hash)`. Read it with `FINAL`. `ingested_at` is the game's `battleTimestamp`, which is when the battle ended. `battle_date` is the game day of that time.
- **The battle log endpoint.** It returns the player's last 50 battles of every type, farming included. Each poll skips `homeVillage` battles and stores those from the last 24 hours, at most 16 (radar-service #62).
- **How the API combines them.** `GET /legends/:playerTag/days` takes start and end trophies from `LegendAttacks` and the battles from `battle_logs`, then splits both into game days. The bot's `/legend days` and the dashboard's Legends tab both read this route.

## Known Gaps

The first measurement, on the September and October 2026 seasons, blamed most days that don't add up on battles lost around 05:00 and on tracker outages. It didn't know about the missing-defense deduction, which explains most battle-free drops right after 05:00, so those shares were too high. The table shows what's known now.

| Gap                       | What happens                                                                                                                                   | Status                                                                                                                                 |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Missing-defense deduction | The deduction was logged on the next day with no battle behind it                                                                              | Fixed in the days route (backend #105)                                                                                                 |
| Monday resets             | The reset was counted as a battle                                                                                                              | Fixed: days route, bot #472, backend #103, dashboard #199. Moves down mid-season and resets logged with a battle fixed in backend #105 |
| 0-star trophies           | One trophy too many at 9%, 19%, 29%, 39% and 49%                                                                                               | Fixed for new battles in radar-service #64 and the bot. Rows already stored keep the old value                                         |
| Battles lost around 05:00 | A battle ending just before 05:00 but first seen after it was dropped                                                                          | Fixed in radar-service #62. Its share was overstated, and needs measuring again                                                        |
| Tracker outages           | A tracker stops polling for a while and misses changes or battles                                                                              | Open. Needs measuring again, then stall alerts                                                                                         |
| Season boundary           | A season's last battles, just before 05:00 on its last day, are logged in the next season's `LegendAttacks` document, so that day can't add up | Open                                                                                                                                   |
| Endpoint lag              | The trophy count and the battle log update at different times, so a change can land on the next day                                            | Open                                                                                                                                   |
| Late tracking start       | A new Legend player is tracked a median 4.2 hours after arriving, so day 1 is partial                                                          | Open                                                                                                                                   |
| Battle day by end time    | `battle_date` uses when a battle ended. A battle started before 05:00 counts on the next day                                                   | In progress on radar-service `fix/battle-day-by-start-time`, using the game's `battleTime` (duration)                                  |

The `LegendAttacks` timestamp is when a change was noticed: a median 3.8 minutes late, and 13–15 minutes at the 99th percentile. Farming doesn't push legend battles out of the 50-battle window: the shortest span of 50 battles we saw was 31 hours.

## Sources

- **Supercell:** [Legend League](https://support.supercell.com/clash-of-clans/en/articles/legend-league-4.html) and [Ranked Leagues](https://support.supercell.com/clash-of-clans/en/articles/ranked-leagues-4.html). Official, but they don't give the full trophy formulas or the missing-defense rules.
- **Wiki:** [Legend League Tournaments](https://clashofclans.fandom.com/wiki/Legend_League_Tournaments) and [Ranked Battles](https://clashofclans.fandom.com/wiki/Ranked_Battles). Not official. The 0-, 1- and 2-star steps are in a part of the Legend page that's hidden in the page source.
- **Our data:** checked against the game's own trophy count in `LegendAttacks` on the October 2026 season. This covers Legend League I only. The ranked rules marked "our code" haven't been checked, because `battle_logs` doesn't hold every ranked battle of enough players to compare weekly totals.
