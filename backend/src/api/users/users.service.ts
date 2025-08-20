import { db } from '../../database/drizzle/db';
import { usersInData } from '../../database/drizzle/migrations/schema';
import { createUserValidation, updateUserValidation } from './users.validation';
import { eq } from 'drizzle-orm';

// Services: Handle business logic and talk to the database.

export const getAllUsers = async () => {
    return db.select().from(usersInData);
}

export const getUserById = async (userId: number) => {
    return db.select().from(usersInData).where(
        eq(usersInData.usersId, userId)
    );
}

export const addUser = async (userData: unknown) => {
    const result = createUserValidation.safeParse(userData);
    if (!result.success){
        // Handle validation error (throw, return, or log)
        // throw new Error(`Validation failed: ${result.error}`);
        throw result.error;
    }

    const validatedData = result.data;

    // Use validated data
    return db.insert(usersInData).values(validatedData);
}

export const updateUserById = async (userId: number, userData: unknown) => {
    const result = updateUserValidation.safeParse(userData);
    if (!result.success) {
        throw result.error;
    };

    const validatedData = result.data;

    return db.update(usersInData)
        .set(validatedData)
        .where(
            eq(usersInData.usersId, userId)
        )
        .returning();
}