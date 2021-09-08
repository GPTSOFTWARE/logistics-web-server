import { Router } from "express";
const router = Router();
import { getUsers } from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';

// router.post('/login',postLogin);
router.get("/users", auth, getUsers);
// router.get('/user/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
