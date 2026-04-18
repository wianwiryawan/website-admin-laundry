import { pgTable, serial, varchar, integer, boolean, timestamp, numeric, smallint, index } from "drizzle-orm/pg-core"

export const perfume = pgTable("perfume", {
	perfumeId: serial("perfume_id").primaryKey().notNull(),
	perfumeName: varchar("perfume_name", { length: 50 }).notNull(),
	price: numeric("price", { precision: 10, scale: 2 }),
	description: varchar("description", { length: 100 }),
	status: smallint("status").notNull().default(1).$type<0 | 1 | 2>(), // 0 = inactive, 1 = active, 2 = deleted
	createdDate: timestamp("created_date").defaultNow().notNull(),
	updatedDate: timestamp("updated_date"),
	deletedDate: timestamp("deleted_date"),
	createdBy: integer("created_by").notNull().references(() => user.userId),
	updatedBy: integer("updated_by").references(() => user.userId),
	deletedBy: integer("deleted_by").references(() => user.userId),
}, (table) => [
	index("idx_perfume_created_by").on(table.createdBy),
	index("idx_perfume_updated_by").on(table.updatedBy),
	index("idx_perfume_deleted_by").on(table.deletedBy),
]);

export const service = pgTable("service", {
	serviceId: serial("service_id").primaryKey().notNull(),
	serviceName: varchar("service_name", { length: 100 }).notNull(),
	duration: integer("duration").notNull(), // duration in hours
	price: numeric("price", { precision: 10, scale: 2 }),
	description: varchar("description", { length: 100 }),
	status: smallint("status").notNull().default(1).$type<0 | 1 | 2>(), // 0 = inactive, 1 = active, 2 = deleted
	createdDate: timestamp("created_date").defaultNow().notNull(),
	updatedDate: timestamp("updated_date"),
	deletedDate: timestamp("deleted_date"),
	createdBy: integer("created_by").notNull().references(() => user.userId),
	updatedBy: integer("updated_by").references(() => user.userId),
	deletedBy: integer("deleted_by").references(() => user.userId),
}, (table) => [
	index("idx_service_created_by").on(table.createdBy),
	index("idx_service_updated_by").on(table.updatedBy),
	index("idx_service_deleted_by").on(table.deletedBy),
]);

export const transactions = pgTable("transactions", {
	transactionsId: serial("transactions_id").primaryKey().notNull(),
	transactionDate: timestamp("transaction_date").defaultNow().notNull(),
	userId: integer("user_id").notNull().references(() => user.userId),
	totalPrice: numeric("total_price", { precision: 10, scale: 2 }).notNull(),
	status: smallint("status").notNull().default(1).$type<0 | 1 | 2>(), // 0 = inactive, 1 = active, 2 = deleted
	createdDate: timestamp("created_date").defaultNow().notNull(),
	updatedDate: timestamp("updated_date"),
	deletedDate: timestamp("deleted_date"),
	createdBy: integer("created_by").notNull().references(() => user.userId),
	updatedBy: integer("updated_by").references(() => user.userId),
	deletedBy: integer("deleted_by").references(() => user.userId),
}, (table) => [
	index("idx_transactions_user").on(table.userId),
	index("idx_transactions_user_date").on(table.userId, table.transactionDate),
	index("idx_transactions_created_by").on(table.createdBy),
	index("idx_transactions_updated_by").on(table.updatedBy),
	index("idx_transactions_deleted_by").on(table.deletedBy),
]);

export const transactionsItem = pgTable("transactions_item", {
	transactionsItemId: serial("transactions_item_id").primaryKey().notNull(),
	transactionsId: integer("transactions_id").notNull().references(() => transactions.transactionsId),
	serviceId: integer("service_id").notNull().references(() => service.serviceId),
	quantity: integer("quantity").notNull().default(1),
	perfumeId: integer("perfume_id").references(() => perfume.perfumeId),
	status: smallint("status").notNull().default(1).$type<0 | 1 | 2>(), // 0 = inactive, 1 = active, 2 = deleted
	createdDate: timestamp("created_date").defaultNow().notNull(),
	updatedDate: timestamp("updated_date"),
	deletedDate: timestamp("deleted_date"),
	createdBy: integer("created_by").notNull().references(() => user.userId),
	updatedBy: integer("updated_by").references(() => user.userId),
	deletedBy: integer("deleted_by").references(() => user.userId),
}, (table) => [
	index("idx_transactions_item_transactions").on(table.transactionsId),
	index("idx_transactions_item_service").on(table.serviceId),
	index("idx_transactions_item_perfume").on(table.perfumeId),
	index("idx_transactions_item_created_by").on(table.createdBy),
	index("idx_transactions_item_updated_by").on(table.updatedBy),
	index("idx_transactions_item_deleted_by").on(table.deletedBy),
]);

export const user = pgTable("user", {
	userId: serial("user_id").primaryKey().notNull(),
	username: varchar("username", { length: 100 }).notNull().unique(),
	name: varchar("name", { length: 100 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 25 }),
	address: varchar("address", { length: 150 }),
	waAvailable: boolean("wa_available").$default(() => false),
	email: varchar("email", { length: 100 }).notNull().unique(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: integer("role").notNull().$type<0 | 1 | 2>(), // 0 = admin, 1 = staff, 2 = customer
	status: smallint("status").notNull().default(1).$type<0 | 1 | 2>(), // 0 = inactive, 1 = active, 2 = deleted
	createdDate: timestamp("created_date").defaultNow().notNull(),
	updatedDate: timestamp("updated_date"),
	deletedDate: timestamp("deleted_date"),
	createdBy: integer("created_by").notNull(),
	updatedBy: integer("updated_by"),
	deletedBy: integer("deleted_by"),
}, (table) => [
	index("idx_user_status").on(table.status),
	index("idx_user_created_by").on(table.createdBy),
	index("idx_user_updated_by").on(table.updatedBy),
	index("idx_user_deleted_by").on(table.deletedBy),
]);