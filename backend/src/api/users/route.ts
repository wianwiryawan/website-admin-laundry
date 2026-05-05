import { Router } from "express";
import * as usersController from './controller';

const router = Router();

// List all users
router.get('/', async (req, res, next) => {
    try {
        usersController.getAllUsersHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Get user by id
router.get('/:userId', async (req, res, next) => {
    try {
        await usersController.getUserByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Add new user by admin
router.post('/add', async (req, res, next) => {
    try {
        await usersController.adminAddUserHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Self register
router.post('/register', async (req, res, next) => {
    try {
        await usersController.userRegisterHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Edit user by id
router.put('/edit', async (req, res, next) => {
    try {
        await usersController.updateUserByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

router.post('/edit/password', async (req, res, next) => {
    try {
        await usersController.passwordUpdateByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Soft delete user by id
router.delete('/delete/:userId', async (req, res, next) => {
    try {
        await usersController.softDeleteUserByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;