import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // prevent card click

    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <Link
        to="/admin/products/add"
        className="bg-black text-white px-4 py-2 rounded-lg mb-6 inline-block hover:bg-gray-800"
      >
        + Add Product
      </Link>

      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {products.map(product => (
          <div
            key={product._id}
            onClick={() => navigate(`/admin/products/${product._id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 cursor-pointer relative"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h3 className="mt-3 font-semibold">{product.title}</h3>
            <p className="text-gray-600 font-medium">₹{product.price}</p>

            {/* Delete Button */}
            <button
              onClick={(e) => handleDelete(product._id, e)}
              className="w-full bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Products;