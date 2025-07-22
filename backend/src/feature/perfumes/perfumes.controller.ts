import { Response, Request } from "express";
import * as perfumeService from './perfumes.service';

// Controllers: Handle HTTP request/response only.

export const getAllPerfumesHandler = async (req: Request, res: Response) => {
    const result = await perfumeService.getAllPerfumes();
    res.json(result);
};

export const addPerfumeHandler = async (req: Request, res: Response) => {
    const {
        perfumeName,
        price,
        description,
        status,
    } = req.body;
    const result = await perfumeService.addPerfume({
        perfumeName,
        price,
        description,
        status,
    });
    res.status(201).json(result);
};