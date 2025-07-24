import { Router } from "express";
import * as customerController from './customers.controller';

const router = Router();

// List all users
router.get('/', customerController.getAllCustomersHandler);

// Add new user
router.post('/add', async (req, res, next) => {
  try {
    await customerController.addCustomerHandler(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;