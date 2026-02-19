import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">

      <Link
        to="/admin/products/add"
        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition mb-6 inline-block"
      >
        Add Product
      </Link>

      <h2 className="text-2xl font-semibold mb-6">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white shadow-sm rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/admin/products/${product._id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover rounded-lg"
            />
            <h3 className="mt-3 font-semibold">{product.title}</h3>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;