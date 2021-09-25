import { Router } from "express";
import { deleteDelivery, getDelivery, getDeliveryById, getHistoryDelivery, restoreDelivery } from "../controllers/deliveryOrder/delivery.controller";
import { switchDelivery, getDeliveryOrder, getDeliveryOrderById } from "../controllers/deliveryOrder/deliveryOrder.controller";

const router = Router();

router.get('/deliveryorder', getDeliveryOrder);
router.get('/deliveryorder/:id', getDeliveryOrderById);
router.get('/delivery', getDelivery);
router.get('/delivery/:id', getDeliveryById);
router.get('/delivery/history/:id', getHistoryDelivery);
router.put('/delivery/update/:id', switchDelivery);
router.patch("/delivery/restore/:id", restoreDelivery);
router.delete("/delivery/delete", deleteDelivery);

export default router;
