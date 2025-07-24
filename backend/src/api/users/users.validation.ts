import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { usersInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

const insertUserSchema = createInsertSchema(usersInData);

export const createUserValidation = insertUserSchema.extend({
  username: z.string().min(1).max(100),
});