import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";
import api from "../api/axios";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setSelectedImage(data.image);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity,
      });

      alert("Added to cart ✅");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div className="p-10">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">

      {/* LEFT: IMAGE SECTION */}
      <div>
        <div className="bg-white p-6 rounded-xl shadow mb-4">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Thumbnail images */}
        {product.images?.length > 0 && (
          <div className="flex gap-3">
            {[product.image, ...product.images].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain border rounded cursor-pointer ${
                  selectedImage === img ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: INFO SECTION */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-400 mb-4">
          {[...Array(5)].map((_, i) =>
            i < product.rating ? (
              <FaStar key={i} />
            ) : (
              <FaRegStar key={i} />
            )
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl font-bold text-red-600">
            ₹{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-gray-400 line-through text-lg">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        {/* Stock */}
        <p className={`mb-4 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-medium">Quantity:</span>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 border p-2 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            Add To Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
          >
            Buy Now
          </button>
        </div>

        {/* Description */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Extra Info */}
        <div className="mt-6 text-sm text-gray-500">
          <p><strong>Category:</strong> {product.category}</p>
          {product.tags?.length > 0 && (
            <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;