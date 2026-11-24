import { eq } from "drizzle-orm";
import { db } from "../connection/client.ts";
import { users } from "./user.schema.ts";

export async function getUser(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return user;
}

/** Creates the user, or refreshes their username if they already exist. */
export async function upsertUser(userId: string, username: string) {
  const [user] = await db
    .insert(users)
    .values({ id: userId, username })
    .onConflictDoUpdate({ target: users.id, set: { username } })
    .returning();
  return user;
}
