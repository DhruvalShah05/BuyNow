import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from "../assets/signup.png";

function Signup() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // Handle main inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value));

      // Also re-validate confirm password
      if (confirmPassword && value !== confirmPassword) {
        setConfirmError("Passwords do not match");
      } else {
        setConfirmError("");
      }
    }
  };

  // Handle confirm password input
  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== formData.password) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    if (hasUpper && hasNumber && hasSpecial) return "Strong";
    if (hasUpper || hasNumber) return "Medium";
    return "Weak";
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Account created successfully 🎉");
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white px-4 py-4 min-h-screen">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 rounded-lg shadow-lg overflow-hidden">

        {/* Left Image */}
        <div className="flex-1 flex justify-center bg-gray-100 p-4">
          <img
            src={img}
            alt="Signup Illustration"
            className="max-h-80 md:max-h-96 w-auto object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="flex-1 w-full p-6">
          <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
          <p className="text-sm text-gray-600 mb-4">Enter your details below</p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-black"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Password Strength */}
            {showPassword && formData.password && (
              <p
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {passwordStrength} Password
              </p>
            )}

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-black"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm password error */}
            {confirmPassword && confirmError && (
              <p className="text-sm text-red-500 mt-1">{confirmError}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={confirmError !== ""}
              className="w-full bg-red-600 text-white py-2 rounded disabled:opacity-50"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <Link to="/signin" className="text-red-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;