import { Router } from "express";
const router = Router();
import {
    checkJWT
} from "../controllers/auth/auth.controller";
import auth from './../middleware/auth.middleware';


router.post("/me", auth, checkJWT);



export default router;