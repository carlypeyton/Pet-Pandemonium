import React from "react";

import "./ingame.css";

import GameMessage from "./GameMessage";
import GameBoard from "../GameBoard/GameBoard";
import OpponentBoard from "../GameBoard/OpponentBoard";
import Chat from "../Chat/Chat";

const InGame = () => {
  return (
    <div className="wrapper">
      <div className="row d-flex justify-content-around">
        <GameBoard />

        <OpponentBoard />
      </div>
      <div className="row d-flex justify-content-center">
        <GameMessage />
      </div>
      <div className="row justify-content-center chat-row">
        <Chat />
      </div>
    </div>
  );
};

export default InGame;
