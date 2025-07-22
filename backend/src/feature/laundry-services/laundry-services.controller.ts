import { Request, Response } from "express";
import * as laundryServicesService from './laundry-services.service';

// Controllers: Handle HTTP request/response only.

export const getAllLaundryServicesHandler = async (req: Request, res: Response) => {
    const result = await laundryServicesService.getAllLaundryServices();
    res.json(result);
};

export const addLaundryServiceHandler = async (req: Request, res: Response) => {
    const {
        serviceName,
        price,
        status,
    } = req.body;
    const result = await laundryServicesService.addLaundryService({
        serviceName,
        price,
        status,
    });
    res.status(201).json(result);
};