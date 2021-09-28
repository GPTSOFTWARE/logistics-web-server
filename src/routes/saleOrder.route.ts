import { Router } from "express";
const router = Router();
import {
    getOrderByUserId,
    getOrderById,
    createOrder,
    getSaleOrder,
    updateOrder,
    restoreOrder,
    deleteMulti,
    getOrderByStatus,
    getOrderByPhone,
    getSaleOrderByOrderByTotalPrice
}
    from "../controllers/SaleOrder/SOH.controller"
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";

router.get("/orders", auth, checkAdmin, getSaleOrder)
router.get("/order/:id", auth,getOrderById)
router.get("/order/user/:id", auth,getOrderByUserId);
router.get('/survey/totalprice',auth, checkAdmin,  getSaleOrderByOrderByTotalPrice);
router.get('/survey/phone', auth,checkAdmin,getOrderByPhone);
router.get('/survey/status/:id', auth, checkAdmin,getOrderByStatus);
router.post("/order",auth, checkAdmin ,createOrder);
router.put("/order/:id",auth, checkAdmin ,updateOrder);
router.patch("/order/restore/:id", auth,checkAdmin,restoreOrder);
router.delete("/order/delete", auth, checkAdmin,deleteMulti);

export default router;
