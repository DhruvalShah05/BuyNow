import express from "express";
import {
  createContact,
  getContacts,
  replyToContact,
  getMyContacts,
  deleteContact,
} from "../controllers/contactController.js";

import {
  protect,
  protectOptional,
} from "../middleware/authMiddleware.js";

import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protectOptional, createContact);


router.get("/", protect, adminOnly, getContacts);


router.put("/:id/reply", protect, adminOnly, replyToContact);


router.get("/my", protect, getMyContacts);


router.delete("/:id", protect, adminOnly, deleteContact);

export default router;