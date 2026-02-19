import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get("/wishlist");
      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    await api.delete(`/wishlist/${id}`);
    setWishlist((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">
          My Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded"
                />

                <h3 className="mt-4 font-semibold">
                  {product.title}
                </h3>

                <p className="text-red-500 font-bold">
                  ₹{product.price}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                    className="text-sm bg-gray-200 px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      removeItem(product._id)
                    }
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;