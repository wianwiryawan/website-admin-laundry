import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle/db";
import { user } from "@/database/drizzle/schema";
import { loginValidation } from './validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Services: Handle business logic and talk to the database.

export const login = async (data: unknown) => {
    // validate data with zod
    const result = loginValidation.safeParse(data);
    
    if (!result.success) {
        throw new Error(result.error.message);
    }

    // perform login logic (e.g., check username/password against database)
    const user = await findUserByEmail(result.data.email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const userData = user[0];

    const isValid = await checkPassword(result.data.password, userData.passwordHash); // Implement this function to compare passwords

    if (!isValid) {
        throw new Error("Invalid email or password");
    }
    
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment variables");
    }
    
    const token = jwt.sign(
        { userId: userData.userId, role: userData.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    )

    // Return the zod-validated shape, and never return passwordHash
    return {
        message: "Login successful",
        token,
        data: {
            userId: userData.userId,
            email: userData.email,
            role: userData.role,
        },
    };
};

const findUserByEmail = async (email: string) => {
    const userData = await db
        .select({
            userId: user.userId,
            email: user.email,
            role: user.role,
            username: user.username,
            passwordHash: user.passwordHash,
        })
        .from(user)
        .where(
            eq(user.email, email)
        );

    // Select always return an array even when no rows match
    if (userData.length === 0) {
        return null;
    };

    return userData;
};

const checkPassword = async (password: string, passwordHash: string) => {
    const isValid = await bcrypt.compare(password, passwordHash);
    return isValid;
};