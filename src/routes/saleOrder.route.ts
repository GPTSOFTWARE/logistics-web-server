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

router.get("/orders", getSaleOrder)
router.get("/order/:id", getOrderById)
router.get("/order/user/:id", getOrderByUserId);
router.get('/survey/totalprice', getSaleOrderByOrderByTotalPrice);
router.get('/survey/phone', getOrderByPhone);
router.get('/survey/status/:id', getOrderByStatus);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.patch("/order/restore/:id", restoreOrder);
router.delete("/order/delete", deleteMulti);

export default router;
