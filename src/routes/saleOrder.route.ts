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
    getSaleOrderByTotalPrice,
    getOrderByStatus,
    getOrderByPhone
}
    from "../controllers/SaleOrder/SOH.controller"
import auth from "../middleware/auth.middleware";

router.get("/orders", getSaleOrder)
router.get("/order/:id", getOrderById)
router.get("/order/user/:id", getOrderByUserId);
router.get('/survey/totalprice', getSaleOrderByTotalPrice);
router.get('/survey/status/:id', getOrderByStatus);
router.get('/survey/phone', getOrderByPhone);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.patch("/order/restore/:id", restoreOrder);
router.delete("/order/delete", deleteMulti);

export default router;
