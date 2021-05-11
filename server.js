const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const socketConnection = require("./config/socketConnection");
const users = require("./config/users");
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

io.on("connection", socket => {
  console.log("a user connected: " + socket.id);

  socket.on("disconnect", function () {
    users.splice(
      users.findIndex(user => user.socketId === socket.id),
      1
    );
    console.log("User Disconnected");
  });

  socket.on("chat_message", function (msg) {
    console.log("message: " + msg.text);
    socket.to(msg.room).emit("receive_message", msg);
  });

  socket.on("join_room", data => {
    socket.join(data.room);
    users.push({
      userName: data.userName,
      room: data.room,
      socketId: socket.id
    });
    const res = {
      ...data,
      users
    };
    console.log(res);
    io.to(socket.id).emit("set_socket_id", socket.id);
    io.to(data.room).emit("add_user", res);
  });

  socket.on("start_game", data => {
    console.log("pong");
    socket.to(data.room).emit("opponent_data", data.game);
  });

  socket.on("send_invite", data => {
    console.log(data);
    io.to(data.user.socketId).emit("receive_invite", data);
  });
});

http.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
