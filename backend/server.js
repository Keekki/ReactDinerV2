const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api", menuRoutes);

// Start the server only if not in the test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

module.exports = app;
