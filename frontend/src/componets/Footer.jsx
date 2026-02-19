import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Footer() {
 const user = useSelector((state) => state.auth.user); 
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-gray-300">
      <div className="w-full px-6 lg:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-16 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start justify-evenly">
          <h1
            className="text-2xl font-bold text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Buy<span className="text-green-500">Now</span>
          </h1>

          <p>Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>

          <div className="flex items-center border border-gray-600 rounded w-full max-w-xs mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-3 py-2 text-sm outline-none w-full text-center md:text-left"
            />
            <button className="px-3 text-white">➤</button>
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col items-center md:items-start justify-evenly">
          <h2 className="text-white text-lg font-semibold mb-3">Support</h2>
          <p className="text-sm">
            1 Bagmane Constellation Business Park Block-12, Bengaluru, Karnataka
            560048
          </p>
          <p className="text-sm">support@buynow.com</p>
          <p className="text-sm">+91 91283 74650</p>
        </div>

        {/* Account */}
            
        <div className="flex flex-col items-center md:items-start justify-evenly">
          <h2 className="text-white text-lg font-semibold mb-3">Account</h2>

          <ul className="space-y-2 text-sm">
            {user ? (
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                My Account
              </li>
            ) : (
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Login / Register
              </li>
            )}

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              Cart
            </li>

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/wishlist")}
            >
              Wishlist
            </li>

            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              Shop
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start justify-evenly">
          <h2 className="text-white text-lg font-semibold mb-3">Quick Link</h2>
          <ul className="space-y-2 text-sm">
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy Policy
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/terms")}
            >
              Terms Of Use
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/faq")}
            >
              FAQ
            </li>
            <li
              className="hover:text-white cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div className="flex flex-col items-center md:items-start justify-evenly">
          <h2 className="text-white text-lg font-semibold mb-3">Download App</h2>
          <p className="text-xs mb-3 text-gray-400">
            Save $3 with App New User Only
          </p>

          <div className="flex gap-4 justify-center md:justify-start mb-4">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=buynow"
              alt="QR"
              className="w-20 h-20"
            />
            <div className="flex flex-col gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                className="w-28"
                alt="Google Play"
              />
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                className="w-28"
                alt="App Store"
              />
            </div>
          </div>

          <div className="flex gap-5 text-lg justify-center md:justify-start">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © Copyright BuyNow 2026. All rights reserved
      </div>
    </footer> 
  );
}

export default Footer;
