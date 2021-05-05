import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GameBoard from "../GameBoard/GameBoard";
import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";

function Setup() {
  const [gameState, gameDispatch] = useGameContext();
  const [socketState, socketDispatch] = useSocketContext();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>
            Place your {gameState.playerPets[gameState.petIndexToPlace].name}
          </p>
          <GameBoard whichPlayer="user" />
        </div>
        <div className="col">
          {/* Pet pieces */}

          {gameState.gamePhase === "Ready" ? (
            <Link className="btn btn-danger" to="/game">
              Start Game
            </Link>
          ) : (
            <div>Finish placing all Pieces First</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setup;
