import { z } from 'zod';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { customersInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

const insertCustomerSchema = createInsertSchema(customersInData);
const updateCustomerSchema = createUpdateSchema(customersInData);
const statusUpdateCustomerSchema = createUpdateSchema(customersInData);

// To handle json data sent from postman, z.preprocess is used.
export const createCustomerValidation = insertCustomerSchema.extend({
  customer_name: z.string().min(1).max(100),
  phone_number: z.string().min(1).max(25),
  last_transaction: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
    z.date()
  ),
  address: z.string().min(1).max(150),
});

export const updateCustomerValidation = updateCustomerSchema.extend({
  customer_name: z.string().min(1).max(100).optional(),
  phone_number: z.string().min(1).max(25).optional(),
  last_transaction: z.preprocess(
    (val) => {
      if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
    z.date()
  ).optional(),
  address: z.string().min(1).max(150).optional(),
});

export const statusUpdateCustomerValidation = statusUpdateCustomerSchema.extend({
  
})