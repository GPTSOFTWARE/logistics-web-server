import { Router } from "express";
const router = Router();
import { getOrderByUserId} from "../controllers/saleOrderHeader/SOH.controller"

router.get("/order/user/:id", getOrderByUserId);
// router.post("/order", createOrder);

export default router;