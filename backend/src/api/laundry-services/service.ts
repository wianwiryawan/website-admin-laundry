import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle/db";
import { service } from '@/database/drizzle/schema';
import { createLaundryServiceValidation, updateLaundryServiceValidation } from './validation';

// Services: Handle business logic and talk to the database.

const now = () => new Date();

export const getAllLaundryServices = async () => {
    return db.select().from(service);
};

export const getLaundryById = async (serviceId: number) => {
    return db.select().from(service).where(
        eq(service.serviceId, serviceId)
    );
};

export const addLaundryService = async (requestBody: unknown, adminId: number) => {
    const result = createLaundryServiceValidation.safeParse(requestBody);
    if(!result.success){
        throw result.error;
    }

    // Destructure and pass the validated data to Drizzle insert
    const validatedData = result.data;

    const data = {
        serviceName: validatedData.serviceName,
        duration: validatedData.duration,
        price: validatedData.price,
        description: validatedData.description,
        status: validatedData.status as 0 | 1 | 2,
        createdBy: adminId
    };

    // Use validated data
    const inserted = await db
        .insert(service)
        .values(data)
        .returning();

    return {
        data: inserted[0].serviceName,
        message: "Laundry service created successfully"
    };
};

export const updateLaundryServiceById = async (requestBody: unknown, adminId: number) => {
    const result = updateLaundryServiceValidation.safeParse(requestBody);
    if(!result.success){
        throw result.error;
    }

    const validatedData = result.data;

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
    }
};

export const deleteLaundryService = async (requestBody: unknown, adminId: number) => {
    const result = updateLaundryServiceValidation.safeParse(requestBody);
    if (!result.success) {
        throw result.error;
    }

    const validatedData = result.data;

    const data = {
        status: 2 as 0 | 1 | 2,
        deletedDate: now(),
        deletedBy: adminId,
    };

    const deleted = await db
        .update(service)
        .set(data)
        .where(
            eq(service.serviceId, validatedData.serviceId)
        )
        .returning();

    return {
        data: deleted[0].serviceName,
        message: "Laundry service deleted successfully"
    }
};