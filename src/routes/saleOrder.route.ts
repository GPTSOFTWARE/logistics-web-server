import { Router } from "express";
const router = Router();
import { getOrderByUserId, getSaleOrder, getOrderById } from "../controllers/saleOrderHeader/SOH.controller"

router.get("/order", getSaleOrder)
router.get("/order/:id", getOrderById)
router.get("/order/user/:id", getOrderByUserId);
// router.post("/order", createOrder);

export default router;