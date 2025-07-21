import { Request, Response } from "express";
import * as customerService from './customers.service';

// Controllers: Handle HTTP request/response only.

export const getAllCustomersHandler = async (req: Request, res: Response) => {
    const result = await customerService.getAllCustomers();
    res.json(result);
};

export const addCustomerHandler = async (req: Request, res: Response) => {
    const {
        customer_name,
        number_of_transaction,
        phone_number,
        wa_available,
        last_transaction,
        address 
    } = req.body;
    const result = await customerService.addCustomer({
        customer_name,
        number_of_transaction,
        phone_number,
        wa_available,
        last_transaction,
        address,
    });
    res.status(201).json(result);
};
