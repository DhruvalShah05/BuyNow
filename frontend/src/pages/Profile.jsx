import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  // ✅ FETCH ALL DATA INCLUDING MESSAGES
  const fetchAll = async () => {
    try {
      const profile = await api.get("/users/profile");
      const addressData = await api.get("/addresses");
      const orderData = await api.get("/orders/my");
      const messageData = await api.get("/contact/my");

      setUser(profile.data);
      setAddresses(addressData.data);
      setOrders(orderData.data);
      setMessages(messageData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/addresses", newAddress);
    setAddresses((prev) => [...prev, data]);
    setShowAddressForm(false);
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-red-500 text-white flex items-center justify-center text-2xl font-bold rounded-full">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="mt-4 font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          <ul className="space-y-3">
            <li
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer ${
                activeTab === "profile" ? "text-red-500 font-semibold" : ""
              }`}
            >
              My Profile
            </li>

            <li
              onClick={() => setActiveTab("address")}
              className={`cursor-pointer ${
                activeTab === "address" ? "text-red-500 font-semibold" : ""
              }`}
            >
              Address Book
            </li>

            <li
              onClick={() => setActiveTab("orders")}
              className={`cursor-pointer ${
                activeTab === "orders" ? "text-red-500 font-semibold" : ""
              }`}
            >
              My Orders
            </li>

            {/* ✅ NEW MESSAGES TAB */}
            <li
              onClick={() => setActiveTab("messages")}
              className={`cursor-pointer ${
                activeTab === "messages" ? "text-red-500 font-semibold" : ""
              }`}
            >
              My Messages
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-3 space-y-8">

          {/* PROFILE SECTION */}
          {activeTab === "profile" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">
                Account Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="border p-3 rounded"
                  defaultValue={user.name}
                />
                <input
                  className="border p-3 rounded"
                  defaultValue={user.email}
                />
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
              </div>
            </div>
          )}

          {/* ADDRESS SECTION */}
          {activeTab === "address" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">
                Address Book
              </h2>

              {addresses.map((addr) => (
                <div key={addr._id} className="border p-4 rounded-lg mb-4">
                  <p className="font-medium">{addr.street}</p>
                  <p>{addr.city}, {addr.state}</p>
                  <p>{addr.pincode}, {addr.country}</p>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS SECTION */}
          {activeTab === "orders" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">
                My Orders
              </h2>

              {orders.length === 0 ? (
                <p>No orders found</p>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="border p-6 mb-6 rounded-lg">
                    <div className="flex justify-between mb-4">
                      <span>Order ID: {order._id}</span>
                      <span className="bg-green-100 text-green-600 px-3 py-1 text-sm rounded-full">
                        {order.status}
                      </span>
                    </div>

                    {order.items.map((item) => (
                      <div key={item.product._id} className="flex justify-between text-sm mb-2">
                        <span>
                          {item.product.title} × {item.quantity}
                        </span>
                        <span>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ✅ MESSAGES SECTION */}
          {activeTab === "messages" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">
                My Messages
              </h2>

              {messages.length === 0 ? (
                <p>No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg._id} className="border p-6 mb-6 rounded-lg">
                    <p className="font-medium mb-2">
                      Your Message:
                    </p>
                    <p className="mb-4">{msg.message}</p>

                    {msg.adminReply ? (
                      <div className="bg-green-50 p-4 rounded">
                        <p className="text-green-700 font-medium">
                          Admin Reply:
                        </p>
                        <p>{msg.adminReply}</p>
                      </div>
                    ) : (
                      <span className="text-yellow-600 text-sm">
                        Waiting for admin reply...
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;