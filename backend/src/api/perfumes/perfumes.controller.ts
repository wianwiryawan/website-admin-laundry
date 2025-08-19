import { Response, Request } from "express";
import * as perfumeService from './perfumes.service';
import { ZodError } from "zod";

// Controllers: Handle HTTP request/response only.

export const getAllPerfumesHandler = async (req: Request, res: Response) => {
    const result = await perfumeService.getAllPerfumes();
    res.json(result);
};

export const getPerfumeById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await perfumeService.getPerfumeById(id);
        if (result.length == 0) {
            return res.status(404).json({
                message: 'Data not found',
            });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const addPerfumeHandler = async (req: Request, res: Response) => {
    try {
        const result = await perfumeService.addPerfume(req.body);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof ZodError) {
            // validation failed
            console.error(error);
            return res.status(400).json({
                error: 'Validation Error',
                details: error,
            });
        }
        // any other error'
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' + error});
    }
};