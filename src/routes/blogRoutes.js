import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,  // Store the image URL (or path)
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Link to the User model
      required: true,
    },
  },
  { timestamps: true }  // Automatically add createdAt and updatedAt fields
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
