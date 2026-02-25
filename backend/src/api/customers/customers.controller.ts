import { Request, Response } from "express";
import * as customerService from './customers.service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllCustomersHandler = async (req: Request, res: Response) => {
    const result = await customerService.getAllCustomers();
    res.json(result);
};

export const getCustomerById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await customerService.getCustomerById(id);
        if (result.length == 0) {
            return res.status(404).json({
                message: 'Data not found',
            });
        };
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const addCustomerHandler = async (req: Request, res: Response) => {
    try {
        // pass raw req.body to the service
        const result = await customerService.addCustomer(req.body);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateCustomerByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const customerData = req.body;
        const result = await customerService.updateCustomerById(id, customerData);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
}

export const softDeleteCustomerByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await customerService.softDeleteCustomerById(id, req.body);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    };
};

function handleError(res: Response, error: any) {
    if (error instanceof ZodError) {
            // validation failed
            console.error(error);
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        };
        // any other error
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
}
