const users = [];

const socketConnection = socket => {
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
      users,
      socketId: socket.id
    };
    console.log(res);
    io.to(socket.id).emit("set_socket_id", socket.id);
    io.in(data.room).emit("add_user", res);
  });

  socket.on("start_game", data => {
    console.log("pong");
    socket.to(data.room).emit("opponent_data", data.game);
  });
};

module.exports = socketConnection;
