import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SetUpBoard from "../GameBoard/SetUpBoard";
import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";
import "./Setup.css";

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
          <h2 id="place-pet">
            Place Your {gameState.player.pets[gameState.petIndexToPlace].name}
          </h2>
          <SetUpBoard whichPlayer="player" />
        </div>
        <div className="col">
          {/* Pet pieces */}
          <img
            id="pet-img"
            src={gameState.player.pets[gameState.petIndexToPlace].image}
            style={{ height: "230px", maxHeight: "230px", maxWidth: "230px" }}
          />
          <button
            type="button"
            className="btn"
            id="rotate-button"
            onClick={() => gameDispatch({ type: "ROTATE_PET" })}
          >
            Rotate Pet
          </button>
          {gameState.gamePhase === "waiting" ? (
            <button
              className="btn"
              id="start-game-button"
              onClick={sendPlayerReady}
            >
              Start Game
            </button>
          ) : (
            <div id="finish-place">Finish Placing All Pieces First</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setup;
