import { db } from "../../database/drizzle/db";
import { transactionsInData } from "../../database/drizzle/migrations/schema";
import { createTransactionValidation } from "./transactions.validation";

// Services: Handle business logic and talk to the database.

export const getAllTransaction = async () => {
    return db.select().from(transactionsInData);
};

export const addTransaction = async (
    transactionsData: {
        transactionDate?: string;
        customerId?: number;
        serviceId?: number;
        perfumeId?: number;
        totalPrice?: string;
    }) => {
    const result = createTransactionValidation.safeParse(transactionsData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }
    // Use validated data
    return db.insert(transactionsInData).values(transactionsData);
};