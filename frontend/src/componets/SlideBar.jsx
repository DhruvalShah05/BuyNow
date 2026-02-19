import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const bannerData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    alt: "Smartphones",
    offer: "50% OFF",
    subtitle: "Latest Smartphones"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    alt: "Laptops",
    offer: "40% OFF",
    subtitle: "Top Brand Laptops"
  },
  {
    id: 3,
    image: "https://static.digit.in/default/best-mobile-gaming-accessories-under-2k-5f695b1b7c.jpeg",
    alt: "Gaming",
    offer: "60% OFF",
    subtitle: "Gaming Accessories"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    alt: "MacBook",
    offer: "35% OFF",
    subtitle: "Premium Laptops"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    alt: "Headphones",
    offer: "30% OFF",
    subtitle: "Audio Devices"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd",
    alt: "Smart Watch",
    offer: "45% OFF",
    subtitle: "Smart Wearables"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505",
    alt: "Television",
    offer: "55% OFF",
    subtitle: "4K Smart TVs"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb",
    alt: "Computer Accessories",
    offer: "25% OFF",
    subtitle: "PC Accessories"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    alt: "Camera",
    offer: "50% OFF",
    subtitle: "DSLR & Cameras"
  },
  {
    id: 10,
    image: "https://www.thevaluestore.in/image/cache/catalog/2024/Portronics/Speaker/pixel-3-1-1000x1000.jpg",
    alt: "Speakers",
    offer: "35% OFF",
    subtitle: "Bluetooth Speakers"
  }
];


const responsive = {
  0: { items: 1 },
  600: { items: 2 },
  1024: { items: 3 },
};

export default function SlideBar() {
  const items = bannerData.map(({ id, image, alt, offer, subtitle }) => (
    <div key={id} className="px-3">
      <div className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer">

        {/* Image */}
        <img
          src={image}
          alt={alt}
          className="w-full h-[260px] object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* 🔥 Offer Badge (Top Left) */}
        <div className="absolute top-3 left-3 bg-red-600 text-white px-4 py-1 rounded-md font-bold text-sm shadow-md">
          {offer}
        </div>

        {/* Subtitle (Center Left) */}
        <div className="absolute left-5 bottom-14 text-white">
          <h2 className="text-2xl font-bold">{subtitle}</h2>
        </div>

        {/* 🛒 Shop Now Button (Bottom Left) */}
        <div className="absolute bottom-4 left-5">
          <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
            Shop Now
          </button>
        </div>

      </div>
    </div>
  ));

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      autoPlay
      autoPlayInterval={3000}
      infinite
      disableButtonsControls
      disableDotsControls={false}
      animationType="slide"
    />
  );
}
