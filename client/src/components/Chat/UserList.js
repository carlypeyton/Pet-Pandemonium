import React, { useEffect } from "react";

import { useChatContext } from "../../utils/ChatState";
import { useSocketContext } from "../../utils/SocketState";

const UserList = () => {
  const [{ userName, users }, chatDispatch] = useChatContext();
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("add_user", data => {
      console.log(data);
      chatDispatch({
        type: "ADD_USER",
        data
      });
    });
  }, []);

  const invite = user => {
    console.log(user);
  };

  return (
    <div>
      {users.map(user => {
        return (
          <div key={user.socketId}>
            <span>{user.userName}</span>
            <button onClick={() => invite(user)}>Invite to Play</button>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
