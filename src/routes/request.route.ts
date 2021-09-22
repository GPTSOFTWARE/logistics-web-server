import { Router } from "express";
import { createRequest, getRequest, getAllRequest } from "../controllers/request/request.controller";
const router = Router();

router.get('/requests', getRequest);
router.get('/requests/all', getAllRequest);
router.post('/request', createRequest);

export default router;