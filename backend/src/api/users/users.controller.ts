import { Request, Response } from 'express';
import * as usersService from './users.service';
import { ZodError } from 'zod';

// Controllers: Handle HTTP request/response only.

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const result = await usersService.getAllUsers();
    res.json(result);
};

export const getUserById = async (req: Request, res: Response) => {
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
        if (error instanceof ZodError) {
            // validation failed
            console.error(error);
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        }
        // any other error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const addUserHandler = async (req: Request, res: Response) => {
    try {
        const result = await usersService.addUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        // validation failed
        if (error instanceof ZodError) {
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        }
        // any other error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
