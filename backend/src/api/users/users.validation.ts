import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { usersInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

const insertUserSchema = createInsertSchema(usersInData);
const updateUserSchema = createUpdateSchema(usersInData);

export const createUserValidation = insertUserSchema.extend({
  username: z.string().min(1).max(100),
});

export const updateUserValidation = updateUserSchema.extend({
  username: z.string().min(1).max(100).optional(),
  status: z.int().min(0).max(1).optional(),
  email: z.email().optional(),
});