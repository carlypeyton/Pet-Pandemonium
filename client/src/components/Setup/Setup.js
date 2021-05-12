import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GameBoard from "../GameBoard/GameBoard";
import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";

function Setup() {
  const [gameState, gameDispatch] = useGameContext();
  const socket = useSocketContext();

  const sendPlayerReady = () => {
    socket.emit("player_ready", gameState);
    gameDispatch({ type: "PLAYER_READY" });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>
            Place your {gameState.player.pets[gameState.petIndexToPlace].name}
          </p>
          <GameBoard whichPlayer="player" />
        </div>
        <div className="col">
          {/* Pet pieces */}

          {gameState.gamePhase === "ready" ? (
            <button className="btn btn-danger" onClick={sendPlayerReady}>
              Start Game
            </button>
          ) : (
            <div>Finish placing all Pieces First</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setup;
