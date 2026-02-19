import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddProduct = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    if (image) data.append("image", image);

    await api.post("/products", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    navigate("/admin/products");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {Object.keys(formData).map((field) => (
          field !== "description" ? (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
              required={field !== "oldPrice" && field !== "tags"}
            />
          ) : (
            <textarea
              key={field}
              name={field}
              placeholder="Description"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none"
              required
            />
          )
        ))}

        {preview && (
          <img src={preview} alt="preview" className="h-40 rounded-lg" />
        )}

        <input type="file" onChange={handleImage} required />

        <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;