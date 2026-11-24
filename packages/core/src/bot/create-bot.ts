import type { GatewayIntentBits } from "discord.js";
import { Client, Events } from "discord.js";
import { createCommandRegistry } from "../command/command-registry.ts";
import { deployCommands } from "../command/deploy-commands.ts";
import type { PrefixResolver } from "../command/handle-prefix-command.ts";
import { handlePrefixCommand } from "../command/handle-prefix-command.ts";
import { handleSlashCommand } from "../command/handle-slash-command.ts";
import { attachEvents } from "../event/attach-events.ts";
import type { AnyBotEvent, BotEvent } from "../event/bot-event.ts";
import { logger } from "../logger/logger.ts";
import type { Feature } from "./feature.ts";

export interface BotOptions {
  /** Deploy slash commands to this guild only (instant updates). Omit to deploy globally. */
  commandGuildId?: string;
  features: readonly Feature[];
  intents: readonly GatewayIntentBits[];
  /** Enables prefix commands. Requires the MessageContent intent. */
  resolvePrefix?: PrefixResolver;
  token: string;
}

export function createBot(options: BotOptions) {
  const client = new Client({ intents: [...options.intents] });
  const registry = createCommandRegistry(options.features.flatMap((feature) => feature.commands ?? []));

  const events: AnyBotEvent[] = [
    {
      name: Events.ClientReady,
      once: true,
      run: async (readyClient) => {
        await deployCommands(readyClient, registry.commands, options.commandGuildId);
        logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
      },
    } satisfies BotEvent<Events.ClientReady>,
    {
      name: Events.InteractionCreate,
      run: (interaction) => handleSlashCommand(interaction, registry),
    } satisfies BotEvent<Events.InteractionCreate>,
    ...options.features.flatMap((feature) => feature.events ?? []),
  ];

  const { resolvePrefix } = options;
  if (resolvePrefix) {
    events.push({
      name: Events.MessageCreate,
      run: (message) => handlePrefixCommand(message, registry, resolvePrefix),
    } satisfies BotEvent<Events.MessageCreate>);
  }

  attachEvents(client, events);
  logger.info(`Loaded ${options.features.length} features, ${registry.commands.length} commands`);

  return {
    client,
    start: () => client.login(options.token),
  };
}
