import { Router } from "express";
import { checkJWT, checkJWTAdmin } from "../controllers/auth/auth.controller";
const router = Router();
import { updateUser, getUserById, getAllUsers, login, register, getUsers, adminLogin, changePassword, restoreUser, deleteMultiUser } from "../controllers/user/user.controller";
import checkAdmin from "../middleware/role.middleware";
import auth from './../middleware/auth.middleware';


router.post('/login', login);
router.post('/admin/dashboard', adminLogin);
router.post('/register', register);
router.get("/users",checkAdmin,getUsers);
router.get("/users/all",auth,checkAdmin,getAllUsers);
router.get('/user/:id', auth,getUserById);
router.put('/user/:id',auth,updateUser);
router.delete('/user/delete',auth, checkAdmin ,deleteMultiUser);
router.patch("/user/restore/:id", auth, checkAdmin,restoreUser);
router.post('/user/changepassword/:id', auth,changePassword);

export default router;

