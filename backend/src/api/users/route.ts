import { Router } from "express";
import * as usersController from './controller';

const router = Router();

// List all users
router.get('/', usersController.getAllUsersHandler);

// Add new user by admin
router.post('/add', async (req, res, next) => {
    try {
        await usersController.adminAddUserHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Self register
router.post('/register/add', async (req, res, next) => {
    try {
        await usersController.userSelfRegisterHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Get user by id
router.get('/:id', async (req, res, next) => {
    try {
        await usersController.getUserByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Edit user by id
router.put('/update/:id', async (req, res, next) => {
    try {
        await usersController.updateUserByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
})

// Soft delete user by id
router.put('/delete/:id', async (req, res, next) => {
    try {
        await usersController.softDeleteUserByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;