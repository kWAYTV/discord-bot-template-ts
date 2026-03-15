import type { APIApplicationCommandOption, CommandInteraction, Message, PermissionResolvable } from "discord.js";

export interface CommandMetadata {
  aliases?: string[];
  category?: string;
  clientPermissions?: PermissionResolvable;
  defaultMemberPermissions?: PermissionResolvable;
  description?: string;
  name: string;
  options?: APIApplicationCommandOption[];
  slash?: boolean;
}

export interface ICommand {
  metadata?: CommandMetadata;
  prefixRun?(message: Message, args: string[]): Promise<void> | void;
  slashRun(interaction: CommandInteraction): Promise<void> | void;
}
