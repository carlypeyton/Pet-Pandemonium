import React, { useEffect } from "react";
import Record from "../components/Record/Record.js";
import Chat from "../components/Chat/Chat";
import Sounds from "../components/Sounds/Sounds";

import { useChatContext } from "../utils/ChatState";
import { useSocketContext } from "../utils/SocketState";

const LobbyStyle = {
  marginTop: "10%",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.5rem"
}

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
    <div className="container" style={LobbyStyle}>
      {`Welcome, ${chat.userName}`}
      <Record />
      <Sounds />
      <Chat />
    </div>
  );
};

export default Lobby;
