import { Request, Response } from "express";
import * as customerService from './customers.service';

// Controllers: Handle HTTP request/response only.

export const getAllCustomersHandler = async (req: Request, res: Response) => {
    const result = await customerService.getAllCustomers();
    res.json(result);
};

export const addCustomerHandler = async (req: Request, res: Response) => {
    const {
        customerName,
        numberOfTransaction,
        phoneNumber,
        waAvailable,
        lastTransaction,
        address 
    } = req.body;
    const result = await customerService.addCustomer({
        customerName,
        numberOfTransaction,
        phoneNumber,
        waAvailable,
        lastTransaction,
        address,
    });
    res.status(201).json(result);
};
