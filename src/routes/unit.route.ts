import { Router } from "express";
import { getUnit } from "../controllers/unit/unit.controller";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";
const router = Router();

router.get('/unit', auth ,getUnit);

export default router;