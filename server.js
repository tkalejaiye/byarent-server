const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

// Import Routes
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const properties = require("./routes/properties");
const orders = require("./routes/orders");

// Passport Stuff
const passportService = require("./services/passport");
const passport = require("passport");
const requireAuth = passport.authenticate("jwt", { session: false });

// DB Setup
//const mongoDB = "mongodb://127.0.0.1/byarent_db";
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.mongodburi, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// App Configuration
app.use(bodyparser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/properties", properties);
app.use("/orders", orders);

// Home page
app.get("/", requireAuth, (req, res) => {
  res.send("Byarent App");
});

// Start server
app.listen(8000, () => console.log("Server running on port 8000"));
