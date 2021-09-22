import { Router } from "express";
import { createDriver, deleteDriver, getDriverById, getDrivers, restoreDriver, updateDriver } from "../controllers/driver/driver.controller";
const router = Router();

router.get("/drivers", getDrivers);
router.get("/driver/:id", getDriverById);
router.post("/driver", createDriver);
router.put("/driver/:id", updateDriver);
router.patch("/driver/restore/:id", restoreDriver);
router.delete("/driver/delete", deleteDriver);

export default router;