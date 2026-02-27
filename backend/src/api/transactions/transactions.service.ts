import { db } from "../../database/drizzle/db";
import { transactionsInData } from "../../database/drizzle/migrations/schema";
import { createTransactionValidation, updateTransactionValidation } from "./transactions.validation";
import { eq } from "drizzle-orm";

// Services: Handle business logic and talk to the database.

export const getAllTransaction = async () => {
    return db.select().from(transactionsInData);
};

export const getTransactionById = async (transactionId: number) => {
    return db.select().from(transactionsInData).where(
        eq(transactionsInData.transactions_id, transactionId)
    );
};

export const addTransaction = async (transactionsData: unknown) => {
    const result = createTransactionValidation.safeParse(transactionsData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        // throw new Error(`Validation failed: ${result.error}`);
        throw result.error;
    }

    const validatedData = {
        ...result.data,
        transaction_date: result.data.transaction_date instanceof Date
        ? result.data.transaction_date.toISOString()
        : result.data.transaction_date
    };
    
    // Use validated data
    return db.insert(transactionsInData).values(validatedData);
};

export const updateTransactionById = async (transactionsId: number, transactionsData: unknown) => {
    const result = updateTransactionValidation.safeParse(transactionsData);
    if (!result.success) {
        throw result.error;
    }

    const validatedData = {
        ...result.data,
        transaction_date: result.data.transaction_date instanceof Date
        ? result.data.transaction_date.toISOString()
        : result.data.transaction_date,
        updated_date: new Date().toISOString()
    };

    return db.update(transactionsInData)
        .set(validatedData)
        .where(
            eq(transactionsInData.transactions_id, transactionsId)
        );
}