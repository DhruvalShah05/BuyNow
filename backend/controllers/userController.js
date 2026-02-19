import User from "../models/User.js";

// ✅ Get My Profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  await user.save();

  res.json(user);
};

// ✅ Admin Get All Users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// ✅ Admin Get Single User
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user)
    return res.status(404).json({ message: "User not found" });

  res.json(user);
};

// ✅ Admin Update User
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user)
    return res.status(404).json({ message: "User not found" });

  user.role = req.body.role || user.role;
  await user.save();

  res.json(user);
};

// ✅ Admin Delete User
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};