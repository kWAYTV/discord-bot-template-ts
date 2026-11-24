import { createBot, logger } from "@repo/core";
import { GatewayIntentBits } from "discord.js";
import { env } from "./env.ts";
import { generalFeature } from "./features/general/general.feature.ts";
import { resolveGuildPrefix } from "./features/guild-settings/guild-prefix.ts";
import { guildSettingsFeature } from "./features/guild-settings/guild-settings.feature.ts";

const bot = createBot({
  token: env.DISCORD_TOKEN,
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  features: [generalFeature, guildSettingsFeature],
  commandGuildId: env.NODE_ENV === "development" ? env.DEV_GUILD_ID : undefined,
  resolvePrefix: resolveGuildPrefix,
});

try {
  await bot.start();
} catch (error) {
  logger.fatal(error, "Failed to start bot");
  process.exit(1);
}
