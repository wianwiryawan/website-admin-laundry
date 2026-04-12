import { z } from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { laundryServicesInData } from '../../database/drizzle/migrations/schema';

// Validation: Handle validation logic.

// example on z.string()
// | Field      | Accepts                     | Invalid Values        |
// | ---------- | --------------------------- | --------------------- |
// | `optional` | string or `undefined`       | `null`, number, etc.  |
// | `nullable` | string or `null`            | `undefined`, number   |
// | `nullish`  | string, `null`, `undefined` | number, boolean, etc. |

const insertLaundryServiceSchema = createInsertSchema(laundryServicesInData);
const updateLaundryServiceSchema = createInsertSchema(laundryServicesInData);

export const createLaundryServiceValidation = insertLaundryServiceSchema.extend({
    service_name: z.string().min(1).max(100),
    price: z.string()
});

export const updateLaundryServiceValidation = updateLaundryServiceSchema.extend({
    service_name: z.string().min(1).max(100),
    price: z.string(),
    status: z.number(),
    updated_date: z.preprocess(
    (val) => {
        if (typeof val === "string" || val instanceof Date) return new Date(val);
    },
    z.date()),
});

