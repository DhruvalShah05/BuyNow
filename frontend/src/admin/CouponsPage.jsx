// src/admin/pages/CouponsPage.js
import React from "react";

const CouponsPage = () => {
  const coupons = [
    { code: "SAVE10", discount: "10%" },
    { code: "FREESHIP", discount: "Free Shipping" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Coupons</h1>
      <ul className="bg-white rounded shadow-md p-4 flex flex-col gap-2">
        {coupons.map((c, i) => (
          <li key={i} className="flex justify-between items-center border-b py-2">
            <span>{c.code} - {c.discount}</span>
            <button className="text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CouponsPage;
