
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/auth/login');
    }
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  }
};
