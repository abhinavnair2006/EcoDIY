require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecodiy";
mongoose.connect(mongoURI);

// Schemas
const projectSchema = new mongoose.Schema({
  title: String,
  materials: String,
  steps: String,
  difficulty: String,
  time: String,
  image: String,
  likes: { type: Number, default: 0 },
  status: String
});

const Project = mongoose.model("Project", projectSchema);

// API Routes
app.post("/api/submit", async (req, res) => {
  try {
    console.log("🔥 DATA RECEIVED:", req.body);
    const project = new Project({ ...req.body, status: "pending" });
    await project.save();
    res.json({ message: "Saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const data = await Project.find({ status: "approved" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Admin Routes
app.get("/api/pending", async (req, res) => {
  try {
    const data = await Project.find({ status: "pending" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/approve/:id", async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.json({ message: "Approved" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// AI Assistant Route (Gemini API)
let genAI;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    if (!genAI) {
      return res.json({
        reply: "To get proper step-by-step guides, please set your GEMINI_API_KEY in the `.env` file of the backend."
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const systemPrompt = `You are the EcoDIY AI Assistant. Your goal is to help users with eco-friendly DIY projects, upcycling, material reuse, and sustainability. When users ask for ideas or guides, provide practical, step-by-step instructions. Keep responses friendly, helpful, and concisely formatted. The user says: "${message}"`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error.message || error);
    let errorMessage = "Sorry, I'm having trouble thinking right now.";

    if (error.status === 404 || (error.message && error.message.includes("404"))) {
      errorMessage = "The requested AI model was not found. Please check your model name or restart your server!";
    } else if (error.message && error.message.includes("API key not valid")) {
      errorMessage = "The provided Gemini API key is not valid. Please check your .env file.";
    }

    // send 200 so axios doesn't throw, making it easier to show in chat
    res.json({ reply: errorMessage });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});