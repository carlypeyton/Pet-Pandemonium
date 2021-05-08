const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("./config/passport.js");
const auth = require("./routes/auth.js");
//const api = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 3001;
const http = require("http").Server(app);

const config = require(`./config/config.${process.env.NODE_ENV}.js`);

const origin = (() => {
  if (process.env.NODE_ENV === "production") {
    return "https://pet-pandemonium.herokuapp.com/";
  }
  return config.CORS_ORIGIN;
})();

const io = require("socket.io")(http, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

console.log(config.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
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

app.use("/api/auth", auth);
//app.use("/api/data/", api);

io.on("connection", socket => {
  console.log("a user connected: " + socket.id);

  socket.on("disconnect", function () {
    console.log("User Disconnected");
  });

  socket.on("chat_message", function (msg) {
    console.log("message: " + msg.text);
    socket.to(msg.room).emit("receive_message", msg);
  });

  socket.on("join_room", data => {
    socket.join(data.room);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("start_game", data => {
    console.log("pong");
    socket.to(data.room).emit("opponent_data", data.game);
  });
});
// io.listen(8000, function() {
// console.log("socket")
// });

http.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
