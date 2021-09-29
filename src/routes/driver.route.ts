import { Router } from "express";
import { createDriver, deleteDriver, getDriverById, getDrivers, restoreDriver, updateDriver, getAllDrivers } from "../controllers/driver/driver.controller";
import auth from "../middleware/auth.middleware";
const router = Router();

router.get("/drivers", auth, getDrivers);
router.get("/drivers/all", auth, getAllDrivers);
router.get("/driver/:id", auth, getDriverById);
router.post("/driver", auth, createDriver);
router.put("/driver/:id", auth, updateDriver);
router.patch("/driver/restore/:id", auth, restoreDriver);
router.delete("/driver/delete", auth, deleteDriver);

export default router;