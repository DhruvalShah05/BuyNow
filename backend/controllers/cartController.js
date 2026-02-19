import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// ✅ ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });
    } else {
      const item = cart.items.find(
        (i) => i.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;

    await cart.save();

    res.json({ message: "Quantity updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};