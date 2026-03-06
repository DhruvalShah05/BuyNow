import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // ✅ new state

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    stock: "",
    category: "",
    tags: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  // Handle text change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", Number(formData.price));
      data.append("oldPrice", Number(formData.oldPrice));
      data.append("stock", Number(formData.stock));

      // ✅ Send category ID
      data.append("category", formData.category);

      const tagsArray = formData.tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "");

      tagsArray.forEach(tag => data.append("tags", tag));

      data.append("image", image);

      await api.post("/products", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Product added successfully 🚀");
      navigate("/admin/products");

    } catch (error) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <input
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
        />

        {/* Price & Old Price */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3"
          />

          <input
            name="oldPrice"
            type="number"
            placeholder="Old Price (Optional)"
            value={formData.oldPrice}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3"
          />
        </div>

        {/* Stock & Category Dropdown */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3"
          />

          {/* ✅ Category Dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 bg-white"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full object-cover rounded-lg"
          />
        )}

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Product"}
        </button>

      </form>
    </div>
  );
};

export default AddProduct;