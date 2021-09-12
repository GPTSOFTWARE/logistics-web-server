import { Router } from "express";
const router = Router();
<<<<<<< HEAD
import { userLogin, register } from '../controllers/auth/auth.controller';

router.post("/register", register);
router.post("/login", userLogin);
=======
import {
    login,
    register,
} from "../controllers/auth/auth.controller";

router.post("/login", login);
router.post("/register", register);

>>>>>>> d7101d74a8ea1c1130e7f0189340daa0228df289

export default router;