import { Request, Response } from 'express';
import * as usersService from './users.service';

// Controllers: Handle HTTP request/response only.

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await usersService.getAllUsers();
    res.json(users);
};

export const addUser = async (req: Request, res: Response) => {
    const { 
        username, 
        status, 
        email 
    } = req.body;
    const addUser = await usersService.addUser({ 
        username, 
        status, 
        email 
    });
    res.status(201).json(addUser);
};
