const express = require("express");
const app = express();
const db = require("./database");
const bodyParser = require("body-parser");
require("dotenv").config();
const passport = require("./auth");

app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middelware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to :${req.originalUrl}`
  );
  next(); //move to next phase
};
// use of middleware
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", function (req, res) {
  return res.send("Welcome to Our Hotel!");
});

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
// Use the routers
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
