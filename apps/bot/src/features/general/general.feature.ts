import type { Feature } from "@repo/core";
import { pingCommand } from "./ping.command.ts";

export const generalFeature = {
  name: "general",
  commands: [pingCommand],
} satisfies Feature;
