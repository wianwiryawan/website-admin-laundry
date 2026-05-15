import { Request, Response } from "express";
import * as laundryServicesService from './service';
import { handleError } from '@/api/api.global';

// Controllers: Handle HTTP request/response only.

export const getAllLaundryServicesHandler = async (req: Request, res: Response) => {
    const result = await laundryServicesService.getAllLaundryServices();
    if (result.length == 0) {
        return res.status(404).json({
            message: 'Data not found',
        });
    };
    res.json(result);
};

export const getLaundryById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await laundryServicesService.getLaundryById(id);
        if (result.length == 0) {
            return res.status(404).json({
                message: 'Data not found',
            });
        };
        res.json(result);
    } catch (error) {
        handleError(res, error);
    };
};

export const addLaundryServiceHandler = async (req: Request, res: Response) => {
    try {
        const adminId = req.body.adminId;
        const result = await laundryServicesService.addLaundryService(req.body, adminId);
        res.status(201).json(result);
    } catch (error) {
        handleError(res, error);
    };
};

export const updateLaundryServiceHandler = async (req: Request, res: Response) => {
    try {
        const requestBody = req.body;
        const adminId = requestBody.adminId;
        const result = await laundryServicesService.updateLaundryServiceById(requestBody, adminId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    };
};

export const softDeleteLaundryServiceHandler = async (req: Request, res: Response) => {
    try {
        const serviceId = Number(req.params.id);
        const adminId = Number(req.body.adminId);
        const result = await laundryServicesService.softDeleteLaundryService(serviceId, adminId);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    };
};