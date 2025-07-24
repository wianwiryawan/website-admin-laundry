import { db } from "../../database/drizzle/db";
import { transactionsInData } from "../../database/drizzle/migrations/schema";
import { createTransactionValidation } from "./transactions.validation";

// Services: Handle business logic and talk to the database.

export const getAllTransaction = async () => {
    return db.select().from(transactionsInData);
};

export const addTransaction = async (transactionsData: unknown) => {
    const result = createTransactionValidation.safeParse(transactionsData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }

    const validatedData = {
        ...result.data,
        transactionDate: result.data.transactionDate instanceof Date
        ? result.data.transactionDate.toISOString()
        : result.data.transactionDate
    };
    
    // Use validated data
    return db.insert(transactionsInData).values(validatedData);
};