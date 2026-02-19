import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data } = await api.get(`/blogs/${id}`);
      setBlog(data);
    } catch (error) {
      console.error("Blog fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center py-20">Blog not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">

        <button
          onClick={() => navigate(-1)}
          className="text-red-600 mb-6"
        >
          ← Back
        </button>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">
          {blog.title}
        </h1>

        <div className="text-sm text-gray-500 mb-6">
          By <span className="font-semibold">{blog.author?.name}</span>
          {" | "}
          {new Date(blog.createdAt).toDateString()}
        </div>

        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;