import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const GUILD_PREFIX_MAX_LENGTH = 10;

export const guilds = pgTable("guilds", {
  id: varchar("id", { length: 255 }).primaryKey(), // Discord guild ID
  prefix: varchar("prefix", { length: GUILD_PREFIX_MAX_LENGTH }).notNull().default("!"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
