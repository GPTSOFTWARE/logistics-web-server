import { Router } from "express";
import { createRequest, getRequest, getAllRequest } from "../controllers/request/request.controller";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";
const router = Router();

router.get('/requests', auth, checkAdmin, getRequest);
router.get('/requests/all', auth, checkAdmin,getAllRequest);
router.post('/request', createRequest);

export default router;