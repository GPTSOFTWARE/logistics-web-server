import { Router } from "express";
const router = Router();
import {searchingOrder} from "../controllers/searching/searching.controller";

router.post('/search/order', searchingOrder);
router.get('/search/order', searchingOrder);
export default router;


