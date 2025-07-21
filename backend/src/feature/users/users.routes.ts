import { Router } from "express";
import * as userController from './users.controller';

const router = Router();

// List all users
router.get('/', userController.getAllUsersHandler);

// Add new user
router.post('/add', userController.addUserHandler);

// You can add more routes here as needed:
// router.get('/:id', UserController.getUserById);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

export default router;