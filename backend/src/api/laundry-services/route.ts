import { Router } from "express";
import * as laundryServiceController from './controller';

const router = Router();

// List all laundry service
router.get('/', async (req, res, next) => {
    try {
        laundryServiceController.getAllLaundryServicesHandler(res);
    } catch (error) {
        next(error);
    }
});

// Add new laundry service
router.post('/add', async (req, res, next) => {
    try {
        await laundryServiceController.addLaundryServiceHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Get new laundry service by id
router.get('/:id', async (req, res, next) => {
    try {
        await laundryServiceController.getLaundryById(req, res);
    } catch (error) {
        next(error);
    }
});

// Edit existing laundry service by id
router.get('/edit', async (req, res, next) => {
    try {
        await laundryServiceController.updateLaundryServiceHandler(req, res);
    } catch (error) {
        next(error);
    }
})

// Soft delete existing laundry service by id
router.put('/delete', async (req, res, next) => {
    try {
        await laundryServiceController.deleteLaundryServiceHandler(req, res);
    } catch (error) {
        next(error);
    }
})

export default router;