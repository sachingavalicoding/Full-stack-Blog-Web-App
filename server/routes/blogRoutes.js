import express from 'express';
import Blog from '../models/Blog.js'; // Import the Blog model

const router = express.Router();

// Route to create a new blog post
router.post('/blogs', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author,
    });

    await newBlog.save(); // Save the blog post to the database
    res.status(201).json(newBlog); // Respond with the created blog post
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get all blog posts
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a specific blog post by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
