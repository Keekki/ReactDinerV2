// const fs = require("node:fs/promises");
const express = require("express");
const bodyParser = require("body-parser");
// const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use("/images", express.static("public/images"));
app.use("/assets/videos", express.static("public/videos")); // Serve static files from the videos directory

app.use("/api", menuRoutes);
app.use("/api", userRoutes);

app.get("/healthCheck", (req, res) => {
  res.status(200).send("all good");
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

module.exports = app;
