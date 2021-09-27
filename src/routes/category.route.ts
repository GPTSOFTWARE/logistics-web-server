import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category/category.controller";
const router = Router();
router.get('/categories', getCategory);
router.post('/category', createCategory);

export default router;