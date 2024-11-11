import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js"; // Import the blog routes
import { fileURLToPath } from "url"; // Import necessary method
import { dirname } from "path"; // Import dirname method

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Get the current directory name using fileURLToPath and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors()); // allow all requests

// Serving static files (images, etc.) from the 'public/uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use the blog and auth routes
app.use("/api", blogRoutes);
app.use("/api", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
