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
    console.log("join_room socket", data);
    socket.join(data.room);
    users.push({
      ...data.userData,
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

  socket.on("send_invite", data => {
    console.log("invite sent", data);
    socket.to("Main").emit("receive_message", {
      text: `${data.challenger.userName} has challenged ${data.user.userName} to a game!`,
      userName: data.challenger.userName,
      room: "Main"
    });
    io.to(data.user.socketId).emit("receive_invite", data);
  });

  socket.on("challenge_accepted", data => {
    console.log("challenge accepted", data);
    socket.to("Main").emit("receive_message", {
      text: `${data.defender.userName} has accepted!`,
      userName: data.defender.userName,
      room: "Main"
    });
    socket.leave("Main");
    socket.join(data.gameId);
    socket.to(data.gameId).emit("receive_message", {
      text: `${data.defender.userName} is in the Game!`,
      userName: data.defender.userName,
      room: data.gameId
    });
    io.to(data.challenger.socketId).emit("invite_accepted", data);
    console.log(`${data.defender.userName} has entered the game`);
  });

  socket.on("change_room", data => {
    //conmes from Lobby.js
    console.log("change room of challenger to", data.gameId);
    socket.leave("Main");
    socket.join(data.gameId);
    socket.to(data.gameId).emit("receive_message", {
      text: `${data.userName} is in the Game!`,
      userName: data.userName,
      room: data.gameId
    });
    console.log(`${data.userName} has entered the game`);
  });

  socket.on("player_ready", data => {
    console.log("player ready", data);
    socket.to(data.gameId).emit("opponent_ready", data);
  });

  socket.on("player_move", data => {
    console.log("player move heard", data);
    socket.to(data.gameId).emit("opponent_move", data);
  });
});

http.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
