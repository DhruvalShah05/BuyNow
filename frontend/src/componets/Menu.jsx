import React, { useState, useRef, useEffect } from "react";
import api from "../api/axios";

export default function ScrollSidebar() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(7);
  const [page, setPage] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ FETCH CATEGORIES FROM BACKEND
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  // Responsive visible items
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1024) setVisibleCount(12);
      else if (window.innerWidth >= 768) setVisibleCount(8);
      else if (window.innerWidth >= 500) setVisibleCount(5);
      else setVisibleCount(3);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const totalPages = Math.ceil(categories.length / visibleCount);

  const handleNext = () => {
    const nextPage = Math.min(page + 1, totalPages - 1);
    setPage(nextPage);
    scrollToPage(nextPage);
  };

  const handlePrev = () => {
    const prevPage = Math.max(page - 1, 0);
    setPage(prevPage);
    scrollToPage(prevPage);
  };

  const scrollToPage = (pageNumber) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = pageNumber * container.clientWidth;
      container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleClickCategory = (idx) => {
    setActiveIndex(idx);

    const container = scrollRef.current;
    if (container) {
      const item = container.children[0].children[idx];
      if (item)
        item.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div className="w-full flex items-center h-12">
      {/* Prev Button */}
      <div className="w-10 hidden md:flex items-center justify-center">
        {page > 0 && (
          <button
            onClick={handlePrev}
            className="h-8 w-8 flex items-center justify-center text-lg font-bold text-gray-600 hover:text-indigo-600 border border-gray-300 rounded bg-white shadow-sm"
          >
            ‹
          </button>
        )}
      </div>

      {/* Scrollable Categories */}
      <div
        ref={scrollRef}
        className="flex-1 flex overflow-x-auto scroll-smooth md:overflow-hidden"
      >
        <div className="flex flex-nowrap">
          {categories.map((cat, idx) => (
            <div
              key={cat._id}
              onClick={() => handleClickCategory(idx)}
              className={`flex-shrink-0 h-10 min-w-[100px] px-4 text-sm font-medium flex items-center justify-center whitespace-nowrap cursor-pointer transition ${
                activeIndex === idx
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="w-10 hidden md:flex items-center justify-center">
        {page < totalPages - 1 && (
          <button
            onClick={handleNext}
            className="h-8 w-8 flex items-center justify-center text-lg font-bold text-gray-600 hover:text-indigo-600 border border-gray-300 rounded bg-white shadow-sm"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}