import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.email(),
  status: z.number().optional(),
});