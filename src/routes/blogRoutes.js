import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // Assuming authMiddleware is set up

const router = express.Router();

// Create a new blog
router.post("/create", authMiddleware, async (req, res) => {
  const { title, content, image } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      image,
      user: req.user.id, // Get user from authMiddleware
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "name email"); // Populate user details for each blog
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single blog by ID
router.get("/blogs:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the current user is the owner of the blog
    if (blog.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
