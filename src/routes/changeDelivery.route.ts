import { Router } from "express";
import { createDelivery } from "../controllers/deliveryOrder/createDeliveryOrder.controller";
import { deleteDelivery, getDelivery, getDeliveryById, getHistoryDelivery, restoreDelivery } from "../controllers/deliveryOrder/delivery.controller";
import { switchDelivery, getDeliveryOrder, getDeliveryOrderById } from "../controllers/deliveryOrder/deliveryOrder.controller";

const router = Router();

router.get('/delivery', getDeliveryOrder);
router.get('/delivery/:id', getDeliveryOrderById);
router.get('/status', getDelivery);
router.get('/status/:id', getDeliveryById);
router.get('/delivery/history/:id', getHistoryDelivery);
router.post('/delivery', createDelivery);
router.put('/delivery/update/:id', switchDelivery);
router.patch("/delivery/restore/:id", restoreDelivery);
router.delete("/delivery/delete", deleteDelivery);

export default router;
