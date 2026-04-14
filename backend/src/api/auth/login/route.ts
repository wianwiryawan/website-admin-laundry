import { Router } from "express";
import * as authController from './controller';

const router = Router();

// Login user
router.post('/', async (req, res, next) => {
  try {
    await authController.loginHandler(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;