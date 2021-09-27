import { Router } from "express";
const router = Router();
import {
    checkJWT,
    checkJWTAdmin
} from "../controllers/auth/auth.controller";
import auth from './../middleware/auth.middleware';


router.post("/me", auth, checkJWT);
router.post("/admin", auth, checkJWTAdmin);



export default router;