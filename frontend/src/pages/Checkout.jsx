import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showForm, setShowForm] = useState(false);

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data } = await api.get("/addresses");
      setAddresses(data);

      if (data.length > 0) {
        const defaultAddr = data.find((a) => a.isDefault);
        setSelectedAddress(defaultAddr?._id || data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/addresses", newAddress);
      setAddresses((prev) => [...prev, data]);
      setSelectedAddress(data._id);
      setShowForm(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
    } catch (error) {
      alert("Failed to add address");
    }
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Select address");

    try {
      await api.post("/orders", {
        addressId: selectedAddress,
        paymentMethod,
      });

      alert("Order placed successfully ✅");
      navigate("/profile");
    } catch (error) {
      alert("Order failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="bg-white p-8 rounded shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => setSelectedAddress(addr._id)}
              className={`border p-4 mb-4 cursor-pointer ${
                selectedAddress === addr._id
                  ? "border-red-500 bg-red-50"
                  : "hover:border-gray-400"
              }`}
            >
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state}</p>
              <p>{addr.pincode}, {addr.country}</p>
              {addr.isDefault && (
                <span className="text-green-600 text-sm">
                  Default Address
                </span>
              )}
            </div>
          ))}

          <button
            onClick={() => setShowForm(!showForm)}
            className="text-red-500 mt-4"
          >
            + Add Address
          </button>

          {showForm && (
            <form onSubmit={handleAddAddress} className="mt-4 space-y-3">
              <input className="w-full border p-2" placeholder="Street"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                } required />
              <input className="w-full border p-2" placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                } required />
              <input className="w-full border p-2" placeholder="State"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                } required />
              <input className="w-full border p-2" placeholder="Pincode"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                } required />
              <input className="w-full border p-2" placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                } required />

              <button className="bg-red-500 text-white px-4 py-2">
                Save Address
              </button>
            </form>
          )}

          <div className="mt-6">
            <h3 className="font-semibold">Payment Method</h3>
            <label className="block">
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              /> COD
            </label>
            <label>
              <input
                type="radio"
                checked={paymentMethod === "CARD"}
                onChange={() => setPaymentMethod("CARD")}
              /> Card (Simulated)
            </label>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-8 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Your Order</h2>

          {cart.map((item) => (
            <div key={item.product._id} className="flex justify-between mb-2">
              <span>{item.product.title} × {item.quantity}</span>
              <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-red-500 text-white py-3"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;