import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { transactions } from "@/database/drizzle/schema";

// Validation: Handle validation logic.

const insertSchema = createInsertSchema(transactions);
const updateSchema = createUpdateSchema(transactions);

export const addTransactionSchema = insertSchema.extend({
    totalPrice: z.string()
        .regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price with up to 2 decimals")
        .refine((val) => {
            const num = Number(val);
            return num >= 0 && num <= 99999999.99;
        }, "Value out of range"),
    items: z.array(
        z.object({
        serviceId: z.number(),
        quantity: z.number().int().min(1),
        perfumeId: z.number().optional(),
        })
    ),
});

export const updateTransactionSchema = updateSchema.extend({
    transactionsId: z.number(),
    totalPrice: z.string()
        .regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price with up to 2 decimals")
        .refine((val) => {
            const num = Number(val);
            return num >= 0 && num <= 99999999.99;
        }, "Value out of range"),
    items: z.array(
        z.object({
            transactionsItemId: z.number(),
            serviceId: z.number(),
            quantity: z.number().int().min(1),
            perfumeId: z.number().optional(),
        })
    ),
});