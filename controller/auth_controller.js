const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  submit: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/auth/login",
    })
  },

  register: (req, res) => {
    res.render("auth/register");
  },
  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
