import Blog from "../models/Blog.js";

// ✅ Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Blog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email");

    if (!blog)
      return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Create Blog (Admin)
export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const blog = await Blog.create({
      title,
      content,
      image,
      author: req.user._id,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};