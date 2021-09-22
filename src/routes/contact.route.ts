import { Router } from "express";
import { createContact, getContact, getAllContact } from "../controllers/contact/contact.controller";
const router = Router();

router.get('/contact', getContact);
router.get('/contact/all', getAllContact);
router.post('/contact', createContact);

export default router;