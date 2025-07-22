import { z } from "zod";

export const createTransactionValidation = z.object({
    transactionDate: z.date(),
    customerId: z.int(),
    serviceId: z.int(),
    perfumeId: z.int(),
    totalPrice: z.number(),
});