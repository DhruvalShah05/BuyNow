// About.jsx
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import TeamCard from "../componets/TeamCard"; 
import { FiTruck, FiHeadphones, FiCheckCircle } from "react-icons/fi";

const team = [
  { id: 1, name: "Tom Cruise", role: "Founder & Chairman", img: "https://randomuser.me/api/portraits/men/32.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 2, name: "Emma Watson", role: "Managing Director", img: "https://randomuser.me/api/portraits/women/44.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 3, name: "Will Smith", role: "Product Designer", img: "https://randomuser.me/api/portraits/men/65.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 4, name: "Scarlett Johansson", role: "Marketing Head", img: "https://randomuser.me/api/portraits/women/68.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 5, name: "Chris Evans", role: "Developer", img: "https://randomuser.me/api/portraits/men/12.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 6, name: "Jennifer Lawrence", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/22.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 7, name: "Robert Downey Jr.", role: "CTO", img: "https://randomuser.me/api/portraits/men/45.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 8, name: "Gal Gadot", role: "Marketing Specialist", img: "https://randomuser.me/api/portraits/women/33.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
  { id: 9, name: "Brad Pitt", role: "Product Manager", img: "https://randomuser.me/api/portraits/men/56.jpg", socials: { twitter: "#", github: "#", linkedin: "#", instagram: "#" } },
];

const stats = [
  { id: 1, icon: "🏪", number: "10.5k", label: "Sellers active our site" },
  { id: 2, icon: "💰", number: "33k", label: "Monthly Product Sale", highlight: true },
  { id: 3, icon: "🎁", number: "45.5k", label: "Customer active in our site" },
  { id: 4, icon: "👜", number: "25k", label: "Annual gross sale in our site" },
];

function About() {
  // Prepare carousel items
  const teamItems = team.map(member => <TeamCard key={member.id} {...member} />);

  return (
    <>
      {/* Story Section */}
      <div className="m-5 flex flex-col md:flex-row items-center gap-6 p-5 max-w-6xl mx-auto">
        <div className="md:w-1/2 flex flex-col p-4">
          <h1 className="text-3xl font-bold my-6 ">Our Story</h1>
          <p className="text-gray-600 mb-4">
            Launched in 2015, <span className="font-semibold">BuyNow</span> is a fast-growing online shopping marketplace across India.
          </p>
          <p className="text-gray-600 mb-4">
            Supported by tailored marketing, data, and service solutions, BuyNow partners with over 10,500 sellers and 300+ brands.
          </p>
          <p className="text-gray-600">
            BuyNow offers over 1 million products across multiple categories, making everyday shopping simple, reliable, and affordable.
          </p>
        </div>
        <div className="md:w-1/2 w-full p-6">
          <img
            src="https://static.wixstatic.com/media/bd900c_83a540260c894ecca246a8fd177b1f75~mv2.jpg"
            alt="About BuyNow"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ id, icon, number, label }) => (
            <div
              key={id}
              className="flex flex-col items-center justify-center p-5 border rounded-lg bg-white text-gray-800 hover:shadow-lg hover:scale-105 transition-transform duration-300"
              style={{ willChange: "transform" }}
            >
              <div className="text-4xl mb-3">{icon}</div>
              <div className="font-bold text-2xl">{number}</div>
              <div className="text-center text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Carousel */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Meet Our Team</h2>
       <AliceCarousel
          mouseTracking
          items={teamItems}
          responsive={{
            0: { items: 1 },
            600: { items: 2 },
            900: { items: 3 },
            1200: { items: 4 },
          }}
          autoPlay
          autoPlayInterval={3000}
          infinite
          disableDotsControls={false}
          disableButtonsControls={false}
        />
      </div>
      {/* Features Section */}
  
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


    </>
  );
}

export default About;
