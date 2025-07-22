import { Router } from "express";
import * as laundryServicesController from './laundry-services.controller';

const router = Router();

// List all laundry service
router.get('/', laundryServicesController.getAllLaundryServicesHandler);

// Add new laundry service
router.post('/add', laundryServicesController.addLaundryServiceHandler);

export default router;