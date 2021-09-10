import { Router } from "express";
const router = Router();
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, removeProduct , restoreProduct} from "../controllers/product/product.controller";
import auth from './../middleware/auth.middleware';

router.get("/products", getProducts);
router.post("/product/create", createProduct);
router.get("/product/:id", getProductById);
router.put("/product/update/:id", updateProduct);
router.delete("/product/soft/:id", removeProduct);
router.patch("/product/restore/:id", restoreProduct);
router.delete("/product/delete/:id", deleteProduct);


export default router;
