const express = require("express");
const app = express();
const mongoose = require("./database");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res.send("Welcome to Our Hotel!");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
// Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
