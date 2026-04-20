import { z } from 'zod';
import { userValidationEnum } from './validation.enum';

const userValidationLib = new userValidationEnum();

// Validation: Handle validation logic.

// Register schema for public user (self registration)
export const registerUserSchema = z.object({
    username: userValidationLib.usernameValidation,
    name: userValidationLib.nameValidation,
    address : userValidationLib.addressValidation,
    email: userValidationLib.emailValidation,
    password: userValidationLib.passwordValidation,
    confirmPassword: z.string(),
    phoneNumber: userValidationLib.phoneNumberValidation,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
}).transform((data) => ({
    ...data,
    role: userValidationLib.roleMap.customer, // Force customer
    status: userValidationLib.statusMap.active, // Force active
}));

export const updateUserSchema = z.object ({
    userId: z.number(),
    name: userValidationLib.nameValidation,
    phoneNumber: userValidationLib.phoneNumberValidation,
    address: userValidationLib.addressValidation,
    waAvailable: z.boolean().optional(),
    status: userValidationLib.statusValidation.optional(),
});

export const adminCreateUserSchema = z.object ({
    username: userValidationLib.usernameValidation,
    name: userValidationLib.nameValidation,
    phoneNumber: userValidationLib.phoneNumberValidation,
    address: userValidationLib.addressValidation,
    waAvailable: z.boolean().optional(),
    email: userValidationLib.emailValidation,
    password: userValidationLib.passwordValidation,
    role: userValidationLib.roleValidation,
    status: userValidationLib.statusValidation,
});

export const updatePasswordSchema = z.object ({
    userId: z.number(),
    oldPassword: z.string(),
    newPassword: userValidationLib.passwordValidation,
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const deleteUserSchema = z.object ({
    userId: z.number(),
    status: userValidationLib.statusValidation,
}).transform((data) => ({
    ...data,
    status: userValidationLib.statusMap.deleted, // Force delete
}));;