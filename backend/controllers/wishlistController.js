import Wishlist from "../models/Wishlist.js";

// ✅ Get Wishlist
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    }).populate("products");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    res.json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add to Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.json({ message: "Added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove from Wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
    });

    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== req.params.id
    );

    await wishlist.save();

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};