import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import img from "../assets/leftimgLogin.png";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double submit
    setLoading(true);

    try {
      const res = await api.post("/auth/login", formData);

      // 🔥 validate response
      if (!res.data.token || !res.data.user) {
        throw new Error("Invalid response from server");
      }

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(loginSuccess(res.data.user));

      toast.success("Login successful ✅");

      // Role-based redirect
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 py-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 rounded-lg shadow-lg overflow-hidden">
        
        <div className="flex-1 flex justify-center bg-gray-100 p-4">
          <img
            src={img}
            alt="Shopping cart"
            className="max-h-96 w-auto object-contain"
          />
        </div>

        <div className="flex-1 w-full p-6">
          <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter your details below
          </p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:border-red-500 rounded px-3 py-2 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 focus:border-red-500 rounded px-3 py-2 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-3">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;