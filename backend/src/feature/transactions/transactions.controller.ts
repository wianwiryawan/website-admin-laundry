import { Request, Response } from "express";
import * as transactionsService from './transactions.service';

// Controllers: Handle HTTP request/response only.

export const getAllTransactionsHandler = async (req: Request, res: Response) => {
    const result = await transactionsService.getAllTransaction();
    res.json(result);
};

export const addTransactionHandler = async (req: Request, res: Response) => {
    const {
        transactionDate,
        customerId,
        serviceId,
        perfumeId,
        totalPrice
    } = req.body;
    const result = await transactionsService.addTransaction({
        transactionDate,
        customerId,
        serviceId,
        perfumeId,
        totalPrice
    });
    res.status(201).json(result);
};