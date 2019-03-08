const passport = require("passport");
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

require("dotenv").config();

// =================
// JWT STRATEGY
// =================

// Jwt options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"), // gets the token from the authorization header
  secretOrKey: process.env.secret // secret from config file
};

// Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if user ID in payload exists in DB
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    // If yes, call done with user
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// ==================
// LOCAL STRATEGY
// ==================

// local options
const localOptions = { usernameField: "email" };

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify username and password
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err, false);
    }

    // User doesn't exist
    if (!user) {
      return done(null, false, { message: "User doesn't exist" });
    }

    // User found, compare passwords
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      // Passwords do not match
      if (!isMatch) {
        return done(null, false, { message: "Passwords don't match" });
      }

      return done(null, user);
    });
  });
  // Call done with user if user exists
});

// Use strategies
passport.use(jwtLogin);
passport.use(localLogin);
