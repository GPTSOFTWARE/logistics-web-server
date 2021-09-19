import { Router } from "express";
import { switchDelivery } from "../controllers/deliveryOrder/deliveryOrder.controller";

const router = Router();

router.post('/delivery-switch', switchDelivery);
export default router;
