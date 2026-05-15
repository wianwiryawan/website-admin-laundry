import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle/db";
import { perfume } from '@/database/drizzle/schema';
import { createPerfumeValidation, updatePerfumeValidation } from "./validation";
import { now } from '@/api/api.global';
import { AppError } from "@/api/api.global";

// Services: Handle business logic and talk to the database.

export const getAllPerfumes = async () => {
    return db.select().from(perfume);
};

export const getPerfumeById = async (perfumeId: number) => {
    return db.select().from(perfume).where(
        eq(perfume.perfumeId, perfumeId)
    );
};

export const addPerfume = async (requestBody: unknown, adminId: number) => {
    const parsed = createPerfumeValidation.safeParse(requestBody);
    if(!parsed.success){
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    };

    const validatedData = parsed.data;

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
        .values(data)
        .returning();

    return {
        data: inserted[0],
        message: "Perfume created successfully"
    };
};

export const updatePerfume = async (requestBody: unknown, adminId: number) => {
    const parsed = updatePerfumeValidation.safeParse(requestBody);
    if (!parsed.success) {
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    };

    const validatedData = parsed.data;

    const data = {
        perfumeName: validatedData.perfumeName,
        price: validatedData.price,
        description: validatedData.description,
        status: validatedData.status as 0 | 1 | 2,
        updatedDate: now(),
        updatedBy: adminId,
    };

    try {
        const updated = await db
            .update(perfume)
            .set(data)
            .where(
                eq(perfume.perfumeId, validatedData.perfumeId)
            )
            .returning();
        
        return {
            data: updated[0],
            message: "Perfume successfully updated"
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        };

        throw new AppError(500, "Failed to insert laundry service");
    }

};

export const softDeletePerfume = async (perfumeId: number, adminId: number) => {
    const data = {
        status: 2 as 0 | 1 | 2,
        updatedBy: adminId,
        deletedDate: now(),
        deletedBy: adminId,
    };

    const deleted = await db
        .update(perfume)
        .set(data)
        .where(
            eq(perfume.perfumeId, perfumeId)
        )
        .returning();
    
    if (!deleted.length) {
        throw new AppError(404, "Data does not exist");
    }

    return {
        data: deleted[0].perfumeName,
        message: "Data successfully deleted"
    };
};