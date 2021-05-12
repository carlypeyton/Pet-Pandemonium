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
        return (
          <div key={user.socketId}>
            <span>{user.userName} </span>
            <span>
              Win{user.wins === 1 ? "" : "s"} {user.wins}
            </span>
            {" : "}
            <span>
              Loss{user.losses === 1 ? "" : "es"} {user.losses}
            </span>

            {user.socketId !== socketId ? (
              <button onClick={event => invite(event, user)}>
                Invite to Play
              </button>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserList;
