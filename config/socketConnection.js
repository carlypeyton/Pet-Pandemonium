const socketConnection = socket => {
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
};

module.exports = socketConnection;
