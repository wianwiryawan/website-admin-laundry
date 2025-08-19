import { Request, Response } from "express";
import * as laundryServicesService from './laundry-services.service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllLaundryServicesHandler = async (req: Request, res: Response) => {
    const result = await laundryServicesService.getAllLaundryServices();
    res.json(result);
};

export const addLaundryServiceHandler = async (req: Request, res: Response) => {
    try {
        const result = await laundryServicesService.addLaundryService(req.body);
        res.status(201).json(result);
    } catch (error) {
        // console.error("Error prototype:", Object.getPrototypeOf(error));
        // console.error("Is ZodError:", error instanceof ZodError);
        // console.error("Error constructor:", error?.constructor?.name);
        if (error instanceof ZodError) {
            // validation failed
            console.error(error);
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        }
        // any other error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};