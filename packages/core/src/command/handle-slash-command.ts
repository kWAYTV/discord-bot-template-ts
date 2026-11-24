import type { Interaction } from "discord.js";
import { MessageFlags } from "discord.js";
import { logger } from "../logger/logger.ts";
import { COMMAND_ERROR_MESSAGE } from "./command.ts";
import type { CommandRegistry } from "./command-registry.ts";

export async function handleSlashCommand(interaction: Interaction, registry: CommandRegistry) {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = registry.find(interaction.commandName);
  if (!command?.runSlash) {
    logger.warn(`Unknown slash command: ${interaction.commandName}`);
    return;
  }

  try {
    await command.runSlash(interaction);
  } catch (error) {
    logger.error(error, `Slash command "${interaction.commandName}" failed`);

    const reply = { content: COMMAND_ERROR_MESSAGE, flags: MessageFlags.Ephemeral } as const;
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
}
