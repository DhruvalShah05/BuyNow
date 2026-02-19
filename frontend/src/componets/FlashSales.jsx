import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";

export default function FlashSales() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

 
  useEffect(() => {
    const fetchFlashProducts = async () => {
      try {
        const { data } = await api.get("/products/flash");
        setProducts(data);
      } catch (error) {
        console.error("Flash fetch error:", error);
      }
    };

    fetchFlashProducts();
  }, []);

  // 🔥 Timer (3 Days)
  const targetDate = useRef(
    new Date().getTime() + 3 * 24 * 60 * 60 * 1000
  );

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const diff = targetDate.current - now;

    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  // 🔥 Responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else setItemsPerView(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (products.length <= itemsPerView) return;

    if (currentIndex < products.length - itemsPerView)
      setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (products.length <= itemsPerView) return;

    if (currentIndex > 0)
      setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(products.length - itemsPerView);
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

  return (
    <div className="relative px-4 md:px-12 my-12 overflow-hidden">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-5 bg-red-500 inline-block"></span>
            Today’s
          </p>
          <h2 className="text-3xl font-bold mt-1">Flash Sales</h2>
        </div>

        {/* Timer */}
        <div className="flex gap-4 text-center text-gray-600 text-sm">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit}>
              <p className="capitalize">{unit}</p>
              <h3 className="text-xl font-bold">
                {String(timeLeft[unit]).padStart(2, "0")}
              </h3>
            </div>
          ))}
        </div>

        {/* Arrows */}
        {products.length > itemsPerView && (
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
        )}
      </div>

      {/* Slider */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${
              (currentIndex * 100) / itemsPerView
            }%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* View All */}
      <div className="flex justify-center mt-8">
        <button className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition">
          View All Products
        </button>
      </div>
    </div>
  );
}