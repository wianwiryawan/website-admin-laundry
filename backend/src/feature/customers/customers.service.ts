import { db } from '../../database/drizzle/db';
import { customers } from './customers.model';
import { createCustomerSchema } from './customers.scheme';
// Services: Handle business logic and talk to the database.

export const getAllCustomers = async () => {
    return db.select().from(customers);
};

export const createCustomer = async (
    customer: {
        customer_name: string;
        number_of_transaction: number;
        phone_number: string;
        wa_available: boolean;
        last_transaction: string;
        address: string;
    }) => {
    const result = createCustomerSchema.safeParse(customer);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    };
    // Use validated data
    return db.insert(customers).values(customer);
};