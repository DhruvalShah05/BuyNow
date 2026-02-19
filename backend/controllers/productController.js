import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";


// 🔹 CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      ...req.body,
      image: imageUrl
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// 🔹 GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Update text fields
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.oldPrice = req.body.oldPrice || product.oldPrice;
    product.stock = req.body.stock || product.stock;
    product.category = req.body.category || product.category;

    // 🔥 If new image uploaded
    if (req.file) {
      // Optional: delete old image from cloudinary
      // await cloudinary.uploader.destroy(public_id);

      const result = await cloudinary.uploader.upload(req.file.path);
      product.image = result.secure_url;
    }

    await product.save();

    res.status(200).json(product);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// 🔹 DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFlashProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 0 } })
      .sort({ discount: -1 }) // highest discount first
      .limit(5);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ sold: -1 })   // highest sold first
      .limit(4);            // top 4 only

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};