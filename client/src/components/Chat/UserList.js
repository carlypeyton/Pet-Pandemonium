import React, { useEffect } from "react";

import { useChatContext } from "../../utils/ChatState";
import { useSocketContext } from "../../utils/SocketState";

const UserList = () => {
  const [{ userName, socketId, users }, chatDispatch] = useChatContext();
  const socket = useSocketContext();

  //   useEffect(() => {
  //     socket.on("set_socket_id", data => {
  //       chatDispatch({
  //         type: "SET_SOCKET_ID",
  //         data
  //       });
  //     });
  //   }, []);

  const invite = (event, user) => {
    event.preventDefault();
    console.log(user);
    socket.emit("send_invite", {
      user,
      opponent: userName,
      opponentId: socketId
    });
  };

  return (
    <div>
      {users.map(user => {
        if (user.socketId !== socketId) {
          return (
            <div key={user.socketId}>
              <span>{user.userName}</span>
              <button onClick={event => invite(event, user)}>
                Invite to Play
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserList;
