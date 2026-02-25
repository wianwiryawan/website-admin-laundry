import { pgSchema, foreignKey, serial, boolean, smallint, varchar, numeric,integer, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm"

export const mySchema = pgSchema("data");

export const users = mySchema.table(`users`, {
	users_id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "users_id", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: varchar({ length: 100 }).notNull(),
	status: smallint(),
	email: varchar({ length: 100 }).notNull(),
    created_date: date("created_date").default(sql`now()`),
    updated_date: date("updated_date"),
    created_by: integer("created_by"),
	updated_by: integer("updated_by"),
});

export const perfumesInData = mySchema.table(`perfumes`, {
    perfumes_id: serial("perfumes_id").primaryKey(),
    perfume_name: varchar("perfume_name", { length: 50 }).notNull(),
    price: numeric("price"),
    description: varchar("description", { length: 100 }),
    status: smallint("status"),
    created_date: date("created_date").default(sql`now()`),
    updated_date: date("updated_date"),
    created_by: integer("created_by"),
	updated_by: integer("updated_by"),
});

export const laundryServicesInData = mySchema.table(`laundry_services`, {
    laundry_services_id: serial("laundry_services_id").primaryKey(),
    service_name: varchar("service_name", { length: 100 }).notNull(),
    price: numeric("price"),
    status: smallint("status"),
    created_date: date("created_date").default(sql`now()`),
    updated_date: date("updated_date"),
    created_by: integer("created_by"),
	updated_by: integer("updated_by"),
});

export const customersInData = mySchema.table(`customers`, {
    customers_id: serial("customers_id").primaryKey(),
    customer_name: varchar("customer_name", { length: 100 }).notNull(),
    number_of_transaction: integer("number_of_transaction"),
    phone_number: varchar("phone_number", { length: 25 }),
    wa_available: boolean("wa_available"),
    last_transaction: date("last_transaction"),
    address: varchar("address", { length: 150 }),
    created_date: date("created_date").default(sql`now()`),
    updated_date: date("updated_date"),
    created_by: integer("created_by"),
	updated_by: integer("updated_by"),
});

export const transactionsInData = mySchema.table(`transactions`, {
    transactions_id: serial("transactions_id").primaryKey(),
    transaction_date: date("transaction_date").default(sql`now()`),
    customer_id: integer("customer_id").references(() => customersInData.customers_id),
    laundry_service_id: integer("laundry_service_id").references(() => laundryServicesInData.laundry_services_id),
    perfume_id: integer("perfume_id").references(() => perfumesInData.perfumes_id),
    total_price: numeric("total_price"),
    updated_date: date("updated_date"),
    created_by: integer("created_by"),
	updated_by: integer("updated_by"),
}, (table) => [
    foreignKey({
            columns: [table.customer_id],
            foreignColumns: [customersInData.customers_id],
            name: "transactions_customer_id_customers_customers_id_fk"
        }),
    foreignKey({
            columns: [table.laundry_service_id],
            foreignColumns: [laundryServicesInData.laundry_services_id],
            name: "transactions_service_id_services_services_id_fk"
        }),
    foreignKey({
            columns: [table.perfume_id],
            foreignColumns: [perfumesInData.perfumes_id],
            name: "transactions_perfume_id_perfumes_perfumes_id_fk"
        }),
]);