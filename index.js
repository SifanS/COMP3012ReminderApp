const express = require("express");
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const { forwardAuthenticated } = require("./middleware/checkAuth");

const app = express();


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());


// Routes start here
app.use("/", indexRoute);
app.use("/auth", authRoute);


app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
