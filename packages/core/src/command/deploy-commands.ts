import type { Client, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { ApplicationCommandType, InteractionContextType, PermissionsBitField, Routes } from "discord.js";
import { logger } from "../logger/logger.ts";
import type { Command } from "./command.ts";

function toSlashCommandBody(command: Command): RESTPostAPIChatInputApplicationCommandsJSONBody {
  return {
    name: command.name,
    description: command.description,
    type: ApplicationCommandType.ChatInput,
    options: command.options,
    contexts: command.guildOnly ? [InteractionContextType.Guild] : undefined,
    default_member_permissions:
      command.defaultMemberPermissions === undefined
        ? null
        : PermissionsBitField.resolve(command.defaultMemberPermissions).toString(),
  };
}

export async function deployCommands(client: Client<true>, commands: readonly Command[], guildId?: string) {
  const body = commands.filter((command) => command.runSlash).map(toSlashCommandBody);
  const applicationId = client.application.id;
  const route = guildId
    ? Routes.applicationGuildCommands(applicationId, guildId)
    : Routes.applicationCommands(applicationId);

  await client.rest.put(route, { body });
  logger.info(`Deployed ${body.length} slash commands ${guildId ? `to guild ${guildId}` : "globally"}`);
}
