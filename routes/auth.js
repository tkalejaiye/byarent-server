const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

const requireSignin = passport.authenticate("local", { session: false });

// =============
// AUTH ROUTES
// =============

// Login route
router.post("/login", authController.login);

// Signup route
router.post("/signup", authController.signup);

// Log out route
router.get("/logout", authController.logout);

module.exports = router;
