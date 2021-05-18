import React from "react";

import "./userlist.css";

import { useChatContext } from "../../utils/ChatState";
import { useUserContext } from "../../utils/UserState";
import { useSocketContext } from "../../utils/SocketState";

const UserData = ({ user }) => {
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
    <tr>
      <td>{user.userName} </td>
      <td>{user.wins}</td>
      <td>{user.losses}</td>
      <td>
        {user.socketId !== socketId ? (
          <button className="invite" onClick={event => invite(event, user)}>
            Play!
          </button>
        ) : (
          <button className="btn"></button>
        )}
      </td>
    </tr>
  );
};

export default UserData;
