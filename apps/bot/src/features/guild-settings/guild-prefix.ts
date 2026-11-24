import type { PrefixResolver } from "@repo/core";
import { getGuildPrefix, setGuildPrefix } from "@repo/db";
import { env } from "../../env.ts";

/**
 * Custom prefix per guild (`undefined` = uses the default), cached so that
 * prefix resolution doesn't hit the database on every message.
 */
const customPrefixes = new Map<string, string | undefined>();

export const resolveGuildPrefix: PrefixResolver = async (guildId) => {
  if (!guildId) {
    return env.DEFAULT_PREFIX;
  }
  if (!customPrefixes.has(guildId)) {
    customPrefixes.set(guildId, await getGuildPrefix(guildId));
  }
  return customPrefixes.get(guildId) ?? env.DEFAULT_PREFIX;
};

export async function updateGuildPrefix(guildId: string, prefix: string): Promise<void> {
  await setGuildPrefix(guildId, prefix);
  customPrefixes.set(guildId, prefix);
}

export function forgetGuildPrefix(guildId: string): void {
  customPrefixes.delete(guildId);
}
