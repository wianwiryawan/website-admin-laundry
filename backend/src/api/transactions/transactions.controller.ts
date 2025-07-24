import { Request, Response } from "express";
import * as transactionsService from './transactions.service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllTransactionsHandler = async (req: Request, res: Response) => {
    const result = await transactionsService.getAllTransaction();
    res.json(result);
};

export const addTransactionHandler = async (req: Request, res: Response) => {
    try {
        const result = await transactionsService.addTransaction(req.body);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            // validation failed
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        }
        // any other error
        res.status(500).json({ error: 'Internal Server Error' });
    }
};