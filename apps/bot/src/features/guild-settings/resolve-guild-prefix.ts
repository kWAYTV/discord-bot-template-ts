import type { PrefixResolver } from "@repo/core";
import { getGuildPrefix } from "@repo/db";
import { env } from "../../env.ts";

export const resolveGuildPrefix: PrefixResolver = async (guildId) => {
  const customPrefix = guildId ? await getGuildPrefix(guildId) : undefined;
  return customPrefix ?? env.DEFAULT_PREFIX;
};
