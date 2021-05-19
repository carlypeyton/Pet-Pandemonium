import React, { useEffect } from "react";
import axios from "axios";

import "./gameresults.css";

import { useGameContext } from "../../utils/GameState";
import { useUserContext } from "../../utils/UserState";

function GameResults() {
  const [gameState, gameDispatch] = useGameContext();
  const [userState, userDispatch] = useUserContext();

  useEffect(() => {
    if (gameState.gamePhase === "win") {
      axios
        .put("/api/user/update_record", {
          _id: userState._id,
          wins: userState.wins + 1,
          losses: userState.losses
        })
        .then(res => {
          gameDispatch({ type: "UPDATE_RECORD", data: res.data });
        });
    }
    if (gameState.gamePhase === "lose") {
      axios
        .put("/api/user/update_record", {
          _id: userState._id,
          wins: userState.wins,
          losses: userState.losses + 1
        })
        .then(res => {
          userDispatch({ type: "UPDATE_RECORD", data: res.data });
        });
    }
  }, []);

  return (
    <div className="container results">
      <div className="row d-flex justify-content-center">
        <h2 className="text-center">
          {gameState.gamePhase === "win"
            ? `You have distracted all of ${gameState.opponent.userName}'s pets.  You Win!`
            : `Your pets are all distracted by treats. ${gameState.opponent.userName} wins!`}
        </h2>
      </div>
    </div>
  );
}

export default GameResults;
