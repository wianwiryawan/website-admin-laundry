import { db } from "../../database/drizzle/db";
import { perfumesInData } from '../../database/drizzle/migrations/schema';
import { createPerfumesValidation } from "./perfumes.validation";

// Services: Handle business logic and talk to the database.

export const getAllPerfumes = async () => {
    return db.select().from(perfumesInData);
};

export const addPerfume = async (perfumeData: unknown) => {
        const result = createPerfumesValidation.safeParse(perfumeData);
        if(!result.success){
            // Handle validation error (throw, return, or log)
            throw new Error(`Validation failed: ${result.error}`);
        }

        const validatedData = result.data;

        // Use validated data
        return db.insert(perfumesInData).values(validatedData);
    }