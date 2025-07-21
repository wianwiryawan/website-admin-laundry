import { pgSchema, serial, varchar, numeric, smallint } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("data");

export const perfumes = mySchema.table(`perfumes`, {
    perfums_id: serial("perfumes_id").primaryKey(),
    perfume_name: varchar("perfume_name", { length: 50 }).notNull(),
    price: numeric("price"),
    description: varchar("description", { length: 100 }),
    status: smallint("status"),
});