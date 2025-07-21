import { Request, Response } from 'express';
import * as usersService from './users.service';

// Controllers: Handle HTTP request/response only.

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const result = await usersService.getAllUsers();
    res.json(result);
};

export const addUserHandler = async (req: Request, res: Response) => {
    const { 
        username, 
        status, 
        email 
    } = req.body;
    const result = await usersService.addUser({ 
        username, 
        status, 
        email 
    });
    res.status(201).json(result);
};
