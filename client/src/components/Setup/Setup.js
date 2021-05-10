import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GameBoard from "../GameBoard/GameBoard";
import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";

function Setup() {
  const [gameState, gameDispatch] = useGameContext();
  const socket = useSocketContext();

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
            <button className="btn btn-danger" onClick={() => gameDispatch}>
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
