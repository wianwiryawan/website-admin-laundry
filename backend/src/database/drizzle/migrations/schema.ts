import { pgTable, pgSchema, serial, varchar, numeric, smallint, integer, boolean, date, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const data = pgSchema("data");


export const laundryServicesInData = data.table("laundry_services", {
	laundryServicesId: serial("laundry_services_id").primaryKey().notNull(),
	serviceName: varchar("service_name", { length: 100 }).notNull(),
	price: numeric(),
	status: smallint(),
});

export const perfumesInData = data.table("perfumes", {
	perfumesId: serial("perfumes_id").primaryKey().notNull(),
	perfumeName: varchar("perfume_name", { length: 50 }).notNull(),
	price: numeric(),
	description: varchar({ length: 100 }),
	status: smallint(),
});

export const customersInData = data.table("customers", {
	customersId: serial("customers_id").primaryKey().notNull(),
	customerName: varchar("customer_name", { length: 100 }).notNull(),
	numberOfTransaction: integer("number_of_transaction"),
	phoneNumber: varchar("phone_number", { length: 25 }),
	waAvailable: boolean("wa_available"),
	lastTransaction: date("last_transaction"),
	address: varchar({ length: 150 }),
});

export const usersInData = data.table("users", {
	usersId: integer("users_id").primaryKey().generatedAlwaysAsIdentity({ name: "data.users_id", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	username: varchar({ length: 100 }).notNull(),
	status: smallint(),
	email: varchar({ length: 100 }).notNull(),
});

export const transactionsInData = data.table("transactions", {
	transactionsId: serial("transactions_id").primaryKey().notNull(),
	transactionDate: date("transaction_date"),
	customerId: integer("customer_id"),
	serviceId: integer("service_id"),
	perfumeId: integer("perfume_id"),
	totalPrice: numeric("total_price"),
}, (table) => [
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customersInData.customersId],
			name: "transactions_customer_id_customers_customers_id_fk"
		}),
	foreignKey({
			columns: [table.serviceId],
			foreignColumns: [laundryServicesInData.laundryServicesId],
			name: "transactions_service_id_services_services_id_fk"
		}),
	foreignKey({
			columns: [table.perfumeId],
			foreignColumns: [perfumesInData.perfumesId],
			name: "transactions_perfume_id_perfumes_perfumes_id_fk"
		}),
]);
