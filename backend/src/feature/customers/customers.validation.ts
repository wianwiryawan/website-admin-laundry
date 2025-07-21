import { z } from 'zod';

export const createCustomerValidation = z.object({
  customer_name: z.string().min(1).max(100),
  number_of_transaction: z.int(),
  phone_number: z.string().min(1).max(25),
  wa_available: z.boolean(),
  last_transaction: z.date(),
  address: z.string().min(1).max(150),
});