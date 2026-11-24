import type { Command } from "@repo/core";
import { MessageFlags } from "discord.js";

export const pingCommand = {
  name: "ping",
  description: "Replies with Pong!",
  async runSlash(interaction) {
    await interaction.reply({ content: "Pong!", flags: MessageFlags.Ephemeral });
  },
  async runPrefix(message) {
    await message.reply("Pong!");
  },
} satisfies Command;
