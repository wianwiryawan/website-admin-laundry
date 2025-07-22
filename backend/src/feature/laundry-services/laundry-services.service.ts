import { db } from "../../database/drizzle/db";
import { laundryServices } from './laundry-services.model';
import { createLaundryServicesValidation } from './laundry-services.validation';

// Services: Handle business logic and talk to the database.

export const getAllLaundryServices = async () => {
    return db.select().from(laundryServices);
};

export const addLaundryService = async (
    laundryServicesData: {
        service_name: string;
        price?: string;
        status?: number;
    }) => {
    const result = createLaundryServicesValidation.safeParse(laundryServicesData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }
    // Use validated data
    return db.insert(laundryServices).values(laundryServicesData);
};