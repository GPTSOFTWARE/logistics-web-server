import { Router } from "express";
import { createContact, getContact, getAllContact } from "../controllers/contact/contact.controller";
import auth from "../middleware/auth.middleware";
import checkAdmin from "../middleware/role.middleware";
const router = Router();

router.get('/contact', auth, checkAdmin,getContact);
router.get('/contact/all',auth, checkAdmin ,getAllContact);
router.post('/contact',auth, checkAdmin ,createContact);

export default router;
