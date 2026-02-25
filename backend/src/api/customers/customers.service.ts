import { eq } from "drizzle-orm";
import { db } from '../../database/drizzle/db';
import { customersInData } from '../../database/drizzle/migrations/schema';
import { createCustomerValidation, updateCustomerValidation } from './customers.validation';

// Services: Handle business logic and talk to the database.

export const getAllCustomers = async () => {
    return db.select().from(customersInData);
};

export const getCustomerById = async (customerId: number) => {
    return db.select().from(customersInData).where(
        eq(customersInData.customers_id, customerId)
    );
};

export const addCustomer = async (customerData: unknown) => {
    const result = createCustomerValidation.safeParse(customerData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        // throw new Error(`Validation failed: ${result.error}`);
        throw result.error;
    };

    // Destructure and pass the validated data to Drizzle insert
    const validatedData = {
        ...result.data,
        last_transaction: result.data.last_transaction instanceof Date
            ? result.data.last_transaction.toISOString()
            : result.data.last_transaction
    };

    // Use validated data
    return db.insert(customersInData).values(validatedData);
};

export const updateCustomerById = async (customerId: number, customerData: unknown) => {
    const result = createCustomerValidation.safeParse(customerData);
    if (!result.success) {
        throw result.error;
    }

    const validatedData = {
        ...result.data,
        last_transaction: result.data.last_transaction instanceof Date
            ? result.data.last_transaction.toISOString()
            : result.data.last_transaction
    };

    return db.update(customersInData)
        .set(validatedData)
        .where(
            eq(customersInData.customers_id, customerId)
        );
};

export const softDeleteCustomerById = async (customerId: number, customerData: unknown) => {
    const result = updateCustomerValidation.safeParse(customerData);
    if (!result.success) {
        throw result.error;
    }

    const validatedData = {
        ...result.data,
        last_transaction: result.data.last_transaction instanceof Date
        ? result.data.last_transaction.toISOString()
        : result.data.last_transaction
    };

    return db.update(customersInData)
        .set(validatedData)
        .where(
            eq(customersInData.customers_id, customerId)
        );
}