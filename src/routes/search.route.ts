import { Router } from "express";
const router = Router();
import {searchingJob, searchingOrder} from "../controllers/searching/searching.controller";

router.post('/search/order', searchingOrder);
router.get('/search/job', searchingJob);

export default router;


