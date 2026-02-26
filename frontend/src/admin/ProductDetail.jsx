import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const ProductDetail = () => {
  const { id } = useParams();
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

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);

      const product = res.data;

      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice || "",
        stock: product.stock,
        category: product.category,
        tags: product.tags ? product.tags.join(", ") : ""
      });

      setPreview(product.image);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", Number(formData.price));
    data.append("oldPrice", Number(formData.oldPrice));
    data.append("stock", Number(formData.stock));
    data.append("category", formData.category);
    data.append("tags", formData.tags); // backend will split

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await api.put(`/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Product updated successfully ✅");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="oldPrice"
          type="number"
          value={formData.oldPrice}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* TAGS FIELD */}
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          placeholder="Comma separated tags"
        />

        <div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-40 mb-2 rounded object-cover"
            />
          )}
          <input type="file" onChange={handleImageChange} />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Update Product
        </button>

      </form>
    </div>
  );
};

export default ProductDetail;