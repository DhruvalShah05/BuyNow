import React from "react";
import Menu from "../componets/Menu";
import SlideBar from "../componets/SlideBar";
import JBLspeaker from "../assets/JBLspeaker.png";
import FlashSales from "../componets/FlashSales";
import Categories from "../componets/Categories";
import BestProducts from "../componets/BestProducts";
import { FiTruck, FiHeadphones, FiCheckCircle } from "react-icons/fi";
import ExploreProducts from "../componets/ExploreProducts";
import speaker from "../assets/speaker.png"
import ps5 from "../assets/ps5.png"

export default function Home() {
  return (
    <div className="w-full bg-white">

      {/* Slide menu */}
      <div className="border-b border-gray-300">
        <Menu />
      </div>

      {/* Main slider */}
      <div className="m-4 px-4 md:px-12">
        <SlideBar />
      </div>

      {/* Flash Sales */}
      <div className="px-4 md:px-12">
        <FlashSales />
      </div>

      {/* Categories */}
      <div className="px-4 md:px-12">
        <Categories />
      </div>

      {/* Best Products */}
      <div className="px-4 md:px-12">
        <BestProducts />
      </div>

      {/* Promo Section */}
      <div className="px-6 md:px-12 my-12 mx-6">
        <div className="bg-black text-white rounded-xl border-4 border-gray-800 p-6 md:p-10 
                  flex flex-col md:flex-row items-center justify-between 
                  gap-10 shadow-lg">

          {/* Left content */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 text-center md:text-left">
            <span className="text-green-500 text-sm font-semibold uppercase">
              Categories
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
              Enhance Your <br className="hidden sm:block" />
              Music Experience
            </h1>

            {/* Timer */}
            <div className="flex gap-3 justify-center md:justify-start text-black mt-2 flex-wrap">
              {[
                { label: "Hours", value: 23 },
                { label: "Days", value: 5 },
                { label: "Minutes", value: 59 },
                { label: "Seconds", value: 35 },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white rounded-full w-16 h-16 sm:w-14 sm:h-14
                       flex flex-col items-center justify-center font-semibold"
                >
                  <span className="text-lg">{String(value).padStart(2, "0")}</span>
                  <span className="text-[10px]">{label}</span>
                </div>
              ))}
            </div>

            {/* Buy Button */}
            <button className="bg-green-500 hover:bg-green-600 transition
                         text-black font-semibold px-6 py-3 rounded
                         w-max mx-auto md:mx-0">
              Buy Now!
            </button>
          </div>

          {/* Right image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={JBLspeaker}
              alt="JBL Speaker"
              className="w-60 sm:w-72 md:w-80 lg:w-96 object-contain"
            />
          </div>

        </div>
      </div>


      {/* Explore Products */}
      <div className="px-4 md:px-12">
        <ExploreProducts />
      </div>

      {/* New Arrival Section - ALL ELECTRONICS */}
      <div className="px-4 md:px-12 my-12 max-w-7xl mx-auto">
        <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
          <span className="w-2 h-5 bg-red-500 inline-block"></span>
          Featured
        </p>

        <h2 className="text-2xl md:text-4xl font-bold mb-8">New Arrival</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Large Left Card: PlayStation 5 */}
          <div className="relative rounded-lg overflow-hidden cursor-pointer bg-black min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <img
              src={ps5}
              alt="PlayStation 5"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 text-white max-w-md z-10">
              <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
              <p className="text-sm text-gray-200 mb-4">
                Black and White version of the PS5 coming out on sale.
              </p>
              <button className="text-sm font-semibold underline hover:text-gray-300 transition">
                Shop Now
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">

            {/* Top Right Card: Smart Watch Collection */}
            <div className="relative rounded-lg overflow-hidden cursor-pointer bg-black h-[240px]">
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
              <img
                src="https://iflwatches.com/cdn/shop/articles/blog-pic-thumbnail-2-1677765838082_11c0e709-6b44-41df-91fe-db2c5ba94139.jpg?v=1714386375"
                alt="Smart Watch Collection"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 text-white max-w-sm z-10">
                <h3 className="text-xl font-bold mb-2">Smart Watch Collection</h3>
                <p className="text-xs text-gray-200 mb-3">
                  Featured smartwatch collections that give you another vibe.
                </p>
                <button className="text-sm font-semibold underline hover:text-gray-300 transition">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Bottom Right: Two small cards */}
            <div className="grid grid-cols-2 gap-6">

              {/* Speakers Card */}
              <div className="relative rounded-lg overflow-hidden cursor-pointer bg-black h-[240px]">
                <div className="absolute inset-0 bg-black/40"></div>
                <img
                  src={speaker}
                  alt="Bluetooth Speakers"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h4 className="text-lg font-bold mb-1">Speakers</h4>
                  <p className="text-xs text-gray-200 mb-2">Amazon wireless speakers</p>
                  <button className="text-xs font-semibold underline hover:text-gray-300 transition">
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Gaming Keyboard Card */}
              <div className="relative rounded-lg overflow-hidden cursor-pointer bg-black h-[240px]">
                <div className="absolute inset-0 bg-black/40"></div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4FO6s3v0PqPFzOqwBDD3YnoA24Vg8YM2IqA&s"
                  alt="Gaming Keyboard"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h4 className="text-lg font-bold mb-1">Gaming Keyboard</h4>
                  <p className="text-xs text-gray-200 mb-2">Mechanical RGB backlit</p>
                  <button className="text-xs font-semibold underline hover:text-gray-300 transition">
                    Shop Now
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Info Cards Section */}
      <div className="px-4 md:px-12 my-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              icon: <FiTruck className="text-2xl  text-white" />,
              title: "FREE AND FAST DELIVERY",
              desc: "Free delivery for all orders over $1000",
            },
            {
              icon: <FiHeadphones className="text-2xl  text-white" />,
              title: "24/7 CUSTOMER SERVICE",
              desc: "Friendly 24/7 customer support",
            },
            {
              icon: <FiCheckCircle className="text-2xl text-white" />,
              title: "MONEY BACK GUARANTEE",
              desc: "We return money within 30 days",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black ">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}