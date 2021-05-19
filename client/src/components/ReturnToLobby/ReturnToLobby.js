import React from "react";

import "./returntolobby.css";

import { useGameContext } from "../../utils/GameState";
import { useChatContext } from "../../utils/ChatState";

const ReturnToLobby = () => {
  const [chat, chatDispatch] = useChatContext();
  const [game, gameDispatch] = useGameContext();

  const lobby = () => {
    gameDispatch({ type: "HARD_RESET" });
    chatDispatch({ type: "CHANGE_ROOM", data: "Main" });
  };

  return (
    <button id="lobby" onClick={lobby}>
      Return to Lobby
    </button>
  );
};

export default ReturnToLobby;
