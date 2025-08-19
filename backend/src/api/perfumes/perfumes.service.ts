import { eq } from "drizzle-orm";
import { db } from "../../database/drizzle/db";
import { perfumesInData } from '../../database/drizzle/migrations/schema';
import { createPerfumeValidation } from "./perfumes.validation";

// Services: Handle business logic and talk to the database.

export const getAllPerfumes = async () => {
    return db.select().from(perfumesInData);
};

export const getPerfumeById = async (perfumeId: number) => {
    return db.select().from(perfumesInData).where(
        eq(perfumesInData.perfumesId, perfumeId)
    );
};

export const addPerfume = async (perfumeData: unknown) => {
    const result = createPerfumeValidation.safeParse(perfumeData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        // throw new Error(`Validation failed: ${result.error}`);
        throw result.error;
    }

    const validatedData = result.data;

    // Use validated data
    return db.insert(perfumesInData).values(validatedData);
}