import express from "express";
import Blog from "../models/Blog.js"; // Import Blog model
import authMiddleware from "../middlewares/authMiddleware.js"; // Authentication middleware
import multer from "multer"; // Import multer for image uploads
import path from "path";
import fs from "fs";

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.resolve("public", "uploads"); // Resolve relative path to absolute path
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir); 
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
    res.status(500).json({ message: "Error fetching blogs", error });
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
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

// Create a new blog (only for logged-in users)
router.post("/blogs", authMiddleware, upload.single("image"), async (req, res) => {
  const { title, content } = req.body;

  // Ensure title and content are provided
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const image = req.file ? `/uploads/${req.file.filename}` : "/images/default.jpg"; // Set default image path if no image uploaded
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
    res.status(500).json({ message: "Error creating blog", error });
  }
});

// Edit a blog (only for the author of the blog)
router.put("/blogs/:id", authMiddleware, upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  // Validate title and content
  if (!title && !content) {
    return res.status(400).json({ message: "At least one of title or content is required" });
  }

  const image = req.file ? `/uploads/${req.file.filename}` : null; // Handle image URL (can be null if no image is uploaded)
  const userId = req.user.id;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this blog" });
    }

    // Update the blog fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image || "/images/default.jpg"; // Use default image if no new image is provided

    await blog.save();
    res.json(blog); // Return the updated blog
  } catch (error) {
    res.status(500).json({ message: "Error editing blog", error });
  }
});

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
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

export default router;
