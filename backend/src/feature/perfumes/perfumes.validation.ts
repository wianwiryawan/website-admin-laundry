import { z } from 'zod';

export const createPerfumesValidation = z.object({
    perfume_name: z.string().min(1).max(50),
    price: z.number(),
    description: z.string().min(1).max(100),
    status: z.int(),
});