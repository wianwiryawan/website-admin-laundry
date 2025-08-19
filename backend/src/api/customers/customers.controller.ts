import { Request, Response } from "express";
import * as customerService from './customers.service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllCustomersHandler = async (req: Request, res: Response) => {
    const result = await customerService.getAllCustomers();
    res.json(result);
};

export const addCustomerHandler = async (req: Request, res: Response) => {
    try {
        // pass raw req.body to the service
        const result = await customerService.addCustomer(req.body);
        res.status(201).json(result);
    } catch (error) {
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
