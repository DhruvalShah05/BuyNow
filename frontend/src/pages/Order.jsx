import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/my");
      setOrders(data);
    } catch (error) {
      console.error("Orders fetch error:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border p-6 mb-6 rounded"
            >
              <div className="flex justify-between mb-4">
                <span className="font-medium">
                  Order ID: {order._id}
                </span>
                <span className="text-green-600 font-medium">
                  {order.status}
                </span>
              </div>

              {order.items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.product.title} × {item.quantity}
                  </span>
                  <span>
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;