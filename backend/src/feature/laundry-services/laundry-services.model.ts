import { pgSchema, serial, varchar, numeric, smallint } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("data");

export const laundryServices = mySchema.table(`laundry_services`, {
    services_id: serial("laundry_services_id").primaryKey(),
    service_name: varchar("service_name", { length: 100 }).notNull(),
    price: numeric("price"),
    status: smallint("status"),
});