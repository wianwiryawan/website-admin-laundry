import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { customersInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

const insertCustomerSchema = createInsertSchema(customersInData);

// To handle json data sent from postman, z.preprocess is used.
export const createCustomerValidation = insertCustomerSchema.extend({
  customerName: z.string().min(1).max(100),
  phoneNumber: z.string().min(1).max(25),
  lastTransaction: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
    z.date()
  ),
  address: z.string().min(1).max(150),
});