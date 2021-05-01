const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("./config/passport.js");
const auth = require("./routes/auth");
const API = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI =
  "mongodb+srv://Jacobaf:catsvdogs@catsvdogs.dha0g.mongodb.net/catsvdogs?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGODB_URI || MONGODB_URI, {
    useNewUrlParser: true
  })
  .then(console.log(`MongoDB connected ${"local DB"}`))
  .catch(err => console.log(err));
// Define middleware here/auth
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI || MONGODB_URI })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/", auth);
app.use("/api/", API);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
