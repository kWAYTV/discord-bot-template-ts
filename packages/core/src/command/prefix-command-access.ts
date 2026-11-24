import type { Message } from "discord.js";
import type { Command } from "./command.ts";

/**
 * Applies the same rules Discord enforces for slash commands to prefix commands.
 * Returns why the author may not run the command, or `undefined` if they may.
 */
export function getPrefixCommandDenial(message: Message, command: Command): string | undefined {
  const requiresGuild = command.guildOnly || command.defaultMemberPermissions !== undefined;

  if (!message.inGuild()) {
    return requiresGuild ? "This command can only be used in a server." : undefined;
  }

  const { defaultMemberPermissions } = command;
  if (defaultMemberPermissions === undefined) {
    return;
  }

  const isAllowed = message.member?.permissions.has(defaultMemberPermissions) ?? false;
  return isAllowed ? undefined : "You don't have permission to use this command.";
}
