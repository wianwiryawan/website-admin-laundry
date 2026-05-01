import { Response, Request } from "express";
import * as perfumeService from './service';
import { handleError } from '@/api/api.global';

// Controllers: Handle HTTP request/response only.

export const getAllPerfumesHandler = async (res: Response) => {
    const result = await perfumeService.getAllPerfumes();
    res.json(result);
};

export const getPerfumeByIdHandler = async (req: Request, res: Response) => {
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
        handleError(res, error);
    };
};

export const addPerfumeHandler = async (req: Request, res: Response) => {
    try {
        const adminId = req.body.id;
        const result = await perfumeService.addPerfume(req.body, adminId);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    };
};

export const updatePerfumeHandler = async (req: Request, res: Response) => {
    try {
        const adminId = Number(req.params.id);
        const result = await perfumeService.updatePerfume(req.body, adminId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    };
};

export const deletePerfumeHandler = async (req: Request, res: Response) => {
    try {
        const adminId = Number(req.params.id);
        const result = await perfumeService.deletePerfume(req.body, adminId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    };
};