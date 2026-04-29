import { Request, Response } from "express";
import * as transactionsService from './service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllTransactionsHandler = async (req: Request, res: Response) => {
    const result = await transactionsService.getAllTransaction();
    res.json(result);
};

export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const id = req.body.id;
        const result = await transactionsService.getTransactionById(id);
        if (result.length == 0) {
            return res.status(400).json({
                message: 'Data not found',
            });
        }
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
}

export const addTransactionHandler = async (req: Request, res: Response) => {
    try {
        const requestBody = req.body;
        const adminId = requestBody.adminId;
        const result = await transactionsService.addTransaction(requestBody, adminId);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateTransactionHandler = async (req: Request, res: Response) => {
    try {
        const requestBody = req.body;
        const adminId = Number(requestBody.adminId);
        const result = await transactionsService.updateTransaction(requestBody, adminId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const softDeleteTransactionHandler = async (req: Request, res: Response) => {
    try {
        const requestBody = req.body;
        const adminId = Number(req.body.adminId);
        const result = await transactionsService.deleteTransaction(requestBody, adminId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
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