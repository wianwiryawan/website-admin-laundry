import { Router } from "express";
import * as transactionController from './transactions.controller';

const router = Router();

// List all transaction
router.get('/', transactionController.getAllTransactionsHandler);

// Add new transaction record
router.post('/add', transactionController.addTransactionHandler);

export default router;