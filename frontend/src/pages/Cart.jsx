import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

        {/* Cart Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-sm">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3 text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 flex items-center gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium text-gray-700">{item.product.title}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">₹{item.product.price}</td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={item.quantity}
                      className="border px-2 py-1 w-16 rounded text-center"
                      readOnly
                    />
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-800">
                    ₹{item.product.price * item.quantity}
                  </td>
                </tr>
              ))}

              {cartItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    Your cart is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between mt-10 gap-6">
          {/* Coupon Section */}
          <div className="flex gap-3 flex-1 h-1/2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border border-gray-300 px-4 py-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded transition">
              Apply
            </button>
          </div>

          {/* Cart Summary */}
          <div className="border p-6 rounded-lg shadow-md w-full md:w-80 bg-gray-50">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h3>
            <div className="flex justify-between py-2 text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-700">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-2 font-semibold text-gray-900 border-t mt-2 pt-2">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;