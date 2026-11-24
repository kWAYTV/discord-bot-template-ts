import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

const ROOT_ENV_FILE = "../../.env";

if (existsSync(ROOT_ENV_FILE)) {
  process.loadEnvFile(ROOT_ENV_FILE);
}

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  schema: "./src/*/*.schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
