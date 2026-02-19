import React, { useState, useEffect, useRef } from "react";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate("/");
  };

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      {/* ===== Mobile Navbar ===== */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        <Bars3Icon
          className="w-7 h-7 cursor-pointer"
          onClick={() => setMenuOpen(true)}
        />

        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Buy<span className="text-green-500">Now</span>
        </h1>

        <ShoppingCartIcon
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate("/cart")}
        />
      </div>

      {/* ===== Mobile Side Menu ===== */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="bg-white w-64 h-full p-5">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <XMarkIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            </div>

            <ul className="flex flex-col gap-4 font-medium">
              <li onClick={() => navigate("/")} className="cursor-pointer">Home</li>
              <li onClick={() => navigate("/about")} className="cursor-pointer">About</li>
              <li onClick={() => navigate("/contact")} className="cursor-pointer">Contact</li>
              <li onClick={() => navigate("/blog")} className="cursor-pointer">Blog</li>
              <li onClick={() => navigate("/wishlist")} className="cursor-pointer">Wishlist</li>
              <li onClick={() => navigate("/cart")} className="cursor-pointer">Cart</li>

              {user ? (
                <>
                  <li onClick={() => navigate("/profile")}>Profile</li>
                  <li onClick={handleLogout} className="text-red-500">Logout</li>
                </>
              ) : (
                <li onClick={() => navigate("/signin")}>Login</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* ===== Desktop Navbar ===== */}
      <div className="hidden md:flex items-center justify-between w-full px-6 py-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Buy<span className="text-green-500">Now</span>
        </h1>

        <ul className="flex gap-8 font-medium text-gray-700">
          <li onClick={() => navigate("/")} className="cursor-pointer hover:text-black">Home</li>
          <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-black">About</li>
          <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-black">Contact</li>
          <li onClick={() => navigate("/blog")} className="cursor-pointer hover:text-black">Blog</li>
        </ul>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-sm w-48"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-600" />
          </div>

          <HeartIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate("/wishlist")} />
          <ShoppingCartIcon className="w-6 h-6 cursor-pointer" onClick={() => navigate("/cart")} />

          {user ? (
            <div className="relative" ref={userMenuRef}>
              <UserIcon
                className="w-6 h-6 cursor-pointer"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              />
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-3">
                  <ul className="flex flex-col gap-3 px-4 text-sm">
                    <li onClick={() => navigate("/profile")}>Profile</li>
                    <li onClick={() => navigate("/orders")}>Orders</li>
                    <li onClick={handleLogout} className="text-red-500">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate("/signin")}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
