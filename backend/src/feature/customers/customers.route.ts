import { Router } from "express";
import * as customerController from './customers.controller';

const router = Router();

// List all users
router.get('/', customerController.getAllCustomersHandler);

// Add new user
router.post('/add', customerController.addCustomerHandler);

export default router;