import { z } from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { transactionsInData } from "../../database/drizzle/migrations/schema";

// Validation: Handle validation logic.

const insertTransactionSchema = createInsertSchema(transactionsInData);
const updateTransactionSchema = createUpdateSchema(transactionsInData);

export const createTransactionValidation = insertTransactionSchema.extend({
    transaction_date: z.preprocess(
    (val) => {
        if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
        z.date(),
    ),
});

export const updateTransactionValidation = updateTransactionSchema.extend({
    transaction_date: z.preprocess(
    (val) => {
        if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
        z.date(),
    ),
})