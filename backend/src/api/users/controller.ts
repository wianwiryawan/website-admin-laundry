import { Request, Response } from 'express';
import * as usersService from './service';
import { handleError } from '@/api/api.global';

// Controllers: Handle HTTP request/response only.

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const result = await usersService.getAllUsers();
    res.json(result);
};

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await usersService.getUserById(id);
        if(result.length == 0){
            return res.status(404).json({
                message: 'Data not found',
            });
        }
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
}

export const adminAddUserHandler = async (req: Request, res: Response) => {
    try {
        const adminId = req.body.id;
        const result = await usersService.adminAddUser(req.body, adminId);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const userSelfRegisterHandler = async (req: Request, res: Response) => {
    try {
        const result = await usersService.userSelfRegister(req.body);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updateData = req.body;
        const result = await usersService.updateUserById(id, updateData);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
}

export const passwordUpdateByIdHandler = async (req: Request, res: Response) => {
    try {
        const updateData = req.body;
        const result = await usersService.passwordUpdateById(updateData);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
};

export const softDeleteUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const result = await usersService.softDeleteUserById(userId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
}