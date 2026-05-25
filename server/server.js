const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("MCQ Quiz Backend Running Successfully");
});

const questions = JSON.parse(
  fs.readFileSync("./data/questions.json", "utf8")
);

app.get("/quiz/:topic", (req, res) => {
  const topic = req.params.topic.toLowerCase();

  if (questions[topic]) {
    res.json(questions[topic]);
  } else {
    res.status(404).json({ message: "Topic not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});