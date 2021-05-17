import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import InGame from "../components/InGame/InGame";
import Pregame from "./Pregame";
import Postgame from "./Postgame";

import { useGameContext } from "../utils/GameState";
import { useSocketContext } from "../utils/SocketState";

const Game = () => {
  const [gameState, gameDispatch] = useGameContext();
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("opponent_ready", data => {
      console.log("ping");
      gameDispatch({
        type: "OPPONENT_READY",
        data: data
      });
    });
  }, [socket]);

  if (
    gameState.gamePhase === "setup" ||
    gameState.gamePhase === "waiting" ||
    (gameState.gamePhase === "ready" && gameState.opponentStatus === "setup")
  ) {
    return <Pregame />;
  }
  if (gameState.gamePhase === "ready" && gameState.opponentStatus === "ready") {
    return <InGame />;
  } else if (gameState.gamePhase === "win" || gameState.gamePhase === "lose") {
    return <Postgame />;
  } else {
    return <Redirect to="/lobby" />;
  }
};

export default Game;
