import { Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
    public status: number;

    constructor(status: number = 500, message: string) {
        super(message);
        this.status = status;
        this.name = 'AppError';
    }
}

export function handleError(res: Response, error: any) {
    if (error instanceof ZodError) {
            // validation failed
            console.log(error);
            return res.status(400).json({
                message: 'Invalid request body',
            });
    }

    // other errors
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = error instanceof AppError ? error.status : 500;

    res.status(status).json({
        message,
    });
}

export const now = () => new Date();
