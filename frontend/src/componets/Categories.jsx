import React, { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import {
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaGamepad,
  FaHeadphones,
  FaClock,
  FaCamera,
  FaTv,
  FaVolumeUp,
  FaBatteryFull,
  FaKeyboard,
  FaWifi,
  FaRunning,
  FaHome,
  FaHdd,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const [active, setActive] = useState(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories");
    }
  };

  // Icon mapping
  const categoryIcons = {
    Smartphones: <FaMobileAlt />,
    Laptops: <FaLaptop />,
    Tablets: <FaTabletAlt />,
    "Gaming Consoles": <FaGamepad />,
    Headphones: <FaHeadphones />,
    "Smart Watches": <FaClock />,
    Cameras: <FaCamera />,
    Televisions: <FaTv />,
    Speakers: <FaVolumeUp />,
    "Power Banks": <FaBatteryFull />,
    "Computer Accessories": <FaKeyboard />,
    "Networking Devices": <FaWifi />,
    "Wearable Tech": <FaRunning />,
    "Smart Home Devices": <FaHome />,
    "Storage Devices": <FaHdd />,
  };

  // Responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(6);
      else setItemsPerView(2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < categories.length - itemsPerView)
      setCurrentIndex(currentIndex + 1);
    else setCurrentIndex(0);
  };

  const prevSlide = () => {
    if (currentIndex > 0)
      setCurrentIndex(currentIndex - 1);
    else setCurrentIndex(categories.length - itemsPerView);
  };

  return (
    <div className="bg-gray-50 py-6 px-4 md:px-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-red-500 text-sm font-semibold">Categories</p>
          <h2 className="text-2xl font-bold mt-1">
            Browse By Category
          </h2>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-white shadow flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition"
          >
            <FaArrowLeft size={14} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-white shadow flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition"
          >
            <FaArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => setActive(cat.name)}
              className={`flex flex-col items-center justify-center
                border rounded-xl cursor-pointer flex-shrink-0
                h-32 p-4 transition-all
                ${
                  active === cat.name
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-red-50"
                }
              `}
              style={{
                width: `${100 / itemsPerView}%`,
              }}
            >
              <div className="text-3xl mb-2">
                {categoryIcons[cat.name] || <FaMobileAlt />}
              </div>
              <p className="text-sm text-center">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}