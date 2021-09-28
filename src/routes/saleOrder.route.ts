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

router.get("/orders", auth,  getSaleOrder)
router.get("/order/:id", auth,getOrderById)
router.get("/order/user/:id", auth,getOrderByUserId);
router.get('/survey/totalprice',auth,  getSaleOrderByOrderByTotalPrice);
router.get('/survey/phone', auth, getOrderByPhone);
router.get('/survey/status/:id', auth, getOrderByStatus);
router.post("/order",auth, createOrder);
router.put("/order/:id",auth, updateOrder);
router.patch("/order/restore/:id", auth,restoreOrder);
router.delete("/order/delete", auth,deleteMulti);

export default router;
