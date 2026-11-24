import type { Command } from "@repo/core";
import { GUILD_PREFIX_MAX_LENGTH } from "@repo/db";
import { ApplicationCommandOptionType, MessageFlags, PermissionFlagsBits } from "discord.js";
import { resolveGuildPrefix, updateGuildPrefix } from "./guild-prefix.ts";

/** No whitespace or backticks (they would break the inline-code reply). */
const VALID_PREFIX = new RegExp(`^[^\\s\`]{1,${GUILD_PREFIX_MAX_LENGTH}}$`, "u");

async function showOrUpdatePrefix(guildId: string, newPrefix: string | null): Promise<string> {
  if (!newPrefix) {
    return `The current prefix is \`${await resolveGuildPrefix(guildId)}\``;
  }
  if (!VALID_PREFIX.test(newPrefix)) {
    return `A prefix must be 1-${GUILD_PREFIX_MAX_LENGTH} characters, without spaces or backticks.`;
  }
  await updateGuildPrefix(guildId, newPrefix);
  return `Prefix updated to \`${newPrefix}\``;
}

export const prefixCommand = {
  name: "prefix",
  description: "Show or change the command prefix for this server",
  guildOnly: true,
  defaultMemberPermissions: PermissionFlagsBits.ManageGuild,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "value",
      description: "The new prefix",
      max_length: GUILD_PREFIX_MAX_LENGTH,
    },
  ],
  async runSlash(interaction) {
    if (!interaction.inGuild()) {
      return;
    }
    const content = await showOrUpdatePrefix(interaction.guildId, interaction.options.getString("value"));
    await interaction.reply({ content, flags: MessageFlags.Ephemeral });
  },
  async runPrefix(message, [newPrefix]) {
    if (!message.inGuild()) {
      return;
    }
    await message.reply(await showOrUpdatePrefix(message.guildId, newPrefix ?? null));
  },
} satisfies Command;
