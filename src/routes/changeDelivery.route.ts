import { Router } from "express";
import { createDelivery } from "../controllers/deliveryOrder/createDeliveryOrder.controller";
import { deleteDelivery, getDelivery, getDeliveryById, getHistoryDelivery, getHistoryDetails, restoreDelivery } from "../controllers/deliveryOrder/delivery.controller";
import { switchDelivery, getDeliveryOrder, getDeliveryOrderById } from "../controllers/deliveryOrder/deliveryOrder.controller";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";

const router = Router();

router.get('/delivery',auth,getDeliveryOrder);
router.get('/delivery/:id',auth,getDeliveryOrderById);
router.get('/status',auth, getDelivery);
router.get('/status/:id', auth,getDeliveryById);
router.get('/delivery/viewdetails/:id', auth,getHistoryDetails);
router.get('/delivery/history/:id',auth, getHistoryDelivery);
router.post('/delivery', auth,createDelivery);
router.put('/delivery/update/:id', auth, switchDelivery);
router.patch("/delivery/restore/:id", auth,restoreDelivery);
router.delete("/delivery/delete", auth,deleteDelivery);

export default router;
