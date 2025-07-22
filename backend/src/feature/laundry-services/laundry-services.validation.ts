import { z } from 'zod';

// example on z.string()
// | Field      | Accepts                     | Invalid Values        |
// | ---------- | --------------------------- | --------------------- |
// | `optional` | string or `undefined`       | `null`, number, etc.  |
// | `nullable` | string or `null`            | `undefined`, number   |
// | `nullish`  | string, `null`, `undefined` | number, boolean, etc. |

export const createLaundryServicesValidation = z.object({
    service_name: z.string().min(1).max(100),
    price: z.number().nullable(),
    status: z.int().nullable(),
})

