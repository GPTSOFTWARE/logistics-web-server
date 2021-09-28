import { Router } from "express";
import { createCategory, getCategory } from "../controllers/category/category.controller";
import auth from "../middleware/auth.middleware";
const router = Router();
router.get('/categories',auth,getCategory);
router.post('/category', auth, createCategory);

export default router;