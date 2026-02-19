// TeamCard.jsx
import React from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function TeamCard({ name, role, img, socials }) {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300">
      <img
        src={img}
        alt={name}
        className="w-32 h-32 rounded-lg object-cover mb-4"
      />
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-gray-500 text-sm mb-3">{role}</p>
      <div className="flex space-x-4 text-gray-600">
        <a href={socials.twitter} className="hover:text-blue-500"><FaTwitter size={20} /></a>
        <a href={socials.github} className="hover:text-gray-900"><FaGithub size={20} /></a>
        <a href={socials.linkedin} className="hover:text-blue-700"><FaLinkedin size={20} /></a>
        <a href={socials.instagram} className="hover:text-pink-500"><FaInstagram size={20} /></a>
      </div>
    </div>
  );
}

export default TeamCard;
