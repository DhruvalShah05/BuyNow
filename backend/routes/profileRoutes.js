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

router.get("/", getProfile); 
router.put("/", updateProfile); 
router.get("/addresses", getAddresses); 
router.post("/addresses", addAddress); 
router.put("/addresses/:id/default", setDefaultAddress); 

export default router;
