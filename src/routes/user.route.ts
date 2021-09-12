import { Router } from "express";
const router = Router();
<<<<<<< HEAD
import { getUsers , createUser, updateUser , getUserById, deleteUser} from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';

// router.post('/login',postLogin);
router.get("/users", auth, getUsers);
router.get('/user/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', auth,updateUser);
router.delete('/users/:id', deleteUser);
=======
import { getUsers , updateUser, getUserById, deleteUser } from "../controllers/user/user.controller";
import auth from './../middleware/auth.middleware';

router.get("/users", getUsers);
router.get('/user/:id', getUserById);
router.put('/user/:id',updateUser);
router.delete('/users/:id',deleteUser);
>>>>>>> d7101d74a8ea1c1130e7f0189340daa0228df289

export default router;
