import React, { useEffect } from "react";

import { useChatContext } from "../../utils/ChatState";
import { useUserContext } from "../../utils/UserState";
import { useSocketContext } from "../../utils/SocketState";

const UserList = () => {
  const [{ userName, socketId, users }, chatDispatch] = useChatContext();
  const [{ _id }, userDispatch] = useUserContext();
  const socket = useSocketContext();

  const invite = (event, user) => {
    event.preventDefault();
    console.log(user);
    socket.emit("send_invite", {
      user,
      challenger: { userName, socketId, _id }
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
