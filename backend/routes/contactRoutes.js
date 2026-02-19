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


// ===============================
// Public - Create Message
// ===============================
router.post("/", protectOptional, createContact);


// ===============================
// Admin - Get All Messages
// ===============================
router.get("/", protect, adminOnly, getContacts);


// ===============================
// Admin - Reply to Message
// ===============================
router.put("/:id/reply", protect, adminOnly, replyToContact);


// ===============================
// User - Get My Messages
// ===============================
router.get("/my", protect, getMyContacts);


// ===============================
// Admin - Delete Message
// ===============================
router.delete("/:id", protect, adminOnly, deleteContact);

export default router;