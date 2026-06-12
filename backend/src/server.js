const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Student Voting System API Running");
});

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working!", body: "Send POST request with JSON" });
});

app.post("/test-body", (req, res) => {
  console.log("Full request object:");
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  
  res.status(200).json({
    success: true,
    message: "Test endpoint",
    receivedBody: req.body,
    bodyType: typeof req.body,
    bodyKeys: req.body ? Object.keys(req.body) : "No body"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
require("dotenv").config();