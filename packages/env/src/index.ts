import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DISCORD_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().url(),
    DEFAULT_PREFIX: z.string().min(1).default("!"),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DEV_GUILD_ID: z.string().min(1),
  },
  runtimeEnvStrict: {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    DEFAULT_PREFIX: process.env.DEFAULT_PREFIX,
    NODE_ENV: process.env.NODE_ENV,
    DEV_GUILD_ID: process.env.DEV_GUILD_ID,
  },
  emptyStringAsUndefined: true,
});
