import React, { useEffect, useState } from "react";
import Record from "../components/Record/Record.js";
import Chat from "../components/Chat/Chat";
import ReceiveInvite from "../components/Invite/ReceiveInvite";
import Sounds from "../components/Sounds/Sounds";

import { useChatContext } from "../utils/ChatState";
import { useSocketContext } from "../utils/SocketState";

const LobbyStyle = {
  marginTop: "10%",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.5rem"
}

const Lobby = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [chat, chatDispatch] = useChatContext();
  const socket = useSocketContext();

  const closeInvite = () => {
    setShowInvite(false);
  };

  useEffect(() => {
    socket.on("receive_invite", data => {
      console.log("Yes", data);
      setShowInvite(true);
      // chatDispatch({
      //   type: "RECEIVE_INVITE",
      //   data
      // });
    });
  }, [socket]);

  return (
    <div className="container" style={LobbyStyle}>
      {`Welcome, ${chat.userName}`}
      <Record />
      <Chat />
      <ReceiveInvite show={showInvite} close={closeInvite} />
    </div>
  );
};

export default Lobby;
