import { Router } from "express";
import * as perfumeController from './perfumes.controller';

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

export default router;