import { Router } from "express";
import { addProductToDriver, changeDelivery } from "../controllers/saleOrderHeader/changeDelivery.controller";
const router = Router();

router.post("/driver/addproduct", addProductToDriver);
router.post("/change-delivery/order/:id", changeDelivery);
export default router;
