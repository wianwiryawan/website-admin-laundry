import { Router } from "express";
import * as loginController from './controller';

const router = Router();

// Login user
router.post('/', async (req, res, next) => {
  try {
    await loginController.loginHandler(req, res);
  } catch (err) {
    next(err);
  };
});

export default router;