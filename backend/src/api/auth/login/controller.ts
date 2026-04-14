import { Request, Response } from "express";
import * as authService from './service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const loginHandler = async (req: Request, res: Response) => {
    try {
        // pass raw req.body to the service
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        handleError(res, error);
    }
};

function handleError(res: Response, error: any) {
    if (error instanceof ZodError) {
            // validation failed
            return res.status(400).json({
                message: 'Validation error',
                errors: error,
            });
    }
    // other errors
    res.status(500).json({
        message: 'Internal server error',
    });
}