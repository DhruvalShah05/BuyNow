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

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const { data } = await api.put(`/orders/cancel/${orderId}`);
      alert(data.message);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel order");
    }
  };

  // Check if order is cancellable
  const isCancellable = (order) => {
    if (order.status === "Delivered" || order.status === "Cancelled") return false;

    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const diff = now - orderDate; // difference in ms
    const oneDayMs = 48 * 60 * 60 * 1000; // 2 day in ms

    return diff <= oneDayMs;
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="border p-6 mb-6 rounded">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Order ID: {order._id}</span>
                <span
                  className={`font-medium ${
                    order.status === "Cancelled"
                      ? "text-gray-500"
                      : order.status === "Delivered"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
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
                  <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.totalAmount?.toFixed(2)}</span>
              </div>

              {/* Cancel button */}
              {isCancellable(order) && (
                <button
                  onClick={() => handleCancel(order._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;