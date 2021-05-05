import React, { useEffect } from "react";
import GameBoard from "../GameBoard/GameBoard";
import { useGameContext } from "../../utils/GameState";
import socket from "../../utils/socket";

function Setup() {
  const [state, dispatch] = useGameContext();

  useEffect(() => {
    socket.on("opponent_data", data => {
      dispatch("LOAD_OPPONENT", data);
    });
  }, [socket]);

  const startGame = () => {
    socket.emit("game_start", state);
    dispatch({ type: "START_GAME" });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>Place your {state.playerPets[state.petIndexToPlace].name}</p>
          <GameBoard />
        </div>
        <div className="col">
          {/* Pet pieces */}

          {state.gameState === "Ready" ? (
            <button className="btn btn-danger" onClick={startGame}>
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
