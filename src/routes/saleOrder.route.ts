import { Router } from "express";
const router = Router();
import {
    getOrderByUserId,
    getOrderById,
    createOrder,
    getSaleOrder,
    updateOrder,
    removeOrder,
    softDelete,
    restoreOrder,
    deleteMulti
}
    from "../controllers/SaleOrder/SOH.controller"
import auth from "../middleware/auth.middleware";

router.get("/orders", getSaleOrder)
router.get("/order/:id", getOrderById)
router.get("/order/user/:id", getOrderByUserId);
router.post("/order", createOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/soft/:id", softDelete);
router.patch("/order/restore/:id", restoreOrder);
router.delete("/order/:id", removeOrder);
router.delete("/order/delete", deleteMulti);
export default router;
