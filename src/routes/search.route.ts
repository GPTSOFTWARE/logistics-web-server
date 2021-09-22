import { Router } from "express";
const router = Router();
import {searchingOrder} from "../controllers/searching/searching.controller";

router.get('/search/order', searchingOrder);
router.post('/search/order', searchingOrder);
export default router;


