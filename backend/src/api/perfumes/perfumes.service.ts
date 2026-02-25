import { eq } from "drizzle-orm";
import { db } from "../../database/drizzle/db";
import { perfumesInData } from '../../database/drizzle/migrations/schema';
import { createPerfumeValidation, updatePerfumeValidation } from "./perfumes.validation";

// Services: Handle business logic and talk to the database.

export const getAllPerfumes = async () => {
    return db.select().from(perfumesInData);
};

export const getPerfumeById = async (perfumeId: number) => {
    return db.select().from(perfumesInData).where(
        eq(perfumesInData.perfumes_id, perfumeId)
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

export const updatePerfumeById = async (perfumeId: number, perfumeData: unknown) => {
    const result = updatePerfumeValidation.safeParse(perfumeData);
    if (!result.success) {
        throw result.error;
    }

    const validatedData = result.data;

    return db.update(perfumesInData)
        .set(validatedData)
        .where(
            eq(perfumesInData.perfumes_id, perfumeId)
        );
}

export const softDeletePerfumeById = async (perfumeId: number, perfumeData: unknown) => {
    const result = updatePerfumeValidation.safeParse(perfumeData);
    if (!result.success) {
        throw result.error;
    }

    let validatedData = result.data;

    return db.update(perfumesInData)
        .set(validatedData)
        .where(
            eq(perfumesInData.perfumes_id, perfumeId)
        ).returning();
}