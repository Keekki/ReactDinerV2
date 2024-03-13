const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());

const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use(bodyParser.json());
app.use(express.static("./public"));
app.use("/images", express.static("public/images"));
app.use("/assets/videos", express.static("public/videos")); // Serve static files from the videos directory

app.use("/api", menuRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);

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
