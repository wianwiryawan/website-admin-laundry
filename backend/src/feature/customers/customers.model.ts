import { pgSchema, serial, date, integer, varchar, boolean } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("data");

export const customers = mySchema.table(`customers`, {
    customers_id: serial("customers_id").primaryKey(),
    customer_name: varchar("customer_name", { length: 100 }).notNull(),
    number_of_transaction: integer("number_of_transaction"),
    phone_number: varchar("phone_number", { length: 25 }),
    wa_available: boolean("wa_available"),
    last_transaction: date("last_transaction"),
    address: varchar("address", { length: 150 }),
});