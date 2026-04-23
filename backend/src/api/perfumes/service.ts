import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle/db";
import { perfume } from '@/database/drizzle/schema';
import { createPerfumeValidation, updatePerfumeValidation } from "./validation";

// Services: Handle business logic and talk to the database.
const now = () => new Date();

export const getAllPerfumes = async () => {
    return db.select().from(perfume);
};

export const getPerfumeById = async (perfumeId: number) => {
    return db.select().from(perfume).where(
        eq(perfume.perfumeId, perfumeId)
    );
};

export const addPerfume = async (requestBody: unknown, adminId: number) => {
    const result = createPerfumeValidation.safeParse(requestBody);
    if(!result.success){
        throw result.error;
    };

    const validatedData = result.data;

    const data = {
        perfumeName: validatedData.perfumeName,
        price: validatedData.price,
        description: validatedData.description,
        status: validatedData.status as 0 | 1 | 2,
        createdBy: adminId,
    };

    // Use validated data
    const inserted = await db
        .insert(perfume)
        .values(data);

    return {
        inserted,
        message: "User created successfully"
    };
}

export const updatePerfume = async (requestBody: unknown, adminId: number) => {
    const result = updatePerfumeValidation.safeParse(requestBody);
    if (!result.success) {
        throw result.error;
    };

    const validatedData = result.data;

    const data = {
        perfumeName: validatedData.perfumeName,
        price: validatedData.price,
        description: validatedData.description,
        status: validatedData.status as 0 | 1 | 2,
        updatedDate: now(),
        updatedBy: adminId,
    };

    const updated = await db
        .update(perfume)
        .set(data)
        .where(
            eq(perfume.perfumeId, validatedData.perfumeId)
        );
    
    return {
        updated,
        message: "Data successfully updated"
    }
}

export const deletePerfume = async (requestBody: unknown, adminId: number) => {
    const result = updatePerfumeValidation.safeParse(requestBody);

    if (!result.success) {
        throw result.error;
    }

    const validatedData = result.data;

    const data = {
        status: 2 as 0 | 1 | 2,
        updatedBy: adminId,
    }

    const deleted = await db
        .update(perfume)
        .set(data)
        .where(
            eq(perfume.perfumeId, validatedData.perfumeId)
        );
    
    return {
        deleted,
        message: "Data successfully deleted"
    }
}