import { db } from '@/database/drizzle/db';
import { user } from '@/database/drizzle/schema';
import { adminCreateUserSchema, updateUserSchema, updatePasswordSchema, deleteUserSchema, registerUserSchema } from './validation';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import { Json } from 'drizzle-zod';

// Services: Handle business logic and talk to the database.

const now = () => new Date();

export const getAllUsers = async () => {
    return db.select().from(user);
}

export const getUserById = async (userId: number) => {
    return db.select().from(user).where(
        eq(user.userId, userId)
    );
}

export const userSelfRegister = async (userData: Json) => {
    const parsed = registerUserSchema.safeParse(userData);

    if (!parsed.success){
        throw parsed.error;
    }

    const result = parsed.data;

    if (result.password == result.confirmPassword) {
        return {
            message: "Password is invalid"
        };
    };

    const passwordHash = await bcrypt.hash(result.confirmPassword, 10);

    const data = {
        username: result.username,
        name: result.name,
        address: result.address,
        email: result.email,
        passwordHash: passwordHash,
        phoneNumber: result.phoneNumber,
        role: result.role as 0 | 1 | 2,
        status: result.status as 0 | 1 | 2,
        createdBy: 1 // System
    };

    const inserted = await db
        .insert(user)
        .values(data);
}

export const adminAddUser = async (userData: Json, adminId: number) => {
    const parsed = adminCreateUserSchema.safeParse(userData);
    
    if (!parsed.success){
        throw parsed.error;
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

    // Use validated data
    const inserted = await db
        .insert(user)
        .values(data);

    return {
        inserted,
        message: "User created successfully"
    };
}

export const updateUserById = async (userData: Json, adminId: number) => {
    const parsed = updateUserSchema.safeParse(userData);
    if (!parsed.success) {
        throw parsed.error;
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

    const updated = db.update(user)
        .set(data)
        .where(
            eq(user.userId, result.userId)
        );

    return {
        updated,
        message: "User updated successfully"
    };
}

export const passwordUpdateById = async (userData: Json) => {
    const parsed = updatePasswordSchema.safeParse(userData);
    if (!parsed.success) {
        throw parsed.error;
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

    const updated = db.update(user)
        .set(data)
        .where(
            eq(user.userId, result.userId)
        );

    return {
        updated,
        message: "User password updated successfully"
    };
}

export const softDeleteUserById = async (userId: number) => {
    const parsed = deleteUserSchema.safeParse(userId);
    if (!parsed.success) {
        throw parsed.error;
    }

    const result = parsed.data;

    const data = {
        status: 2 as 2,
        updatedBy: result.userId,
        updatedDate: now(),
    };

    const deleted = db.update(user)
        .set(data)
        .where(
            eq(user.userId, result.userId)
        );
    
    return {
        deleted,
        message: "User deleted successfully"
    };
}