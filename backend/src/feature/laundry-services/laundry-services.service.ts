import { db } from "../../database/drizzle/db";
import { laundryServicesInData } from '../../database/drizzle/migrations/schema';
import { createLaundryServicesValidation } from './laundry-services.validation';

// Services: Handle business logic and talk to the database.

export const getAllLaundryServices = async () => {
    return db.select().from(laundryServicesInData);
};

export const addLaundryService = async (
    laundryServicesData: {
        serviceName: string;
        price?: string;
        status?: number;
    }) => {
    const result = createLaundryServicesValidation.safeParse(laundryServicesData);
    if(!result.success){
        // Handle validation error (throw, return, or log)
        throw new Error(`Validation failed: ${result.error}`);
    }
    // Use validated data
    return db.insert(laundryServicesInData).values(laundryServicesData);
};