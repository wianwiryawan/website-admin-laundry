import { Router } from "express";
import * as usersController from './users.controller';

const router = Router();

// List all users
router.get('/', usersController.getAllUsersHandler);

// Add new user
router.post('/add', async (req, res, next) => {
    try {
        await usersController.addUserHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Select selected user
router.get('/:id', async (req, res, next) => {
    try {
        await usersController.getUserById(req, res);
    } catch (error) {
        next(error);
    }
});

// You can add more routes here as needed:
// router.get('/:id', UserController.getUserById);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

export default router;