const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require('passport-github').Strategy;
const userController = require("../controllers/userController");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again",
      });
  }
);

const githubLogin = new GithubStrategy({
  clientID: "8618ec8187821131cdf6",
  clientSecret: "c15a8b187a594ac0ebcaf28a8e0754259a3b592a",
  callbackURL: "http://localhost:3001/auth/github/callback",
},
  function (accessToken, refreshToken, profile, done) {
    const user =  userController.createById(profile.id);
    return user
    ? done(null, user)
    : done(null, false, {
      message: "Your login details are not valid. Please try again",
    });
  }
);


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});



module.exports = passport.use(localLogin);
module.exports = passport.use(githubLogin);