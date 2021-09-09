import { Router } from "express";
const router = Router();
import { getProducts } from "../controllers/product/product.controller";
import auth from './../middleware/auth.middleware';

router.get("/products", getProducts);

export default router;
