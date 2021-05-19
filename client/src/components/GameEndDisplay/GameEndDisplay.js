import React from "react";
import GameBoard from "../GameBoard/GameBoard";

const GameEndDisplay = () => {
  return (
    <div className="container mb-4">
      <div className="row justify-content-around">
        <GameBoard which="player" />

        <GameBoard which="opponent" />
      </div>
    </div>
  );
};

export default GameEndDisplay;
