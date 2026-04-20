import { z } from 'zod';

export class userValidationEnum  {
    readonly roleMap = {
        admin: 0,
        staff: 1,
        customer: 2,
    };

    readonly statusMap = {
        inactive: 0,
        active: 1,
        deleted: 2,
    };

    readonly usernameValidation = z.string()
        .min(8, 'Username must be at least 8 characters long.')
        .max(100)
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.')
        .trim();

    readonly nameValidation = z.string()
        .min(3, 'Name must be at least 3 characters long.')
        .max(100)
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.')
        .trim();

    readonly phoneNumberValidation = z.string()
        .min(10, 'Phone number must be at least 10 characters long.')
        .max(25)
        .regex(/^\+?[0-9\s\-]+$/, 'Phone number can only contain digits, spaces, dashes, and an optional leading +.')
        .optional();

    readonly addressValidation = z.string()
        .min(10, 'Address must be at least 10 characters long.')
        .max(200)
        .optional();

    readonly emailValidation = z.email()
        .min(8, 'Email must be at least 8 characters long.')
        .max(100)
        .trim();

    readonly roleValidation = z.number().int().min(0).max(2);

    readonly statusValidation = z.number().int().min(0).max(2);

    readonly passwordValidation = z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(72, 'Password must be at most 72 characters')  // bcrypt silently truncates above 72 chars
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Must contain at least one special character');
}