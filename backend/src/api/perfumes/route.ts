import { Router } from "express";
import * as perfumeController from './controller';

const router = Router();

// List all perfume
router.get('/', async (req, res, next) => {
    try {
        perfumeController.getAllPerfumesHandler(req, res);
    } catch (error) {
        next(error);
    }
});

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
router.put('/edit', async (req, res, next) => {
    try {
        await perfumeController.updatePerfumeHandler(req, res);
    } catch (error) {
        next(error);
    }
});

// Soft delete perfume by id
router.delete('/delete/:id', async (req, res, next) => {
    try {
        await perfumeController.softDeletePerfumeHandler(req, res);
    } catch (error) {
        next(error);
    }
})

export default router;