import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.get(`/products/${id}`).then(res => {
      setProduct(res.data);
      setFormData(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      imageFile: file,
      imagePreview: URL.createObjectURL(file)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);

    if (formData.imageFile) {
      data.append("image", formData.imageFile);
    }

    await api.put(`/products/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Product updated ✅");
    navigate("/admin/products");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div  className="bg-white p-4 sm:p-6 rounded-xl shadow-sm w-full max-w-3xl mx-auto">>
      <h2 className="text-xl mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="price"
          type="number"
          value={formData.price || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="stock"
          type="number"
          value={formData.stock || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <div>
          <img
            src={formData.imagePreview || product.image}
            alt="preview"
            className="h-40 mb-2"
          />

          <input type="file" onChange={handleImageChange} />
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default ProductDetail;