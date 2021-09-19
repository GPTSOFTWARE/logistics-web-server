import { Router } from "express";
import { getPayment } from './../controllers/payment/payment.controller';
const router = Router();

router.get('/payment', getPayment);

export default router;