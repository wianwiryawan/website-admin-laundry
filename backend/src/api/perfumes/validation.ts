import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { perfumesInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

const insertPerfumeSchema = createInsertSchema(perfumesInData);
const updatePerfumeSchema = createUpdateSchema(perfumesInData);

export const createPerfumeValidation = insertPerfumeSchema.extend({
    perfume_name: z.string().min(1).max(50),
    description: z.string().min(1).max(100),
});

export const updatePerfumeValidation = updatePerfumeSchema.extend({
    perfume_name: z.string().min(1).max(50).optional(),
    price: z.string().min(1).optional(),
    description: z.string().min(1).max(100).optional(),
    status: z.int().min(0).max(1).optional(),
});