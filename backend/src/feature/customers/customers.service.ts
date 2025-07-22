import { db } from '../../database/drizzle/db';
import { customersInData } from '../../database/drizzle/migrations/schema';
import { createCustomerValidation } from './customers.validation';
// Services: Handle business logic and talk to the database.

export const getAllCustomers = async () => {
    return db.select().from(customersInData);
};

export const addCustomer = async (
    customerData: {
        customerName: string;
        numberOfTransaction: number;
        phoneNumber: string;
        waAvailable: boolean;
        lastTransaction: string;
        address: string;
    }) => {
    const result = createCustomerValidation.safeParse(customerData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    };
    // Use validated data
    return db.insert(customersInData).values(customerData);
};