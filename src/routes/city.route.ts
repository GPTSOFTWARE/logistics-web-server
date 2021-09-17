import { Router } from "express";
import { getDistrict } from "../controllers/address/district.controller";
import { getProvince, getProvinceById } from "../controllers/address/province.controller";
const router = Router();

router.get('/city', getProvince);
router.get('/city/:id', getProvinceById);
router.get('/district', getDistrict);


export default router;