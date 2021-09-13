import { Router } from "express";
const router = Router();
// import { getUsers , createUser, updateUser , getUserById, deleteUser} from "../controllers/user/user.controller";
// import auth from './../middleware/auth.middleware';

// // router.post('/login',postLogin);
// router.get("/users", auth, getUsers);
// router.get('/user/:id', getUserById);
// router.post('/users', createUser);
// router.put('/users/:id', auth,updateUser);
// router.delete('/users/:id', deleteUser);
import { getUsers , updateUser, getUserById, deleteUser, login, register } from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';
router.post('/login',login);
router.post('/register',register);
router.get("/users", getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id',updateUser);
router.delete('/users/:id',deleteUser);


export default router;
