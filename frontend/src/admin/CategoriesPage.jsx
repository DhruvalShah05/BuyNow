import { useEffect, useState } from "react";
import api from "../api/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data));
  }, []);

  const addCategory = async () => {
    if (!name.trim()) return;

    const { data } = await api.post("/categories", { name });
    setCategories([...categories, data]);
    setName("");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Categories</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black outline-none flex-1"
          placeholder="Category name"
        />
        <button
          onClick={addCategory}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {categories.map(cat => (
        <div key={cat._id} className="bg-gray-50 p-3 mb-2 rounded-lg">
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;