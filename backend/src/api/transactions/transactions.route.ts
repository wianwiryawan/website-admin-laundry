import { Router } from "express";
import * as transactionController from './transactions.controller';

const router = Router();

// List all transaction
router.get('/', transactionController.getAllTransactionsHandler);

// Add new transaction record
router.post('/add', async (req, res, next) => {
    try {
        await transactionController.addTransactionHandler(req, res);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await transactionController.getTransactionById(req, res);
    } catch (error) {
        next(error);
    }
})

export default router;