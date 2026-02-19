import express from "express";
import {
  getProfile,
  updateProfile,
  addAddress,
  setDefaultAddress,
  getAddresses,
} from "../controllers/profileController.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(verifyUser);

router.get("/", getProfile); // Get user profile
router.put("/", updateProfile); // Update user profile
router.get("/addresses", getAddresses); // Get all addresses
router.post("/addresses", addAddress); // Add new address
router.put("/addresses/:id/default", setDefaultAddress); // Set default address

export default router;
