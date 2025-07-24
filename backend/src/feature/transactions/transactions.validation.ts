import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { transactionsInData } from "../../database/drizzle/migrations/schema";

// Validation: Handle validation logic.

const insertTransactionSchema = createInsertSchema(transactionsInData);

export const createTransactionValidation = insertTransactionSchema.extend({
    transactionDate: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
        z.date(),
    ),
});