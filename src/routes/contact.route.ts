import { Router } from "express";
import { createContact, getContact, getAllContact } from "../controllers/contact/contact.controller";
import auth from "../middleware/auth.middleware";
const router = Router();

router.get('/contact', auth, getContact);
router.get('/contact/all', auth, getAllContact);
router.post('/contact', createContact);

export default router;
