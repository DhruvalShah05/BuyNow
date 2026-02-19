import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../componets/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [products, selectedCategory, sortOption]);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterAndSort = () => {
    let temp = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      temp = temp.filter(
        (product) =>
          product.category &&
          product.category._id === selectedCategory
      );
    }

    // Sorting
    if (sortOption === "low-high") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      temp.sort((a, b) => b.price - a.price);
    } else if (sortOption === "best-selling") {
      temp.sort((a, b) => b.sold - a.sold);
    } else {
      temp.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredProducts(temp);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            All Products
          </h1>

          <div className="flex gap-4 mt-4 md:mt-0">

            {/* Category Filter */}
            <select
              className="border p-2 rounded"
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="border p-2 rounded"
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
            >
              <option value="latest">Latest</option>
              <option value="low-high">
                Price: Low to High
              </option>
              <option value="high-low">
                Price: High to Low
              </option>
              <option value="best-selling">
                Best Selling
              </option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;