import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "./db.keys";
import { Pool } from "pg";
import * as schema from "./schema/data";

const pool = new Pool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USERNAME,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

export const db = drizzle(pool, { schema });