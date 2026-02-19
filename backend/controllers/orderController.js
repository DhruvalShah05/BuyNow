import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";


// ======================================
// CREATE ORDER (USER)
// ======================================
export const createOrder = async (req, res) => {
  try {
    const { addressId, paymentMethod = "COD" } = req.body;

    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    const totalAmount = cart.items.reduce(
      (acc, item) =>
        acc + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
      shippingAddress: address._id,
      paymentMethod,
      paymentStatus:
        paymentMethod === "CARD" ? "Paid" : "Pending",
      status: "pending",
    });

    // 🔄 Update stock & sold count
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            stock: -item.quantity,
            sold: item.quantity,
          },
        }
      );
    }

    // 🗑 Clear cart
    await Cart.findOneAndDelete({
      user: req.user._id,
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ======================================
// GET MY ORDERS (USER)
// ======================================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("items.product")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ======================================
// GET ALL ORDERS (ADMIN)
// ======================================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ======================================
// UPDATE ORDER STATUS (ADMIN)
// ======================================
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found" });
    }

    order.status = status;

    // Optional: auto update payment
    if (status === "delivered") {
      order.paymentStatus = "Paid";
    }

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};