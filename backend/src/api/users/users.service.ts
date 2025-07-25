import { db } from '../../database/drizzle/db';
import { usersInData } from '../../database/drizzle/migrations/schema';
import { createUserValidation } from './users.validation';

// Services: Handle business logic and talk to the database.

export const getAllUsers = async () => {
    return db.select().from(usersInData);
}

export const addUser = async (userData: unknown) => {
    const result = createUserValidation.safeParse(userData);
    if (!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }

    const validatedData = result.data;

    // Use validated data
    return db.insert(usersInData).values(validatedData);
}
