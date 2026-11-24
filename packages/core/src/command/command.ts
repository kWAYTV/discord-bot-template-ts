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
  defaultMemberPermissions?: PermissionResolvable;
  description: string;
  name: string;
  options?: APIApplicationCommandOption[];
  runPrefix?: (message: Message, args: string[]) => Promise<void>;
  runSlash?: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const COMMAND_ERROR_MESSAGE = "There was an error trying to execute that command!";
