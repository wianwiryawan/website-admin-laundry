import { db } from "@/database/drizzle/db";
import { transactions, transactionsItem } from "@/database/drizzle/schema";
import { addTransactionSchema, updateTransactionSchema } from "./validation";
import { eq, and } from "drizzle-orm";

// Services: Handle business logic and talk to the database.
const now = () => new Date();

export const getAllTransaction = async () => {
    return db.select().from(transactions);
};

export const getTransactionById = async (transactionId: number) => {
    return db.select().from(transactions).where(
        eq(transactions.transactionsId, transactionId)
    );
};

export const addTransaction = async (requestBody: unknown, adminId: number) => {
    const result = addTransactionSchema.safeParse(requestBody);

    if (!result.success) {
        throw result.error;
    };

    const validatedData = result.data;

    const data = {
        userId: validatedData.userId,
        totalPrice: validatedData.totalPrice,
        status: validatedData.status as 0 | 1 | 2,
        createdBy: adminId,
    };
    
    // Use validated data
    return await db.transaction(async (handler) => {
        const [transaction] = await handler
            .insert(transactions)
            .values(data)
            .returning();
        
        const transactionId = transaction.transactionsId;

        const dataItem = validatedData.items.map((item) => ({
            transactionsId: transactionId,
            serviceId: item.serviceId,
            quantity: item.quantity,
            perfumeId: item.perfumeId ?? null,
            status: 1 as 0 | 1 | 2,
            createdBy: adminId,
        }));

        const transactionitem = await handler
            .insert(transactionsItem)
            .values(dataItem);
        
        return {
            transaction,
            transactionitem,
            message: "Transaction updated successfully"
        };
    });
};


export const updateTransaction = async (requestBody: unknown, adminId: number) => {
    const result = updateTransactionSchema.safeParse(requestBody);
    if (!result.success) {
        throw result.error;
    };

    const validatedData = result.data;

    const data = {
        transactionDate: validatedData.transactionDate,
        userId: validatedData.userId,
        totalPrice: validatedData.totalPrice,
        status: validatedData.status as 0 | 1 | 2,
        updatedDate: now(),
        updatedBy: adminId,
    }

    return await db.transaction(async (handler) => {
        const transaction = await handler
            .update(transactions)
            .set(data)
            .where(
                eq(transactions.transactionsId, validatedData.transactionsId)
            )
            .returning();

        const transactionItem = await Promise.all(
            validatedData.items.map((item) => handler
                .update(transactionsItem)
                .set({
                    serviceId: item.serviceId,
                    quantity: item.quantity,
                    perfumeId: item.perfumeId ?? null,
                    updatedDate: now(),
                    updatedBy: adminId,
                })
                .where(
                    and(
                        eq(transactionsItem.transactionsItemId, item.transactionsItemId),
                        eq(transactionsItem.transactionsId, validatedData.transactionsId)
                    )
                )
            )
        );

        return {
            transaction,
            transactionItem,
            message: "Transaction updated successfully"
        };
    });
}

export const deleteTransaction = async (transactionData: unknown, adminId: number) => {
    const result = updateTransactionSchema.safeParse(transactionData);
    if (!result.success) {
        throw result.error;
    };

    const validatedData = result.data;

    const data = {
        status: 2 as 0 | 1 | 2,
        deletedDate: now(),
        deletedBy: adminId,
    };

    return await db.transaction(async (handler) => {
        const deleted = handler.update(transactions)
            .set(data)
            .where(
                eq(transactions.transactionsId, validatedData.transactionsId)
            )
            .returning(); 
        
        return {
            data: deleted,
            message: "Transaction deleted successfully"
        }
    });
}