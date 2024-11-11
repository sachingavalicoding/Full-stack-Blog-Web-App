import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import blogRoutes from "./routes/blogRoutes.js"; // Import the blog routes
import userRoutes from "./routes/userRoutes.js";
dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cors()); // allow all requests 
// Connect to MongoDB using the connection string from .env file
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use the blog routes for the /api path
app.use("/api", blogRoutes);
app.use("/api/user",userRoutes);
// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
