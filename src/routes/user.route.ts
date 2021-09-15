import { Router } from "express";
const router = Router();
import {  updateUser, getUserById, deleteUser, login, register, getUsers } from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';
router.post('/login',login);
router.post('/register',register);
router.get("/users", getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id',updateUser);
router.delete('/users/:id',deleteUser);


export default router;
