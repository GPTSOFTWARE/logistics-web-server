import { Router } from "express";
const router = Router();
import {  updateUser, getUserById, deleteUser, login, register, getUsers, adminLogin, changePassword, restoreUser, deleteMultiUser } from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';


router.post('/login',login);
router.post('/admin/dashboard',adminLogin);
router.post('/register',register);
router.get("/users", getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id',updateUser);
router.delete('/user/delete',deleteMultiUser);
router.patch("/user/restore/:id",restoreUser);
router.post('/user/changepassword/:id', changePassword);

export default router;

