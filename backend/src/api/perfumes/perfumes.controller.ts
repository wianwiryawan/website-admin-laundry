import { Response, Request } from "express";
import * as perfumeService from './perfumes.service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllPerfumesHandler = async (req: Request, res: Response) => {
    const result = await perfumeService.getAllPerfumes();
    res.json(result);
};

export const addPerfumeHandler = async (req: Request, res: Response) => {
    try {
        const result = await perfumeService.addPerfume(req.body);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            // validation failed
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        }
        // any other error
        res.status(500).json({ error: 'Internal Server Error' + error});
    }
};