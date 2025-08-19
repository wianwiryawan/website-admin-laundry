import { db } from "../../database/drizzle/db";
import { laundryServicesInData } from '../../database/drizzle/migrations/schema';
import { createLaundryServiceValidation } from './laundry-services.validation';

// Services: Handle business logic and talk to the database.

export const getAllLaundryServices = async () => {
    return db.select().from(laundryServicesInData);
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