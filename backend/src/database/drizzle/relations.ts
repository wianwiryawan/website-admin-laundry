import { relations } from "drizzle-orm";
import { user, service, perfume, transactions, transactionsItem } from "./schema";

export const usersRelations = relations(user, ({ many }) => ({
    transactions: many(transactions),
}));

export const perfumeRelations = relations(perfume, ({ many }) => ({
    transactionsItem: many(transactionsItem),
}));

export const serviceRelations = relations(service, ({ many }) => ({
    transactionsItem: many(transactionsItem),
}));

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
    user: one(user, {
        fields: [transactions.userId],
        references: [user.userId],
    }),
    transactionsItem: many(transactionsItem),
}));

export const transactionsItemRelations = relations(transactionsItem, ({ one }) => ({
    transactions: one(transactions, {
        fields: [transactionsItem.transactionsId],
        references: [transactions.transactionsId],
    }),
    service: one(service, {
        fields: [transactionsItem.serviceId],
        references: [service.serviceId],
    }),
    perfume: one(perfume, {
        fields: [transactionsItem.perfumeId],
        references: [perfume.perfumeId],
    }),
}));