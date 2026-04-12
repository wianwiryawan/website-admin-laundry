import { defineConfig } from "drizzle-kit";
import { config } from "./db.keys";

const DRIZZLE_PATH="./src/database/drizzle";

export default defineConfig({
  out: DRIZZLE_PATH + "/migrations",
  schema: DRIZZLE_PATH + "/migrations/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    ssl: false,
  }
});

// To generate
// npx drizzle-kit generate --config=./src/database/drizzle/drizzle.config.ts

// To pull
// dotenvx run -- npx drizzle-kit pull --config=./src/database/drizzle/drizzle.config.ts

// To push
// dotenvx run -- npx drizzle-kit push --config=./src/database/drizzle/drizzle.config.ts