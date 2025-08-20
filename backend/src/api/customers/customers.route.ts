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

// Get laundry service by id
router.get('/:id', async (req, res, next) => {
  try {
    await customerController.getCustomerById(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;