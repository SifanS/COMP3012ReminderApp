const express = require("express");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
const passport = require("../middleware/passport");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));
// //forever loading why
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect("/auth/login");
  });
});


//auth
router.get('/github', passport.authenticate('github'));


router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/reminders');
  }
);



module.exports = router;
