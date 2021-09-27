import { Router } from "express";
import { getCategory } from "../controllers/category/category.controller";
const router = Router();
router.get('/category', getCategory);
export default router;