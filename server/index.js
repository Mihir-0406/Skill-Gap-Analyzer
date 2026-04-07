const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection String (Standard Local Connection)
const MONGO_URI = "mongodb://127.0.0.1:27017/SkillGapAnalyser"; 

// Connecting to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB Connection Error: ", err));

// Define User Schema & Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model("users", UserSchema);

// --- API Endpoints ---

// Register Endpoint
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists! Please use a different one." });
    }

    const newUser = await UserModel.create({ name, email, password });
    res.status(201).json({ message: "Registration successful!", user: newUser });
    console.log(`👤 New user registered: ${email}`);
  } catch (err) {
    console.error("Signup error: ", err);
    res.status(500).json({ error: "Server error during registration." });
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    if (user) {
      console.log(`🔓 Login success for: ${email}`);
      res.json({ message: "Login success", user: { name: user.name, email: user.email } });
    } else {
      res.status(401).json({ error: "Invalid email or password. Please try again." });
    }
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ error: "Server error during login." });
  }
});

// Root check
app.get("/", (req, res) => {
  res.send("SkillGap Analyser Backend is Running!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
