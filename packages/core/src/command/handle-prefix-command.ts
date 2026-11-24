import type { Message } from "discord.js";
import { logger } from "../logger/logger.ts";
import { COMMAND_ERROR_MESSAGE } from "./command.ts";
import type { CommandRegistry } from "./command-registry.ts";

/** Returns the command prefix for a guild (`null` in DMs). */
export type PrefixResolver = (guildId: string | null) => Promise<string> | string;

const WHITESPACE = /\s+/u;

export async function handlePrefixCommand(message: Message, registry: CommandRegistry, resolvePrefix: PrefixResolver) {
  if (message.author.bot) {
    return;
  }

  const prefix = await resolvePrefix(message.guildId);
  if (!message.content.startsWith(prefix)) {
    return;
  }

  const [name, ...args] = message.content.slice(prefix.length).trim().split(WHITESPACE);
  const command = name ? registry.find(name.toLowerCase()) : undefined;
  if (!command?.runPrefix) {
    return;
  }

  try {
    await command.runPrefix(message, args);
  } catch (error) {
    logger.error(error, `Prefix command "${command.name}" failed`);
    await message.reply(COMMAND_ERROR_MESSAGE);
  }
}
