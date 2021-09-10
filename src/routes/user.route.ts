import { Router } from "express";
const router = Router();
import { getUsers , updateUser, getUserById, deleteUser } from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';

router.get("/users", getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id',updateUser);
router.delete('/users/:id',deleteUser);

export default router;
