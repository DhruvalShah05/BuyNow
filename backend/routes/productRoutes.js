import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getFlashProducts,
  getBestSellingProducts,
  getProductsByCategory
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; 

const router = express.Router();

router.get("/", getProducts);
router.get("/flash", getFlashProducts);
router.get("/best-selling", getBestSellingProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/:id", getSingleProduct);

// 🔥 Support image upload
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateProduct
);
router.delete("/:id", protect, adminOnly, deleteProduct);



export default router;