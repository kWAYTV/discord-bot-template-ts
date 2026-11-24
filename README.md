# discord-bot-template-ts

Discord bot starter: discord.js, Drizzle + Postgres, Turborepo. No build step, Node runs the `.ts` files directly.

Needs Node 24+ and pnpm 12+.

```bash
cp .env.example .env
pnpm install
pnpm -F @repo/db push
pnpm dev
```

## Layout

- `apps/bot` – the bot. Each folder in `src/features` is one feature, registered in `src/index.ts`.
- `packages/core` – `createBot`, command/event handling, logger.
- `packages/db` – schema and queries, one folder per table.

## Commands

```ts
export const pingCommand = {
  name: "ping",
  description: "Pong!",
  async runSlash(interaction) {
    await interaction.reply("Pong!");
  },
  async runPrefix(message) {
    await message.reply("Pong!");
  },
} satisfies Command;
```

Add it to a feature's `commands` array. Use `runSlash`, `runPrefix` or both. `guildOnly` and `defaultMemberPermissions` work for both.

Events work the same way: `{ name: Events.X, run() {} } satisfies BotEvent<Events.X>` in the feature's `events` array.

## Scripts

- `pnpm dev` – run with watch
- `pnpm typecheck`
- `pnpm check` / `pnpm fix` – lint and format
- `pnpm release` – bump, tag, push
- `pnpm -F @repo/db generate | migrate | push | studio`

Commits follow [Conventional Commits](https://www.conventionalcommits.org).

Based on [appujet](https://github.com/appujet)'s template.
