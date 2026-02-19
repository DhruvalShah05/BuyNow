import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import api from "../api/axios";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // ✅ Check if product already in wishlist
  useEffect(() => {
    checkWishlist();
  }, []);

  const checkWishlist = async () => {
    try {
      const { data } = await api.get("/wishlist");
      const exists = data.find((item) => item._id === product._id);
      setIsWishlisted(!!exists);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Toggle Wishlist
  const handleWishlist = async (e) => {
    e.stopPropagation(); // prevent card click

    try {
      if (isWishlisted) {
        await api.delete(`/wishlist/${product._id}`);
        setIsWishlisted(false);
      } else {
        await api.post("/wishlist", { productId: product._id });
        setIsWishlisted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Add To Cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: 1,
      });

      alert("Added to cart ✅");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer relative"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
          -{product.discount}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-lg z-10"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-600" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-600" />
        )}
      </button>

      {/* Image */}
      <div className="bg-gray-100 h-52 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-red-600 font-bold text-lg">
            ₹{product.price}
          </span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) =>
            i < product.rating ? (
              <FaStar key={i} />
            ) : (
              <FaRegStar key={i} />
            )
          )}
        </div>
      </div>

      {/* Add To Cart */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-sm
        translate-y-full group-hover:translate-y-0
        transition-all duration-300"
      >
        Add To Cart
      </button>
    </div>
  );
}