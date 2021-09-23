import { Router } from "express";
import { getAllStatus } from './../controllers/status/status.controller';
const router = Router();

router.get('/status', getAllStatus);

export default router;