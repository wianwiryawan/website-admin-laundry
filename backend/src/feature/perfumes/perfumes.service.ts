import { db } from "../../database/drizzle/db";
import { perfumes } from "./perfumes.model";
import { createPerfumesValidation } from "./perfumes.validation";

// Services: Handle business logic and talk to the database.

export const getAllPerfumes = async () => {
    return db.select().from(perfumes);
};

export const addPerfume = async (
    perfumeData: {
        perfume_name: string;
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
        return db.insert(perfumes).values(perfumeData);
    }