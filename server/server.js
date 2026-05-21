const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

const filePath = path.join(__dirname, "data", "questions.json");

const questions = JSON.parse(
  fs.readFileSync(filePath, "utf8")
);

app.get("/quiz/:topic", (req, res) => {
  const topic = req.params.topic.toLowerCase();

  if (questions[topic]) {
    res.json(questions[topic]);
  } else {
    res.status(404).json({
      message: "Topic not found",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});