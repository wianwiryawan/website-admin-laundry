import { Router } from "express";
import * as perfumeController from './perfumes.controller';

const router = Router();

// List all perfume
router.get('/', perfumeController.getAllPerfumesHandler);

// Add new perfume
router.post('/add', perfumeController.addPerfumeHandler);

export default router;