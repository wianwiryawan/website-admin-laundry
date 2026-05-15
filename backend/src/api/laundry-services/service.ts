import { asc, eq } from "drizzle-orm";
import { db } from "@/database/drizzle/db";
import { service } from '@/database/drizzle/schema';
import { createLaundryServiceValidation, updateLaundryServiceValidation } from './validation';
import { now } from '@/api/api.global';
import { AppError } from "@/api/api.global";

// Services: Handle business logic and talk to the database.

export const getAllLaundryServices = async () => {
    return db.select().from(service).orderBy(asc(service.serviceId));
};

export const getLaundryById = async (serviceId: number) => {
    return db.select().from(service).where(
        eq(service.serviceId, serviceId)
    );
};

export const addLaundryService = async (requestBody: unknown, adminId: number) => {
    const parsed = createLaundryServiceValidation.safeParse(requestBody);
    if(!parsed.success){
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    };

    const validatedData = parsed.data;

    const data = {
        serviceName: validatedData.serviceName,
        duration: validatedData.duration,
        price: validatedData.price,
        description: validatedData.description,
        status: validatedData.status as 0 | 1 | 2,
        createdBy: adminId
    };

    // Use validated data
    try {
        const inserted = await db
            .insert(service)
            .values(data)
            .returning();
    
        return {
            data: inserted[0].serviceName,
            message: "Laundry service created successfully"
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new AppError(500, error.message);
        };

        throw new AppError(500, "Failed to insert laundry service");
    }
};

export const updateLaundryServiceById = async (requestBody: unknown, adminId: number) => {
    const parsed = updateLaundryServiceValidation.safeParse(requestBody);
    if(!parsed.success){
        console.log(parsed.error.message);
        throw new AppError(400, "Invalid request param");
    };

    const validatedData = parsed.data;

    const data = {
        serviceName: validatedData.serviceName,
        duration: validatedData.duration,
        price: validatedData.price,
        description: validatedData.description,
        status: validatedData.status as 0 | 1 | 2,
        updatedBy: adminId,
        updatedDate: now(),
    };

    const updated = await db
        .update(service)
        .set(data)
        .where(
            eq(service.serviceId, validatedData.serviceId)
        )
        .returning();

    return {
        data: updated[0].serviceName,
        message: "Laundry service updated successfully"
    };
};

export const softDeleteLaundryService = async (serviceId: number, adminId: number) => {
    const data = {
        status: 2 as 0 | 1 | 2,
        deletedDate: now(),
        deletedBy: adminId,
    };

    const deleted = await db
        .update(service)
        .set(data)
        .where(
            eq(service.serviceId, serviceId)
        )
        .returning();

    if (!deleted.length) {
        throw new AppError(404, "Data does not exist");
    }

    return {
        data: deleted[0].serviceName,
        message: "Laundry service deleted successfully"
    };
};