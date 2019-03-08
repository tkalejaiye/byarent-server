const jwt = require("jwt-simple");
const User = require("../models/user");
const dotenv = require("dotenv").config();
const passport = require("passport");

// Helper method to generate JWT for a user
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.secret);
};

// ==================================================
// SIGNUP
// - Method for signing a new user up to the app
// ==================================================
exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  // Check for user with given email
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(500).send(err);
    }
    // If user exists, throw error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
    });

    res.status(200).json({ token: tokenForUser(user) });
  });
};

// ==================================================
// LOGIN
// - Method for logging a  user in to the app
// ==================================================
exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      console.log(info.message);
      return res.status(401).send({ error: info.message });
    } else {
      req.logIn(user, err => {
        User.findOne({ email: user.email }).then(user => {
          res.status(200).send({ token: tokenForUser(user), user: user.email });
        });
      });
    }
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.send("Logged out");
};
