import { Router } from "express";
import * as customerController from './customers.controller';

const router = Router();

// List all users
router.get('/', customerController.getAllCustomers);

// Add new user
router.post('/add', customerController.createCustomer);

export default router;