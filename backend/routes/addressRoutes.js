import express from "express";
import {
  addAddress,
  getAddresses,
  deleteAddress,
} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addAddress);
router.get("/", protect, getAddresses);
router.delete("/:id", protect, deleteAddress);

export default router;