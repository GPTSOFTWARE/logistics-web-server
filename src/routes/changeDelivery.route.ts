import { Router } from "express";
import { switchDelivery } from "../controllers/deliveryOrder/deliveryOrder.controller";
import { addProductToDriver, changeDelivery } from "../controllers/saleOrderHeader/changeDelivery.controller";
const router = Router();

router.post('/delivery-switch', switchDelivery);
router.post("/driver/addproduct", addProductToDriver);
router.post("/change-delivery/order/:id", changeDelivery);
export default router;
