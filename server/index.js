import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from "./routes/blogRoutes.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// use route 
app.use('/api', blogRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB connected");
  }).catch((err) => console.log(err));
  

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
