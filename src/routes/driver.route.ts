import { Router } from "express";
import { createDriver, deleteDriver, getDriverById, getDrivers, restoreDriver, updateDriver, getAllDrivers } from "../controllers/driver/driver.controller";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";
const router = Router();

router.get("/drivers",auth, checkAdmin ,getDrivers);
router.get("/drivers/all", auth, checkAdmin,getAllDrivers);
router.get("/driver/:id",auth, checkAdmin ,getDriverById);
router.post("/driver", auth, checkAdmin,createDriver);
router.put("/driver/:id", auth, checkAdmin,updateDriver);
router.patch("/driver/restore/:id", auth, checkAdmin,restoreDriver);
router.delete("/driver/delete", auth, checkAdmin,deleteDriver);

export default router;