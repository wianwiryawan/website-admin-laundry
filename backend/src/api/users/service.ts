import { db } from '@/database/drizzle/db';
import { user } from '@/database/drizzle/schema';
import { adminCreateUserSchema, updateUserSchema, updatePasswordSchema, deleteUserSchema, registerUserSchema } from './validation';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { now } from '@/api/api.global';
import { AppError } from '@/api/api.global';

// Services: Handle business logic and talk to the database.

export const getAllUsers = async () => {
    return db.select().from(user);
}

export const getUserById = async (userId: number) => {
    return db.select().from(user).where(
        eq(user.userId, userId)
    );
}

export const userSelfRegister = async (userData: unknown) => {
    const parsed = registerUserSchema.safeParse(userData);

    if (!parsed.success){
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    }

    const result = parsed.data;

    const passwordHash = await bcrypt.hash(result.confirmPassword, 10);

    const data = {
        username: result.username,
        name: result.name,
        address: result.address,
        email: result.email,
        passwordHash: passwordHash,
        role: result.role as 0 | 1 | 2,
        status: result.status as 0 | 1 | 2,
        createdBy: 1 // System
    };

    try {
        const inserted = await db
            .insert(user)
            .values(data)
            .returning();
        
        return {
            data: inserted[0],
            message: "User created successfully"
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        }
        throw new AppError(500, "Failed to insert user");
    }
}

export const updateUserById = async (userData: unknown, adminId: number) => {
    const parsed = updateUserSchema.safeParse(userData);
    if (!parsed.success) {
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    };

    const result = parsed.data;

    const data = {
        name: result.name,
        phoneNumber: result.phoneNumber,
        address: result.address,
        waAvailable: result.waAvailable,
        status: result.status as 0 | 1 | 2,
        updatedBy: adminId,
        updatedDate: now(),
    };

    try {
        const updated = await db.update(user)
            .set(data)
            .where(
                eq(user.userId, result.userId)
            )
            .returning();
    
        return {
            updated,
            message: "User updated successfully"
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        }
        throw new AppError(500, "Failed to insert user");
    }
}

export const adminAddUser = async (userData: unknown, adminId: number) => {
    const parsed = adminCreateUserSchema.safeParse(userData);
    
    if (!parsed.success){
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    }

    const result = parsed.data;

    const passwordHash = await bcrypt.hash(result.password, 10);

    const data = {
        username: result.username,
        name: result.name,
        phoneNumber: result.phoneNumber,
        address: result.address,
        waAvailable: result.waAvailable,
        email: result.email,
        passwordHash: passwordHash,
        role: result.role as 0 | 1 | 2,
        status: result.status as 0 | 1 | 2,
        createdBy: adminId,
    };

    try {
        // Use validated data
        const inserted = await db
            .insert(user)
            .values(data);

        return {
            inserted,
            message: "User created successfully"
        };   
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        }
        throw new AppError(500, "Failed to insert user");
    }
}

export const passwordUpdateById = async (userData: unknown) => {
    const parsed = updatePasswordSchema.safeParse(userData);
    if (!parsed.success) {
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    }

    const result = parsed.data;

    if (result.newPassword == result.oldPassword) {
        return {
            message: "Password is same like old password"
        };
    };

    const passwordHash = await bcrypt.hash(result.confirmPassword, 10);

    const data = {
        passwordHash: passwordHash,
        updatedBy: result.userId,
        ubdatedDate: now(),
    };

    try {
        const updated = await db.update(user)
            .set(data)
            .where(
                eq(user.userId, result.userId)
            )
            .returning();
    
        return {
            updated,
            message: "User password updated successfully"
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        }
        throw new AppError(500, "Failed to insert user");
    }
}

export const softDeleteUserById = async (userId: number, adminId: number) => {
    if(userId === 1) {
        console.log("Forbidden to delete system user");
        throw new AppError(400, "Forbidden");
    }

    const data = {
        status: 2 as 0 | 1 | 2,
        updatedBy: userId,
        deletedBy: adminId,
        updatedDate: now(),
        deletedDate: now(),
    };

    try {
        const deleted = await db.update(user)
            .set(data)
            .where(
                eq(user.userId, userId)
            )
            .returning();
        
        return {
            deleted,
            message: "User deleted successfully"
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        }
        throw new AppError(500, "Failed to insert user");
    }
}