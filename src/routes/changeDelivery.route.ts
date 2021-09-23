import { Router } from "express";
import { getDelivery, getDeliveryById } from "../controllers/deliveryOrder/delivery.controller";
import { switchDelivery, getDeliveryOrder, getDeliveryOrderById, addDriverToOrder } from "../controllers/deliveryOrder/deliveryOrder.controller";

const router = Router();

router.get('/deliveryorder', getDeliveryOrder);
router.get('/deliveryorder/:id', getDeliveryOrderById);
router.get('/delivery', getDelivery);
router.get('/delivery/:id', getDeliveryById);
router.post('/delivery-switch', switchDelivery);
router.put('/delivery/driver', addDriverToOrder);
export default router;
