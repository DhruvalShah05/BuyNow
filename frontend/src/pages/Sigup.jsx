import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import img from "../assets/signup.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= NORMAL SIGNUP =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Account created successfully 🎉");
      navigate("/signin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // ================= GOOGLE SIGNUP =================
 // ================= GOOGLE SIGNUP =================
const googleSignup = useGoogleLogin({
  flow: "implicit", // IMPORTANT
  onSuccess: async (tokenResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        {
          idToken: tokenResponse.id_token, // ✅ FIXED
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(loginSuccess(res.data.user));
      toast.success("Google signup successful 🎉");

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Google signup failed");
    }
  },
  onError: () => toast.error("Google signup failed"),
});


  return (
    <div className="flex items-center justify-center bg-white px-4 py-4">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 rounded-lg shadow-lg overflow-hidden">
        
        {/* Left image */}
        <div className="flex-1 flex justify-center bg-gray-100 p-4">
          <img
            src={img}
            alt="Signup Illustration"
            className="max-h-80 md:max-h-96 w-auto object-contain"
          />
        </div>

        {/* Right form */}
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
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded"
            >
              Create Account
            </button>

            {/* GOOGLE SIGNUP BUTTON */}
            {/* <button
              type="button"
              onClick={() => googleSignup()}
              className="w-full border py-2 rounded flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-red-600" />
              Sign up with Google
            </button> */}
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
