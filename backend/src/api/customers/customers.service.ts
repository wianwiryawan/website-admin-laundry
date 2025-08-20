import { eq } from "drizzle-orm";
import { db } from '../../database/drizzle/db';
import { customersInData } from '../../database/drizzle/migrations/schema';
import { createCustomerValidation } from './customers.validation';

// Services: Handle business logic and talk to the database.

export const getAllCustomers = async () => {
    return db.select().from(customersInData);
};

export const getCustomerById = async (customerId: number) => {
    return db.select().from(customersInData).where(
        eq(customersInData.customersId, customerId)
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
        lastTransaction: result.data.lastTransaction instanceof Date
            ? result.data.lastTransaction.toISOString()
            : result.data.lastTransaction
    };

    // Use validated data
    return db.insert(customersInData).values(validatedData);
};