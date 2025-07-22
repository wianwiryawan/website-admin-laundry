import { db } from "../../database/drizzle/db";
import { perfumesInData } from '../../database/drizzle/migrations/schema';
import { createPerfumesValidation } from "./perfumes.validation";

// Services: Handle business logic and talk to the database.

export const getAllPerfumes = async () => {
    return db.select().from(perfumesInData);
};

export const addPerfume = async (
    perfumeData: {
        perfumeName: string;
        price?: string;
        description?: string;
        status?: number;
    }) => {
        const result = createPerfumesValidation.safeParse(perfumeData);
        if(!result.success){
            // Handle validation error (throw, return, or log)
            throw new Error(`Validation failed: ${result.error}`);
        }
        // Use validated data
        return db.insert(perfumesInData).values(perfumeData);
    }