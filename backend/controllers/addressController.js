import Address from "../models/Address.js";

// ADD ADDRESS
export const addAddress = async (req, res) => {
  try {
    const { street, city, state, pincode, country } = req.body;

    const existing = await Address.find({ user: req.user._id });

    let isDefault = false;
    if (existing.length === 0) isDefault = true;

    const address = await Address.create({
      user: req.user._id,
      street,
      city,
      state,
      pincode,
      country,
      isDefault,
    });

    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ADDRESSES
export const getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(addresses);
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  await Address.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  res.json({ message: "Address deleted" });
};