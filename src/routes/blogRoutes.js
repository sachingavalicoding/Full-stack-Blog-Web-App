import express from "express";
import Blog from "../models/Blog.js"; // Import Blog model
import authMiddleware from "../middlewares/authMiddleware.js"; // Authentication middleware
import multer from "multer"; // Import multer for image uploads
import path from "path";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Custom filename
  },
});

const upload = multer({ storage: storage });

// Initialize router
const router = express.Router();

// Get all blogs (public route)
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.json(blogs); // Return the list of blogs
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get a specific blog by ID (public route)
router.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog); // Return the blog data
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// Create a new blog (only for logged-in users)
router.post(
  "/blogs",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { title, content } = req.body;
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "/images/default.png"; // Set default image path
    const userId = req.user.id; // Get user ID from the JWT token

    try {
      const newBlog = new Blog({
        title,
        content,
        image, // Store the image path in the blog
        author: userId, // Associate blog with logged-in user
      });

      await newBlog.save();
      res.status(201).json(newBlog); // Return the created blog
    } catch (error) {
      res.status(500).json({ message: "Error creating blog" });
    }
  }
);

// Edit a blog (only for the author of the blog)
router.put(
  "/blogs/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Handle image URL
    const userId = req.user.id;

    try {
      const blog = await Blog.findById(id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Check if the logged-in user is the author of the blog
      if (blog.author.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "Not authorized to edit this blog" });
      }

      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.image = image || blog.image || "/images/default.jpg"; // Use default if no image provided

      await blog.save();
      res.json(blog); // Return the updated blog
    } catch (error) {
      res.status(500).json({ message: "Error editing blog" });
    }
  }
);

// Delete a blog (only for the author of the blog)
router.delete("/blogs/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this blog" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

export default router;
