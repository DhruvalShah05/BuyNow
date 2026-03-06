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

  /* ============================
     ✅ PROFILE PHOTO UPLOAD LOGIC
  ============================= */
  const handleProfileUpload = async (file) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const { data } = await api.put(
      "/users/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // override JSON
        },
      }
    );

    setUser(data);
    alert("Profile photo updated successfully");
  } catch (err) {
    console.error(err);
    alert("Profile photo update failed");
  }
};

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-center mb-6">

            {/* Profile Image OR First Letter */}
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full object-cover border"
              />
            ) : (
              <div className="w-24 h-24 mx-auto bg-red-500 text-white flex items-center justify-center text-3xl font-bold rounded-full">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleProfileUpload(file);
                }
              }}
            />

            {/* Change Photo Button */}
            <label
              htmlFor="profileUpload"
              className="block mt-3 text-sm text-red-500 cursor-pointer hover:underline"
            >
              Change Profile Photo
            </label>

            <h3 className="mt-4 font-semibold text-lg">
              {user?.name}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.email}
            </p>
          </div>

          <ul className="space-y-3">
            <li
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer ${activeTab === "profile" ? "text-red-500 font-semibold" : ""
                }`}
            >
              My Profile
            </li>

            <li
              onClick={() => setActiveTab("address")}
              className={`cursor-pointer ${activeTab === "address" ? "text-red-500 font-semibold" : ""
                }`}
            >
              Address Book
            </li>

            <li
              onClick={() => setActiveTab("orders")}
              className={`cursor-pointer ${activeTab === "orders" ? "text-red-500 font-semibold" : ""
                }`}
            >
              My Orders
            </li>

            <li
              onClick={() => setActiveTab("messages")}
              className={`cursor-pointer ${activeTab === "messages" ? "text-red-500 font-semibold" : ""
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
              <h2 className="text-xl font-semibold mb-6">My Orders</h2>

              {!Array.isArray(orders) || orders.length === 0 ? (
                <p className="text-gray-500">No orders found</p>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={order?._id || index}
                    className="border bg-gray-50 p-6 mb-6 rounded-lg hover:shadow-md transition"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">
                        Order ID: #{order?._id?.slice(-6) || "N/A"}
                      </span>

                      <span
                        className={`px-3 py-1 text-sm rounded-full font-medium ${order?.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order?.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : order?.status === "Shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {order?.status || "Processing"}
                      </span>
                    </div>

                    {/* Items */}
                    {Array.isArray(order?.items) &&
                      order.items.map((item, i) => (
                        <div
                          key={item?.product?._id || i}
                          className="flex items-center justify-between border-b py-4"
                        >
                          {/* Left Section (Clickable) */}
                          <div
                            onClick={() =>
                              item?.product?._id &&
                              navigate(`/product/${item.product._id}`)
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
                    <div className="flex justify-between mt-4 pt-4 border-t font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        ₹
                        {order?.totalAmount
                          ? order.totalAmount.toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* MESSAGES SECTION */}
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
                    <p className="font-medium mb-2">Your Message:</p>
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