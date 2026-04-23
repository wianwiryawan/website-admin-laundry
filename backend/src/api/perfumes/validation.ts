import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { perfume } from '@/database/drizzle/schema';
import z from 'zod';

// Validation: Handle validation logic.

const insertSchema = createInsertSchema(perfume);
const updateSchema = createUpdateSchema(perfume);

export const createPerfumeValidation = insertSchema;
export const updatePerfumeValidation = updateSchema.extend({
    perfumeId: z.number(),
});