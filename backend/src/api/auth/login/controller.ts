import { Request, Response } from "express";
import * as authService from './service';
import { handleError } from '@/api/api.global';

// Controllers: Handle HTTP request/response only.

export const loginHandler = async (req: Request, res: Response) => {
    try {
        // pass raw req.body to the service
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        handleError(res, error);
    };
};

