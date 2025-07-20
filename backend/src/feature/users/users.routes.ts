import { Router } from "express";
import * as UserController from './users.controller';

const router = Router();

// List all users
router.get('/', UserController.getAllUsers);

// Add new user
router.post('/add', UserController.createUser);

// You can add more routes here as needed:
// router.get('/:id', UserController.getUserById);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

export default router;