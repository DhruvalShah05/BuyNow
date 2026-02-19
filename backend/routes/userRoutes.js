import express from "express";
import {
  getProfile,
  updateProfile,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// 🔥 IMPORTANT: Profile routes FIRST
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Admin routes
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUser);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;