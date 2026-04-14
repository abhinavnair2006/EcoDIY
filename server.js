const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb://127.0.0.1:27017/ecodiy");

const projectSchema = new mongoose.Schema({
title: String,
materials: String,
steps: String,
difficulty: String,
time: String,
image: String,   // ✅ ADD
likes: Number,   // ✅ ADD
status: String
});

const Project = mongoose.model("Project", projectSchema);

app.post("/submit", async (req, res) => {

console.log("🔥 DATA RECEIVED:", req.body);

const project = new Project({ ...req.body, status: "pending" });

await project.save();

res.send("Saved");

});

app.get("/projects", async (req, res) => {
const data = await Project.find({ status: "approved" });
res.json(data);
});

// APPROVE
app.post("/approve/:id", async (req, res) => {
await Project.findByIdAndUpdate(req.params.id, { status: "approved" });
res.send("Approved");
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
await Project.findByIdAndDelete(req.params.id);
res.send("Deleted");
});

app.get("/pending", async (req, res) => {
const data = await Project.find({ status: "pending" });
console.log("PENDING:", data);
res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));


const { exec } = require("child_process");

app.listen(3000, () => {
console.log("Server running on port 3000");
exec("start http://localhost:3000");
});