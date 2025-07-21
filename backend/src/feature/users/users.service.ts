import { db } from '../../database/drizzle/db';
import { users } from './users.model';
import { createUserSchema } from './users.schema';

// Services: Handle business logic and talk to the database.

export const getAllUsers = async () => {
    return db.select().from(users);
}

export const createUser = async (
    user: { 
        username: string; 
        email: string; 
        status?: number; 
    }) => {
    const result = createUserSchema.safeParse(user);
    if (!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }
    // Use validated data
    return db.insert(users).values(user);
}
