import { Router } from "express";
import { getDelivery, getDeliveryById, getHistoryDelivery } from "../controllers/deliveryOrder/delivery.controller";
import { switchDelivery, getDeliveryOrder, getDeliveryOrderById } from "../controllers/deliveryOrder/deliveryOrder.controller";

const router = Router();

router.get('/deliveryorder', getDeliveryOrder);
router.get('/deliveryorder/:id', getDeliveryOrderById);
router.get('/delivery', getDelivery);
router.get('/delivery/:id', getDeliveryById);
router.get('/delivery/history/:id', getHistoryDelivery);
router.put('/delivery/update/:id', switchDelivery);
export default router;
