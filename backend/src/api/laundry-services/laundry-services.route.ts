import { Router } from "express";
import * as laundryServiceController from './laundry-services.controller';

const router = Router();

// List all laundry service
router.get('/', laundryServiceController.getAllLaundryServicesHandler);

// Add new laundry service
router.post('/add', async (req, res, next) => {
    try {
        await laundryServiceController.addLaundryServiceHandler(req, res);
    } catch (error) {
        next(error);
    }
});

export default router;