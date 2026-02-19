import User from "../models/User.js";
import Address from "../models/Address.js";

// Get profile with default address
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const defaultAddress = await Address.findOne({ user: user._id, isDefault: true });

    res.status(200).json({ success: true, data: { ...user.toObject(), defaultAddress } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, profileImage },
      { new: true, runValidators: true }
    ).select("-password");
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Add new address
export const addAddress = async (req, res) => {
  try {
    const { street, city, state, pincode, country, isDefault } = req.body;

    if (isDefault) {
      // Remove default from other addresses
      await Address.updateMany({ user: req.user.id }, { isDefault: false });
    }

    const address = await Address.create({
      user: req.user.id,
      street,
      city,
      state,
      pincode,
      country,
      isDefault,
    });

    res.status(201).json({ success: true, data: address });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Set an existing address as default
export const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findOne({ _id: id, user: req.user.id });
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });

    // Remove default from other addresses
    await Address.updateMany({ user: req.user.id }, { isDefault: false });

    address.isDefault = true;
    await address.save();

    res.status(200).json({ success: true, data: address });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all addresses of user
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.status(200).json({ success: true, data: addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
