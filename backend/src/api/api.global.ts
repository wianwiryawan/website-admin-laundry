import { Response } from "express";
import { ZodError } from "zod";

export function handleError(res: Response, error: any) {
    console.log("Response error: \n"+error);
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

export const now = () => new Date();
