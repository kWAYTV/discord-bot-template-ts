import type {
  APIApplicationCommandOption,
  ChatInputCommandInteraction,
  Message,
  PermissionResolvable,
} from "discord.js";

/**
 * A bot command. Implement `runSlash`, `runPrefix`, or both:
 * only commands with `runSlash` are deployed as slash commands.
 */
export interface Command {
  /** Extra names for prefix invocation. */
  aliases?: readonly string[];
  /** Permissions a member needs. Enforced by Discord for slash commands and by the bot for prefix commands. */
  defaultMemberPermissions?: PermissionResolvable;
  description: string;
  /** Only usable inside servers, never in DMs. */
  guildOnly?: boolean;
  name: string;
  options?: APIApplicationCommandOption[];
  runPrefix?: (message: Message, args: string[]) => Promise<void>;
  runSlash?: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const COMMAND_ERROR_MESSAGE = "There was an error trying to execute that command!";
