import { Router } from "express";
import { createRequest, getRequest } from "../controllers/request/request.controller";
const router = Router();

router.get('/requests', getRequest);
router.post('/request', createRequest);

export default router;