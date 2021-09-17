import { Router } from "express";
import { getDistrict, getDistrictById, } from "../controllers/address/district.controller";
import { getProvince, getProvinceById } from "../controllers/address/province.controller";
const router = Router();

router.get('/city', getProvince);
router.get('/city/:id', getProvinceById);
router.get('/district', getDistrict);
router.get('/district/:id', getDistrictById);
// router.get('/district/city/:id', getDistrictByProvince)


export default router;