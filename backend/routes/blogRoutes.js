import express from "express";
import {
  getBlogs,
  getSingleBlog,
  createBlog,
} from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getSingleBlog);
router.post("/", protect, adminOnly, createBlog);

export default router;