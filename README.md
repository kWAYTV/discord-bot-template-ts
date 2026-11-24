# Discord Bot Template

TypeScript monorepo template for production Discord bots. Built with Turborepo, discord.js, Drizzle and PostgreSQL.
Node runs the TypeScript sources directly (native type stripping), so there is no build step.

## Prerequisites

- [Node.js](https://nodejs.org) 24+
- [pnpm](https://pnpm.io/) 12+
- [PostgreSQL](https://www.postgresql.org/) (or `docker compose up postgres`)

## Quick Start

```bash
cp .env.example .env   # configure environment variables
pnpm install
pnpm -F @repo/db push  # create the tables
pnpm dev
```

## Structure

```
apps/bot/src
├── index.ts                  # composition root: env + features → createBot
├── env.ts                    # bot environment schema
└── features/                 # one folder per domain
    ├── general/
    │   ├── general.feature.ts
    │   └── ping.command.ts
    └── guild-settings/
        └── resolve-guild-prefix.ts
packages/core/src             # bot framework: createBot, commands, events, logger
packages/db/src               # database, one folder per domain (schema + repository)
packages/typescript-config    # shared tsconfig
```

## Adding a feature

**Command** — implement `runSlash`, `runPrefix`, or both. Only commands with `runSlash` are deployed as slash commands.

```typescript
// apps/bot/src/features/general/ping.command.ts
export const pingCommand = {
  name: "ping",
  description: "Replies with Pong!",
  async runSlash(interaction) {
    await interaction.reply("Pong!");
  },
  async runPrefix(message) {
    await message.reply("Pong!");
  },
} satisfies Command;
```

**Event**

```typescript
export const welcomeEvent = {
  name: Events.GuildMemberAdd,
  async run(member) {
    await member.send(`Welcome to ${member.guild.name}!`);
  },
} satisfies BotEvent<Events.GuildMemberAdd>;
```

Group them in a feature and register it in `apps/bot/src/index.ts`:

```typescript
export const generalFeature = {
  name: "general",
  commands: [pingCommand],
  events: [welcomeEvent],
} satisfies Feature;
```

## Scripts

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Run the bot in watch mode             |
| `pnpm typecheck` | Type-check every package              |
| `pnpm check`     | Lint and format check (no write)      |
| `pnpm fix`       | Lint and format with auto-fix         |
| `pnpm clean`     | Remove `node_modules` and turbo cache |

**Database:** `pnpm -F @repo/db generate | migrate | push | studio`

## Git

Conventional Commits are required: `feat:`, `fix:`, `chore:`, etc.

---

Original template by [@appujet](https://github.com/appujet).
