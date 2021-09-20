import { Router } from "express";
import { createContact, getContact } from "../controllers/contact/contact.controller";
const router = Router();

router.get('/contact', getContact);
router.post('/contact', createContact);

export default router;