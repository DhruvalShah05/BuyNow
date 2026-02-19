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
    const { data } = await api.get("/cart");
    setCartItems(data.items || []);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Cart</h2>

        <table className="w-full text-left">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="pb-4">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product._id} className="border-b">
                <td className="py-4 flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt=""
                    className="w-14 h-14 object-contain"
                  />
                  {item.product.title}
                </td>
                <td>₹{item.product.price}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    className="border px-2 py-1 w-16"
                    readOnly
                  />
                </td>
                <td className="text-right">
                  ₹{item.product.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border px-4 py-3 w-full"
            />
            <button className="bg-red-500 text-white px-6">
              Apply Coupon
            </button>
          </div>

          <div className="border p-6">
            <h3 className="font-semibold mb-4">Cart Total</h3>

            <div className="flex justify-between border-b py-2">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between font-semibold py-2">
              <span>Total:</span>
              <span>₹{subtotal}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-red-500 text-white py-3"
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