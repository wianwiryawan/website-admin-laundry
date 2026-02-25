import { defineConfig } from "drizzle-kit";
import { config } from "./db.keys";

export default defineConfig({
  out: "./src/database/drizzle/migrations",
  schema: "./src/database/drizzle/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    ssl: false,
  },
  schemaFilter: ["data"],
});

// To generate
// npx drizzle-kit generate --config=./src/database/drizzle/drizzle.config.ts

// To pull
// dotenvx run -- npx drizzle-kit pull --config=./src/database/drizzle/drizzle.config.ts

// To push
// dotenvx run -- npx drizzle-kit push --config=./src/database/drizzle/drizzle.config.ts