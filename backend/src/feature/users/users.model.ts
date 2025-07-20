import { pgSchema,smallint, varchar,integer } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("data");

export const users = mySchema.table(`users`, {
    users_id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
    username: varchar({ length: 100 }).notNull(),
    status: smallint(),
    email: varchar({ length: 100 }).notNull(),
});