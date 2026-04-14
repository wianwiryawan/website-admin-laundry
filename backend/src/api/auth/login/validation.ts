import { email, z } from 'zod';

// Validation: Handle validation logic.

export const loginValidation = z.object({
    email: email("Email is invalid").min(1, "Email is required").max(255, "Email must be less than 255 characters"),
    password: z.string().min(1, "Password is required"),
});