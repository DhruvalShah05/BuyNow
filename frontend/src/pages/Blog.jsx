import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blogs");
      setBlogs(data);
    } catch (error) {
      console.error("Blog fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading blogs...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Our Blog
        </h1>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-500">
            No blogs found
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    By {blog.author?.name}
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(blog.createdAt).toDateString()}
                  </p>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {blog.content}
                  </p>

                  <button className="mt-4 text-red-600 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;