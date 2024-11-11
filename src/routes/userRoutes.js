import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import protect from "../middlewares/auth.js"; // Import the JWT middleware

dotenv.config(); // Load environment variables from .env file

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// User Registration Route
router.post("/register", async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    // Check if the username or email already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists" });
    }

    const newUser = new User({ username, email, phoneNumber, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Logout Route
router.post("/logout", (req, res) => {
  res
    .status(200)
    .json({
      message: "Logout successful. Token can now be removed from client.",
    });
});

// Protected Route (Example: Get User Profile)
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // Access userId from decoded token
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch user profile" });
  }
});

export default router;
