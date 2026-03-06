import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders/my");

      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Orders fetch error:", err);
      setError("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      if (!window.confirm("Cancel this order?")) return;
      await api.put(`/orders/cancel/${orderId}`);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  const isCancellable = (order) => {
    if (!order || !order.createdAt) return false;

    if (
      order.status === "Delivered" ||
      order.status === "Cancelled" ||
      order.status === "Shipped"
    )
      return false;

    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const diff = now - orderDate;
    const twoDays = 48 * 60 * 60 * 1000;

    return diff <= twoDays;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const handleProductClick = (productId) => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && orders.length === 0 && (
          <p className="text-gray-500">No orders found</p>
        )}

        {!loading &&
          orders.map((order, index) => (
            <div
              key={order?._id || index}
              className="border bg-gray-50 p-6 mb-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">
                  Order ID: #{order?._id?.slice(-6) || "N/A"}
                </span>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusBadge(
                    order?.status
                  )}`}
                >
                  {order?.status || "Processing"}
                </span>
              </div>

              {/* Order Items */}
              {Array.isArray(order?.items) &&
                order.items.map((item, i) => (
                  <div
                    key={item?.product?._id || i}
                    className="flex items-center justify-between border-b py-4"
                  >
                    {/* Clickable Left Section */}
                    <div
                      onClick={() =>
                        handleProductClick(item?.product?._id)
                      }
                      className="flex items-center gap-4 cursor-pointer group"
                    >
                      <img
                        src={
                          item?.product?.image ||
                          item?.product?.images?.[0] ||
                          "https://via.placeholder.com/80"
                        }
                        alt={item?.product?.title || "Product"}
                        className="w-20 h-20 object-cover rounded border group-hover:scale-105 transition"
                      />

                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-red-500 transition">
                          {item?.product?.title || "Product removed"}
                        </h4>

                        <p className="text-sm text-gray-500">
                          Price: ₹{item?.price?.toFixed(2) || "0.00"}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item?.quantity || 0}
                        </p>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="font-semibold text-gray-800">
                      ₹
                      {(
                        (item?.price || 0) *
                        (item?.quantity || 0)
                      ).toFixed(2)}
                    </div>
                  </div>
                ))}

              {/* Total */}
              <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  ₹
                  {order?.totalAmount
                    ? order.totalAmount.toFixed(2)
                    : "0.00"}
                </span>
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => handleCancel(order?._id)}
                disabled={!isCancellable(order)}
                className={`mt-4 px-4 py-2 rounded text-white transition ${
                  isCancellable(order)
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Cancel Order
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Order;