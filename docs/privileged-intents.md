# Privileged Intents Review

> Draft answers for Discord's **Request Intents Review** form (Developer Portal → ClashPerk → Bot →
> Privileged Gateway Intents). Update them when the features they describe change.

---

## Which intents we request

| Intent              | Request?                               | Why                                                                                                                                     |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Server Members**  | Yes (reauthorization, already granted) | Real-time member joins for auto-roles and the welcome log, and the full member list for server-wide role sync, member lists and exports |
| **Message Content** | Yes (new)                              | Ticket transcripts, and expanding Clash of Clans share links in channels a server's admins choose                                       |
| **Presence**        | **No**                                 | Nothing in ClashPerk uses online status or activities. Requesting an intent we can't show hurts the submission                          |

The client requests `Guilds`, `GuildMembers`, `GuildWebhooks` and `GuildMessages`
([src/struct/client.ts](../src/struct/client.ts)). `MessageContent` is added only after approval.

---

## The form, field by field

Every field and dropdown on the form, including the ones that only appear after a choice. All
dropdowns offer **Yes** / **No**.

### Application Details

| #   | Field                                                                                                                        | Type                                                  | Shown when |
| --- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ---------- |
| A1  | What does your application do? Please be as detailed as possible, and feel free to include links to image or video examples. | Text                                                  | Always     |
| A2  | Do you have a public Privacy Policy telling your users about their data usage?                                               | Yes / No                                              | Always     |
| A2a | Where is your Privacy Policy available? (Please share a link to your Privacy Policy.)                                        | Text                                                  | A2 = Yes   |
| A3  | Privileged Gateway Intents: "You are applying for reauthorization for the following intents"                                 | Checkboxes: Server Members, Presence, Message Content | Always     |

### Server Members Intent

| #   | Field                                                                                       | Type         | Shown when             |
| --- | ------------------------------------------------------------------------------------------- | ------------ | ---------------------- |
| M1  | Why do you need the Guild Members intent?                                                   | Text         | Server Members checked |
| M2  | Please provide links to screenshots and/or videos that demonstrate your use case            | Text (links) | Server Members checked |
| M3  | Are you storing any API Data off-platform (outside of Discord)?                             | Yes / No     | Server Members checked |
| M3a | Are you storing API Data for 30 days or less?                                               | Yes / No     | M3 = Yes               |
| M3b | How do users contact you to request deletion of their activity data?                        | Text         | M3 = Yes               |
| M3c | Are you encrypting the data that you store at rest, as is required by our developer policy? | Yes / No     | M3 = Yes               |

### Message Content Intent

| #   | Field                                                                                                                                                                        | Type         | Shown when              |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------- |
| C1  | Can users opt-out of having their message content data tracked?                                                                                                              | Yes / No     | Message Content checked |
| C2  | Are you storing message content data off-platform (outside of Discord)?                                                                                                      | Yes / No     | Message Content checked |
| C2a | Are you storing user message content data for 30 days or less?                                                                                                               | Yes / No     | C2 = Yes                |
| C2b | How do users contact you to request deletion of their activity data?                                                                                                         | Text         | C2 = Yes                |
| C2c | Are you encrypting the data that you store at rest, as is required by our developer policy?                                                                                  | Yes / No     | C2 = Yes                |
| C3  | Will the message content data be used to train machine learning or AI Models? ("If yes, please explain how in the text box below, including how such models would be used.") | Yes / No     | Message Content checked |
| C4  | Why do you need the Message Content intent?                                                                                                                                  | Text         | Message Content checked |
| C5  | Please provide links to screenshots and/or videos that demonstrate your use case                                                                                             | Text (links) | Message Content checked |

C3's "text box below" is C4. Choosing **No** on any dropdown adds no extra fields.

### Acknowledgement

A checkbox certifying the answers are accurate and complete, and that the app follows the Developer
Terms of Service and Developer Policy. Then **Submit**.

---

## Draft answers

Answers marked **(after build)** describe link parsing and full ticket transcripts, which are being
built.

### A1. What does your application do?

> ClashPerk is a Clash of Clans community bot used by clan leaders and their members to run their
> clans from Discord. It links Discord accounts to in-game player accounts, posts live clan war,
> Clan Capital, donation and Legend League logs, keeps member roles in sync with in-game roles and
> Town Hall levels, runs rosters for wars and Clan War Leagues, sends war and raid reminders, and
> provides a ticket system for clan applications and support. Servers configure it with slash
> commands or the web dashboard at https://app.clashperk.com. Documentation:
> https://docs.clashperk.com

### A2. Public Privacy Policy

**Yes**. A2a: `https://clashperk.com/privacy`

### A3. Intents

Check **Server Members** and **Message Content**. Leave **Presence** unchecked.

### M1. Why do you need the Guild Members intent?

> ClashPerk keeps Discord roles in sync with each member's Clash of Clans accounts, and it needs
> member events and the member list for that.
>
> 1. **Auto-roles on join (GUILD_MEMBER_ADD).** When someone joins, ClashPerk gives them their clan
>    role, clan rank role and Town Hall role from the accounts they've linked. Without the event,
>    new members wait for the next full sync.
> 2. **Welcome log (GUILD_MEMBER_ADD).** Servers can post a welcome message with a link button to
>    connect their Clash of Clans account.
> 3. **Server-wide role sync (member list).** When in-game rosters change (members join or leave a
>    clan, get promoted, upgrade their Town Hall), ClashPerk updates the roles of every linked
>    member. That requires the server's member list, since the change comes from the game, not from
>    a Discord interaction.
> 4. **Member lists and exports (member list).** `/link list` and `/export` show which server members
>    are linked to which accounts, and which clan members aren't in the server.
> 5. **Rosters and reminders.** Roster roles are given to members on a war roster, and reminders
>    mention the linked members who still have attacks left.
>
> Fetching single members on demand doesn't cover these: the triggers come from the game or from a
> member joining, not from someone using a command.

### M2. Screenshots / videos (Server Members)

Links to the member-join and role-sync demo videos.

### M3. Storing API data off-platform?

**Yes**.

> We store Discord user IDs, server IDs, channel IDs and role IDs that features need: links between
> a Discord user and their Clash of Clans player tags, server settings, roster sign-ups, reminder
> settings and ticket records (who opened a ticket, who claimed or closed it, and the answers the
> member gave to the server's application questions). We don't store member lists. They're read
> when needed and only kept in memory.

- **M3a, 30 days or less?** **No**. Account links and settings are kept while the feature is in
  use, because they are the feature. Ticket records are kept so servers can see their ticket
  history.
- **M3b, deletion requests:**
  > Users can remove their account links themselves with `/link delete`. For any other data, they
  > can ask in our support server (https://discord.gg/ppuppun), which our privacy policy links to,
  > and we delete it within 30 days. Server admins can delete their server's settings,
  > rosters and ticket panels from the dashboard or with the matching commands.
- **M3c, encrypted at rest?** **Yes**.

### C1. Can users opt out? (after build)

**Yes**.

> Message content is only read where a server's admins turn it on. Link parsing is a server setting,
> off by default. Admins pick the channels or categories and the link types (player, clan, army,
> base). Members can also expand a single message themselves with the right-click "Expand Clash
> link" command instead. Ticket transcripts are a per-panel setting that admins can switch off, and
> every ticket says when transcripts are on.

### C2. Storing message content off-platform? (after build)

**No**.

> Link expansion reads a message in memory, picks out the Clash of Clans tag or army code from a
> `link.clashofclans.com` URL, replies with the matching card and keeps nothing. Ticket transcripts
> are built in memory when a ticket closes and uploaded as a file to the server's own log channel
> in Discord. We don't save them anywhere else.

### C3. Used to train ML or AI models?

**No**.

### C4. Why do you need the Message Content intent? (after build)

> ClashPerk needs message content for two features that can't work through interactions.
>
> **1. Ticket transcripts.** ClashPerk runs ticket channels for clan applications and support. When
> staff close a ticket, the bot saves a transcript of the conversation (author, time, text and
> attachment names) as a file in the server's ticket log channel, then deletes the channel. Staff
> use it to review applications later and to settle disputes. The conversation is between the
> applicant and staff, not with the bot, so it can't be collected through commands or modals. Without
> the intent, every member's message reads as empty, and the transcript only holds the bot's own
> messages. Transcripts are on-platform: generated in memory and uploaded to the server's own
> channel. Admins can switch them off per ticket panel.
>
> **2. Clash of Clans link expansion, in channels admins choose.** In Clash of Clans, the Share
> button copies a link (`link.clashofclans.com/...?action=OpenPlayerProfile`, `OpenClanProfile`,
> `CopyArmy`, `OpenLayout`). Players paste these into Discord all day, and the link alone shows
> nothing. ClashPerk replies with a card showing the player, clan, army composition or base layout,
> so everyone in the channel can see it without opening the game. The person reading the link is
> the one who benefits, not the one who posted it, and the poster usually doesn't think to run a
> command. It's a server setting, off by default, and admins choose the channels and link types.
> We also offer a right-click "Expand Clash link" command and @mention support, and the slash
> commands keep working, for servers that don't turn it on.
>
> We only read messages in channels where one of these features is on. We don't store message
> content, log it, or use it for anything else.

### C5. Screenshots / videos (Message Content)

Links to the ticket transcript and link parsing demo videos.

---
