# Discord Bot Template

TypeScript monorepo template for production Discord bots. Built with Turborepo, dependency injection, and PostgreSQL.

## Prerequisites

- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io/)
- [PostgreSQL](https://www.postgresql.org/) (Recommended: [Supabase](https://supabase.com/), [Neon](https://neon.com/), [PlanetScale](https://planetscale.com/))

## Quick Start

```bash
cp .env.example .env   # Configure environment variables
pnpm install
pnpm build
pnpm dev
```

## Extending

**Command**

```typescript
@Command({ name: "ping", description: "Pong!" })
export class PingCommand implements ICommand {
  async execute(message: Message) {
    await message.reply("Pong!");
  }
}
```

Place in `apps/bot/src/commands/<category>/`. Auto-registered.

**Event**

```typescript
@Event({ name: Events.ClientReady, once: true })
export class ReadyEvent implements IEvent<"ready"> {
  async run(client: Client) {
    console.log(`Ready as ${client.user.tag}`);
  }
}
```

Place in `apps/bot/src/events/`. Auto-registered.

## Scripts

| Command              | Description                         |
|----------------------|-------------------------------------|
| `pnpm build`         | Build all packages                  |
| `pnpm dev`           | Run bot in watch mode               |
| `pnpm check`         | Lint (no write)                     |
| `pnpm fix`           | Lint and auto-fix                   |
| `pnpm clean`         | Remove `node_modules`, `dist`, turbo cache |

**Scoped runs:** `pnpm -F db push`, `pnpm -F core build`, etc.

## Git

Conventional Commits required. Prefix: `feat:`, `fix:`, `chore:`, etc.

---

Original template by [@appujet](https://github.com/appujet).
