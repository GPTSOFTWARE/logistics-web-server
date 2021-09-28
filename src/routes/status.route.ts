import { Router } from "express";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";
import { getAllStatus } from './../controllers/status/status.controller';
const router = Router();

router.get('/status', auth, checkAdmin,getAllStatus);

export default router;