const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");


const passport = require("./config/passport.js");
const auth = require("./routes/auth.js");
//const api = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 3001;
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const MONGODB_URI =
  "mongodb+srv://Jacobaf:catsvdogs@catsvdogs.dha0g.mongodb.net/catsvdogs?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGODB_URI || MONGODB_URI, {
    useNewUrlParser: true
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
    store: MongoStore.create({ mongoUrl: MONGODB_URI })
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/", auth);
//app.use("/api/data/", api);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  socket.on('chat_message', function(msg){
    console.log('message: ' + msg);
    socket.emit('chat_message', msg);
  });
});
io.listen(8000, function() {
console.log("socket")
});


app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
