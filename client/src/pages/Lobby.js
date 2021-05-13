import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Record from "../components/Record/Record.js";
import Chat from "../components/Chat/Chat";
import ReceiveInvite from "../components/Invite/ReceiveInvite";

import { useChatContext } from "../utils/ChatState";
import { useSocketContext } from "../utils/SocketState";
import { useGameContext } from "../utils/GameState";
import { useUserContext } from "../utils/UserState";

const LobbyStyle = {
  marginTop: "10%",
  fontFamily: "'Montserrat', sans-serif",
  fontSize: "1.5rem"
};

const Lobby = () => {
  const [invite, setInvite] = useState({
    challenger: { userName: "Loading..." }
  });
  const [showInvite, setShowInvite] = useState(false);
  const [chat, chatDispatch] = useChatContext();
  const [gameState, gameDispatch] = useGameContext();
  const [userState, userDispatch] = useUserContext();
  const socket = useSocketContext();

  const closeInvite = () => {
    setShowInvite(false);
  };

  useEffect(() => {
    socket.on("receive_invite", data => {
      console.log("invite recevied: ", data);
      setShowInvite(true);
      setInvite(data);
    });
    socket.on("invite_accepted", data => {
      console.log("invite accepted listener hit");
      gameDispatch({ type: "INVITE_ACCEPTED", data });
      chatDispatch({ type: "CHANGE_ROOM", data: data.gameId });
      socket.emit("change_room", {
        gameId: data.gameId,
        userName: data.challenger.userName
      });
    });
  }, [socket]);

  if (gameState.gamePhase !== "none") {
    return <Redirect to="/game" />;
  }
  if (userState._id === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="container" style={LobbyStyle}>
      {`Welcome, ${chat.userName}`}
      <Record />
      <Chat />
      <ReceiveInvite show={showInvite} close={closeInvite} invite={invite} />
    </div>
  );
};

export default Lobby;
