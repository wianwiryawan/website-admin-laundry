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

// Get user by id
router.get('/:id', async (req, res, next) => {
    try {
        await usersController.getUserById(req, res);
    } catch (error) {
        next(error);
    }
});

// Edit user by id
router.put('/edit/:id', async (req, res, next) => {
    try {
        await usersController.editUserById(req, res);
    } catch (error) {
        next(error);
    }
})

// Soft delete user by id
router.put('/delete/:id', async (req, res, next) => {
    try {
        await usersController.softDeleteUserById(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;