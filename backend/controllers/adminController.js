import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ✅ ADMIN DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email");

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};