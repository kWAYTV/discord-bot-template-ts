import type { BotEvent } from "@repo/core";
import { Events } from "discord.js";
import { forgetGuildPrefix } from "./guild-prefix.ts";

export const forgetPrefixOnLeaveEvent = {
  name: Events.GuildDelete,
  run(guild) {
    forgetGuildPrefix(guild.id);
  },
} satisfies BotEvent<Events.GuildDelete>;
