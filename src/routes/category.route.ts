import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category/category.controller";
import auth from "../middleware/auth.middleware";
const router = Router();
router.get('/categories',getCategory);
router.post('/category',  createCategory);

export default router;