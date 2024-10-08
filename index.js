const express = require("express");
const app = express();
const mongoose = require("./database");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  return res.send("Welcome to Our Hotel!");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
// Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
