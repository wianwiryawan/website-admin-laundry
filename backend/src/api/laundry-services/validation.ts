import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { service } from '@/database/drizzle/schema';

// Validation: Handle validation logic.

// example on z.string()
// | Field      | Accepts                     | Invalid Values        |
// | ---------- | --------------------------- | --------------------- |
// | `optional` | string or `undefined`       | `null`, number, etc.  |
// | `nullable` | string or `null`            | `undefined`, number   |
// | `nullish`  | string, `null`, `undefined` | number, boolean, etc. |

const insertLaundryServiceSchema = createInsertSchema(service);
const updateLaundryServiceSchema = createInsertSchema(service);

export const createLaundryServiceValidation = insertLaundryServiceSchema;
export const updateLaundryServiceValidation = updateLaundryServiceSchema.extend ({
    serviceId: z.number(),
});

