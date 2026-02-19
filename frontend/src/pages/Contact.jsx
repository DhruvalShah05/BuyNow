import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setFormData((prev) => ({
        ...prev,
        name: data.name,
        email: data.email,
      }));
    } catch (error) {
      // Guest user
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contact", formData);
      alert("Message sent successfully ✅");

      setFormData((prev) => ({
        ...prev,
        phone: "",
        message: "",
      }));
    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="bg-gray-100 p-3 rounded w-full"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="bg-gray-100 p-3 rounded w-full"
            />
          </div>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="bg-gray-100 p-3 rounded w-full"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="5"
            required
            className="bg-gray-100 p-3 rounded w-full"
          />

          <div className="text-right">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;