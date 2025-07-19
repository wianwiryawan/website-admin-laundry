import { pgSchema, serial, boolean, smallint, varchar, numeric,integer, date } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("data");

export const users = mySchema.table(`users`, {
	users_id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: varchar({ length: 100 }).notNull(),
	status: smallint(),
	email: varchar({ length: 100 }).notNull(),
});

export const perfumes = mySchema.table(`perfumes`, {
    perfums_id: serial("perfumes_id").primaryKey(),
    perfume_name: varchar("perfume_name", { length: 50 }).notNull(),
    price: numeric("price"),
    description: varchar("description", { length: 100 }),
    status: smallint("status"),
});

export const services = mySchema.table(`services`, {
    services_id: serial("services_id").primaryKey(),
    service_name: varchar("service_name", { length: 100 }).notNull(),
    price: numeric("price"),
    status: smallint("status"),
});

export const customers = mySchema.table(`customers`, {
    customers_id: serial("customers_id").primaryKey(),
    customer_name: varchar("customer_name", { length: 100 }).notNull(),
    number_of_transaction: integer("number_of_transaction"),
    phone_number: varchar("phone_number", { length: 25 }),
    wa_available: boolean("wa_available"),
    last_transaction: date("last_transaction"),
    address: varchar("address", { length: 150 }),
});

export const transactions = mySchema.table(`transactions`, {
    transactions_id: serial("transactions_id").primaryKey(),
    transaction_date: date("transaction_date"),
    customer_id: integer("customer_id").references(() => customers.customers_id),
    service_id: integer("service_id").references(() => services.services_id),
    perfume_id: integer("perfume_id").references(() => perfumes.perfums_id),
    total_price: numeric("total_price"),
});