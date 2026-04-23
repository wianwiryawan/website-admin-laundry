import { Router } from "express";
import * as perfumeController from './controller';

const router = Router();

// List all perfume
router.get('/', perfumeController.getAllPerfumesHandler);

// Add new perfume
router.post('/add', async (req, res, next) => {
    try {
        await perfumeController.addPerfumeHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Get perfume by id
router.get('/:id', async (req, res, next) => {
    try {
        await perfumeController.getPerfumeByIdHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Edit perfume by id
router.put('/edit/:id', async (req, res, next) => {
    try {
        await perfumeController.updatePerfumeHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Soft delete perfume by id
router.put('/delete/:id', async (req, res, next) => {
    try {
        await perfumeController.deletePerfumeHandler(req, res);
    } catch (error) {
        next(error);
    }
})

export default router;