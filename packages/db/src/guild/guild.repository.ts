import { eq } from "drizzle-orm";
import { db } from "../connection/client.ts";
import { guilds } from "./guild.schema.ts";

/** Returns the guild's custom prefix, or `undefined` if it never set one. */
export async function getGuildPrefix(guildId: string): Promise<string | undefined> {
  const [guild] = await db.select({ prefix: guilds.prefix }).from(guilds).where(eq(guilds.id, guildId)).limit(1);
  return guild?.prefix;
}

export async function setGuildPrefix(guildId: string, prefix: string): Promise<void> {
  await db
    .insert(guilds)
    .values({ id: guildId, prefix })
    .onConflictDoUpdate({ target: guilds.id, set: { prefix, updatedAt: new Date() } });
}
