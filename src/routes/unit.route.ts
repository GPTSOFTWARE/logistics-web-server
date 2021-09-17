import { Router } from "express";
import { getUnit } from "../controllers/unit/unit.controller";
const router = Router();

router.get('/unit', getUnit);

export default router;