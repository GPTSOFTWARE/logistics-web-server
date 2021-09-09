import { Router } from "express";
const router = Router();
import { userLogin, register } from '../controllers/auth/auth.controller';

router.post("/register", register);
router.post("/login", userLogin);

export default router;