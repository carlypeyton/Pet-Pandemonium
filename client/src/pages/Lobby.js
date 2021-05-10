import React, { useEffect } from "react";
import Record from "../components/Record/Record.js";
import Chat from "../components/Chat/Chat";
import Sounds from "../components/Sounds/Sounds";

import { useChatContext } from "../utils/ChatState";
import { useSocketContext } from "../utils/SocketState";

const Lobby = () => {
  const [chat, chatDispatch] = useChatContext();
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("set_socket_id", data => {
      chatDispatch({
        type: "SET_SOCKET_ID",
        data
      });
    });
  }, [socket]);

  return (
    <div className="container">
      {`Welcome ${chat.userName}`}
      <Record />
      <Chat />
      <Sounds />
    </div>
  );
};

export default Lobby;
