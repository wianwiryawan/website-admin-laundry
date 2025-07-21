import { db } from '../../database/drizzle/db';
import { users } from './users.model';
import { createUserValidation } from './users.validation';

// Services: Handle business logic and talk to the database.

export const getAllUsers = async () => {
    return db.select().from(users);
}

export const addUser = async (
    user: { 
        username: string; 
        email: string; 
        status?: number; 
    }) => {
    const result = createUserValidation.safeParse(user);
    if (!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }
    // Use validated data
    return db.insert(users).values(user);
}
