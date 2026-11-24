import type { Feature } from "@repo/core";
import { forgetPrefixOnLeaveEvent } from "./forget-prefix-on-leave.event.ts";
import { prefixCommand } from "./prefix.command.ts";

export const guildSettingsFeature = {
  name: "guild-settings",
  commands: [prefixCommand],
  events: [forgetPrefixOnLeaveEvent],
} satisfies Feature;
