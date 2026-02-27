import { eq } from "drizzle-orm";
import { db } from "../../database/drizzle/db";
import { laundryServicesInData } from '../../database/drizzle/migrations/schema';
import { createLaundryServiceValidation, updateLaundryServiceValidation } from './laundry-services.validation';

// Services: Handle business logic and talk to the database.

export const getAllLaundryServices = async () => {
    return db.select().from(laundryServicesInData);
};

export const getLaundryById = async (serviceId: number) => {
    return db.select().from(laundryServicesInData).where(
        eq(laundryServicesInData.laundry_services_id, serviceId)
    );
};

export const addLaundryService = async (laundryServicesData: unknown) => {
    const result = createLaundryServiceValidation.safeParse(laundryServicesData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        // throw new Error(`Validation failed: ${result.error}`);
        throw result.error;
    }

    // Destructure and pass the validated data to Drizzle insert
    const validatedData = result.data;

    // Use validated data
    return db.insert(laundryServicesInData).values(validatedData);
};

export const updateLaundryServiceById = async (laundryServiceId: number, laundryServicesData: unknown) => {
    const result = updateLaundryServiceValidation.safeParse(laundryServicesData);
    if(!result.success){
        throw result.error;
    }

    const validatedData = {
        ...result.data,
        updated_date: new Date().toISOString(),
    };

    return db.update(laundryServicesInData)
        .set(validatedData)
        .where(
            eq(laundryServicesInData.laundry_services_id, laundryServiceId)
        );
};

export const softDeleteLaundryServiceById = async (laundryServiceId: number, laundryServiceData: unknown) => {
    const result = updateLaundryServiceValidation.safeParse(laundryServiceData);
    if (!result.success) {
        throw result.error;
    }

    const validatedData = {
        ...result.data,
        updated_date: new Date().toISOString(),
    };

    return db.update(laundryServicesInData)
        .set(validatedData)
        .where(
            eq(laundryServicesInData.laundry_services_id, laundryServiceId)
    );
};