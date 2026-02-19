import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";

export default function BestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const { data } = await api.get("/products/best-selling");
        setProducts(data);
      } catch (error) {
        console.error("Best selling fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestProducts();
  }, []);

  if (loading) {
    return (
      <div className="px-4 md:px-12 my-12">
        <h2 className="text-2xl font-bold">Loading Best Products...</h2>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 my-12">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <p className="text-red-500 text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-5 bg-red-500 inline-block"></span>
            This Month
          </p>
          <h2 className="text-3xl font-bold mt-1">
            Best Selling Products
          </h2>
        </div>

        <button className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition">
          View All
        </button>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <p>No best selling products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}