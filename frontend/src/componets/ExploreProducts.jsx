import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function ExploreProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
const navigate = useNavigate();
  // ✅ Fetch Products From Backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log("Product fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Responsive items per row
  useEffect(() => {
    const handleResize = () =>
      setItemsPerRow(window.innerWidth >= 1024 ? 4 : 2);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerSlide = itemsPerRow * 2;

  const nextSlide = () => {
    if (currentIndex + itemsPerSlide < products.length)
      setCurrentIndex(currentIndex + itemsPerSlide);
    else setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerSlide >= 0)
      setCurrentIndex(currentIndex - itemsPerSlide);
    else setCurrentIndex(
      Math.max(products.length - itemsPerSlide, 0)
    );
  };

  const handleTouchStart = (e) =>
    (touchStartX.current = e.touches[0].clientX);

  const handleTouchMove = (e) =>
    (touchEndX.current = e.touches[0].clientX);

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-20">No products found</div>;
  }

  return (
    <div className="relative px-4 md:px-12 my-12 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-5 bg-red-500 inline-block"></span>
            Our Products
          </p>
          <h2 className="text-3xl font-bold mt-1">
            Explore Our Products
          </h2>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 shadow rounded-full bg-gray-100"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 shadow rounded-full bg-gray-100"
          >
            →
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (currentIndex / products.length) * 100
            }%)`,
            width: `${
              (products.length / itemsPerSlide) * 100
            }%`,
          }}
        >
          {Array.from({
            length: Math.ceil(products.length / itemsPerSlide),
          }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="grid gap-6 px-2"
              style={{
                gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`,
                width: `${
                  100 /
                  Math.ceil(products.length / itemsPerSlide)
                }%`,
              }}
            >
              {products
                .slice(
                  slideIndex * itemsPerSlide,
                  slideIndex * itemsPerSlide + itemsPerSlide
                )
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      
       <div className="flex justify-center mt-8">
  <button
    onClick={() => navigate("/products")}
    className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition"
  >
    View All Products
  </button>
</div>
      
    </div>
  );
}