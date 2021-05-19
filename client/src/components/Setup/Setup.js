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
        <div className="col d-flex justify-content-center">
          <div>
            <h2 id="place-pet">
              Place Your {gameState.player.pets[gameState.petIndexToPlace].name}
            </h2>
            <SetUpBoard whichPlayer="player" />
          </div>
        </div>
        <div className="col">
          <div className="row" id="pet-picture">
            <img
              id="pet-img"
              src={gameState.player.pets[gameState.petIndexToPlace].image}
              style={{ maxHeight: "230px", maxWidth: "230px" }}
            />
          </div>

          <div className="row d-flex justify-content-between">
            {gameState.gamePhase === "waiting" ? (
              <button
                className="btn"
                id="start-game-button"
                onClick={sendPlayerReady}
              >
                Start Game
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn"
                  id="rotate-button"
                  onClick={() => gameDispatch({ type: "ROTATE_PET" })}
                >
                  Rotate Pet
                </button>
                <p className="text-center pt-2" id="hori">
                  Current alignment:
                </p>
                <p className="text-center" id="hori">
                  {gameState.player.pets[gameState.petIndexToPlace].horizontal
                    ? "horizontal"
                    : "vertical"}
                </p>
              </div>
            )}
            <button
              type="button"
              className="btn"
              id="reset-button"
              onClick={() => gameDispatch({ type: "SOFT_RESET" })}
            >
              Reset Pets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setup;
