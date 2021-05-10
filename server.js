const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const socketConnection = require("./config/socketConnection");
const passport = require("./config/passport.js");
//const auth = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 3001;
const http = require("http").Server(app);

const config = require(`./config/config.${process.env.NODE_ENV}.js`);

const io = require("socket.io")(http, {
  cors: {
    origin: config.CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

console.log(config.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(console.log(`MongoDB connected ${"local DB"}`))
  .catch(err => console.log(err));

// Define middleware here/auth
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/user", require("./routes/user.js"));
//app.use("/api/data/", api);

io.on("connection", socket => socketConnection(socket));
// io.listen(8000, function() {
// console.log("socket")
// });

http.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
