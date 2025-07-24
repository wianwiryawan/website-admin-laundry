import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { perfumesInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

const insertPerfumeSchema = createInsertSchema(perfumesInData);

export const createPerfumeValidation = insertPerfumeSchema.extend({
    perfumeName: z.string().min(1).max(50),
    description: z.string().min(1).max(100),
});