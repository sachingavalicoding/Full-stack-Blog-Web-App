import mongoose from 'mongoose';

// Define the schema for a blog post
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model based on the schema
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
