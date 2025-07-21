import { relations } from "drizzle-orm/relations";
import { customersInData, transactionsInData, laundryServicesInData, perfumesInData } from "./schema";

export const transactionsInDataRelations = relations(transactionsInData, ({one}) => ({
	customersInDatum: one(customersInData, {
		fields: [transactionsInData.customerId],
		references: [customersInData.customersId]
	}),
	laundryServicesInDatum: one(laundryServicesInData, {
		fields: [transactionsInData.serviceId],
		references: [laundryServicesInData.servicesId]
	}),
	perfumesInDatum: one(perfumesInData, {
		fields: [transactionsInData.perfumeId],
		references: [perfumesInData.perfumesId]
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