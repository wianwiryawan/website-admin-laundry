import { relations } from "drizzle-orm/relations";
import { customersInData, transactionsInData, servicesInData, perfumesInData } from "./schema";

export const transactionsInDataRelations = relations(transactionsInData, ({one}) => ({
	customersInDatum: one(customersInData, {
		fields: [transactionsInData.customerId],
		references: [customersInData.customersId]
	}),
	servicesInDatum: one(servicesInData, {
		fields: [transactionsInData.serviceId],
		references: [servicesInData.servicesId]
	}),
	perfumesInDatum: one(perfumesInData, {
		fields: [transactionsInData.perfumeId],
		references: [perfumesInData.perfumesId]
	}),
}));

export const customersInDataRelations = relations(customersInData, ({many}) => ({
	transactionsInData: many(transactionsInData),
}));

export const servicesInDataRelations = relations(servicesInData, ({many}) => ({
	transactionsInData: many(transactionsInData),
}));

export const perfumesInDataRelations = relations(perfumesInData, ({many}) => ({
	transactionsInData: many(transactionsInData),
}));