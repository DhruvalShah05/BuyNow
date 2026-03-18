import { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders"); // Admin route
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    setOrders(prev =>
      prev.map(order => (order._id === id ? { ...order, status } : order))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-100 text-blue-600";
      case "Shipped":
        return "bg-purple-100 text-purple-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-4 py-3 border-b text-left">Order ID</th>
              <th className="px-4 py-3 border-b text-left">Customer</th>
              <th className="px-4 py-3 border-b text-center">Total</th>
              <th className="px-4 py-3 border-b text-center">Status</th>
              <th className="px-4 py-3 border-b text-center">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">#{order._id.slice(-6)}</td>
                  <td className="px-4 py-3">{order.user?.name || "N/A"}</td>
                  <td className="px-4 py-3 text-center font-medium">₹{order.totalAmount}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-black"
                      disabled={order.status === "Cancelled"} 
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;