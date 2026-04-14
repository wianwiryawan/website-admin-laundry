import { loginValidation } from './validation';
import bcrypt from 'bcrypt';

// Services: Handle business logic and talk to the database.

export const login = async (data: any) => {
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

    const isValid = await checkPassword(result.data.password, user.passwordHash); // Implement this function to compare passwords

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    // return user data or token if successful, or throw an error if not
    // return {
    //     message: "Login successful",
    //     user: {
    //         id: 1,
    //         username: data.username,
    //         // other user info
    //     },
    //     token: "fake-jwt-token"
    // };
    return {
        message: "Login successful",
        data: data,
    }
};

// Mock function to find user by email (replace with actual database query)
const findUserByEmail = async (email: string) => {
    // Simulate database lookup
    if (email === "wianwiryawan@gmail.com") {
        return {
            id: 1,
            email: email,
            role: "admin",
            username: "Wiyan Wiryawan",
            passwordHash: "passwordHashed123", // Replace with actual hashed password
        };
    } else {
        throw new Error("User not found");
    }
};

// Mock function to check password (replace with actual password hashing and comparison)
const checkPassword = async (password: string, passwordHash: string) => {
    // Simulate password check (in real implementation, use bcrypt or similar)
    const isValid = await bcrypt.compare(password, passwordHash); // Replace with actual password comparison logic
    return isValid;
};