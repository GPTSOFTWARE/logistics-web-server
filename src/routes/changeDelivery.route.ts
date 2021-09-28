import { Router } from "express";
import { createDelivery } from "../controllers/deliveryOrder/createDeliveryOrder.controller";
import { deleteDelivery, getDelivery, getDeliveryById, getHistoryDelivery, restoreDelivery } from "../controllers/deliveryOrder/delivery.controller";
import { switchDelivery, getDeliveryOrder, getDeliveryOrderById } from "../controllers/deliveryOrder/deliveryOrder.controller";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";

const router = Router();

router.get('/delivery' ,getDeliveryOrder);
router.get('/delivery/:id',getDeliveryOrderById);
router.get('/status', getDelivery);
router.get('/status/:id', getDeliveryById);
router.get('/delivery/history/:id', getHistoryDelivery);
router.post('/delivery', auth, checkAdmin,createDelivery);
router.put('/delivery/update/:id', auth, checkAdmin,switchDelivery);
router.patch("/delivery/restore/:id", auth, checkAdmin,restoreDelivery);
router.delete("/delivery/delete", auth, checkAdmin,deleteDelivery);

export default router;
