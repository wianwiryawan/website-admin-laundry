import { relations } from "drizzle-orm/relations";
import { customersInData, transactionsInData, laundryServicesInData, perfumesInData } from "./schema";

export const transactionsInDataRelations = relations(transactionsInData, ({one}) => ({
	customersInDatum: one(customersInData, {
		fields: [transactionsInData.customer_id],
		references: [customersInData.customers_id]
	}),
	laundryServicesInDatum: one(laundryServicesInData, {
		fields: [transactionsInData.laundry_service_id],
		references: [laundryServicesInData.laundry_services_id]
	}),
	perfumesInDatum: one(perfumesInData, {
		fields: [transactionsInData.perfume_id],
		references: [perfumesInData.perfumes_id]
	}),
}));

export const customersInDataRelations = relations(customersInData, ({many}) => ({
	transactionsInData: many(transactionsInData),
}));

export const laundryServicesInDataRelations = relations(laundryServicesInData, ({many}) => ({
	transactionsInData: many(transactionsInData),
}));

export const perfumesInDataRelations = relations(perfumesInData, ({many}) => ({
	transactionsInData: many(transactionsInData),
}));