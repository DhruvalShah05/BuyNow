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

  const [newMessage, setNewMessage] = useState("");

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

  /* PROFILE PHOTO UPLOAD */
  const handleProfileUpload = async (file) => {
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const { data } = await api.put("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(data);
      alert("Profile photo updated successfully");
    } catch (err) {
      console.error(err);
      alert("Profile photo update failed");
    }
  };

  /* ADD ADDRESS */
  const handleAddAddress = async () => {
    try {
      await api.post("/addresses", newAddress);
      setNewAddress({ street: "", city: "", state: "", pincode: "", country: "" });
      setShowAddressForm(false);
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  };

  /* SEND MESSAGE */
  const handleSendMessage = async () => {
    if (!newMessage) return;
    try {
      await api.post("/contact", {
        name: user.name,
        email: user.email,
        phone: "",
        message: newMessage,
      });
      setNewMessage("");
      fetchAll();
    } catch (error) {
      console.log(error);
    }
  };

  /* CANCEL ORDER */
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.put(`/orders/cancel/${orderId}`);
      fetchAll();
      alert("Order cancelled successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to cancel order");
    }
  };

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-center mb-6">
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

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleProfileUpload(e.target.files[0])}
            />

            <label
              htmlFor="profileUpload"
              className="block mt-3 text-sm text-red-500 cursor-pointer hover:underline"
            >
              Change Profile Photo
            </label>

            <h3 className="mt-4 font-semibold text-lg">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <ul className="space-y-3">
            <li
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer ${activeTab === "profile" ? "text-red-500 font-semibold" : ""}`}
            >
              My Profile
            </li>
            <li
              onClick={() => setActiveTab("address")}
              className={`cursor-pointer ${activeTab === "address" ? "text-red-500 font-semibold" : ""}`}
            >
              Address Book
            </li>
            <li
              onClick={() => setActiveTab("orders")}
              className={`cursor-pointer ${activeTab === "orders" ? "text-red-500 font-semibold" : ""}`}
            >
              My Orders
            </li>
            <li
              onClick={() => setActiveTab("messages")}
              className={`cursor-pointer ${activeTab === "messages" ? "text-red-500 font-semibold" : ""}`}
            >
              My Messages
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-3 space-y-8">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Account Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input className="border p-3 rounded" defaultValue={user.name} />
                <input className="border p-3 rounded" defaultValue={user.email} />
              </div>
              <div className="mt-6 text-sm text-gray-500">
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
              </div>
            </div>
          )}

          {/* ADDRESS */}
          {activeTab === "address" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Address Book</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="bg-red-500 text-white px-4 py-2 rounded mb-6"
              >
                Add Address
              </button>

              {showAddressForm && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <input placeholder="Street" className="border p-3 rounded"
                    value={newAddress.street} onChange={(e)=>setNewAddress({...newAddress,street:e.target.value})} />
                  <input placeholder="City" className="border p-3 rounded"
                    value={newAddress.city} onChange={(e)=>setNewAddress({...newAddress,city:e.target.value})} />
                  <input placeholder="State" className="border p-3 rounded"
                    value={newAddress.state} onChange={(e)=>setNewAddress({...newAddress,state:e.target.value})} />
                  <input placeholder="Pincode" className="border p-3 rounded"
                    value={newAddress.pincode} onChange={(e)=>setNewAddress({...newAddress,pincode:e.target.value})} />
                  <input placeholder="Country" className="border p-3 rounded"
                    value={newAddress.country} onChange={(e)=>setNewAddress({...newAddress,country:e.target.value})} />
                  <button onClick={handleAddAddress} className="bg-green-500 text-white px-4 py-2 rounded">
                    Save Address
                  </button>
                </div>
              )}

              {addresses.map((addr) => (
                <div key={addr._id} className="border p-4 rounded-lg mb-4">
                  <p className="font-medium">{addr.street}</p>
                  <p>{addr.city}, {addr.state}</p>
                  <p>{addr.pincode}, {addr.country}</p>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS */}
          {activeTab === "orders" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">My Orders</h2>

              {orders.length === 0 ? <p>No orders found</p> : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order._id} className="border p-4 rounded-lg">
                      <div className="flex justify-between mb-4">
                        <span className="font-semibold">Order ID: #{order._id.slice(-6)}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Processing" ? "bg-blue-100 text-blue-600" :
                          order.status === "Shipped" ? "bg-purple-100 text-purple-600" :
                          order.status === "Delivered" ? "bg-green-100 text-green-600" :
                          order.status === "Cancelled" ? "bg-red-100 text-red-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>{order.status}</span>
                      </div>

                      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                      <p><strong>Payment:</strong> {order.paymentStatus}</p>

                      <div className="mt-3">
                        <p className="font-semibold mb-1">Items:</p>
                        {order.items.map(item => (
                          <div key={item.product._id} className="flex justify-between text-sm mb-1">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 text-sm">
                        <p className="font-semibold mb-1">Shipping Address:</p>
                        <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                        <p>{order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>

                      {order.status === "Processing" && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === "messages" && (
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">My Messages</h2>
              <textarea
                rows="4"
                placeholder="Write your message..."
                value={newMessage}
                onChange={(e)=>setNewMessage(e.target.value)}
                className="w-full border p-3 rounded"
              />
              <button onClick={handleSendMessage} className="mt-3 bg-red-500 text-white px-4 py-2 rounded">
                Send Message
              </button>

              {messages.length === 0 ? <p className="mt-4">No messages yet</p> :
                messages.map((msg)=>(
                  <div key={msg._id} className="border p-6 mt-6 rounded-lg">
                    <p className="font-medium mb-2">Your Message:</p>
                    <p className="mb-4">{msg.message}</p>
                    {msg.adminReply ? (
                      <div className="bg-green-50 p-4 rounded">
                        <p className="text-green-700 font-medium">Admin Reply:</p>
                        <p>{msg.adminReply}</p>
                      </div>
                    ) : (
                      <span className="text-yellow-600 text-sm">Waiting for admin reply...</span>
                    )}
                  </div>
                ))
              }
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;