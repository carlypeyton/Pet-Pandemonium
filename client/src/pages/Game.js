import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import InGame from "../components/InGame/InGame";
import Pregame from "./Pregame";
import Postgame from "./Postgame";
import ChoosePets from "../components/Setup/ChoosePets";
import WaitingOnPets from "../components/Setup/WaitingOnPets";

import { useGameContext } from "../utils/GameState";
import { useSocketContext } from "../utils/SocketState";
import { useUserContext } from "../utils/UserState";

const Game = () => {
  const [gameState, gameDispatch] = useGameContext();
  const [userState, userDispatch] = useUserContext();
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

  if (userState._id === "") {
    return <Redirect to="/" />;
  }
  if (gameState.player.petType === "" && gameState.gamePhase === "setup") {
    return <ChoosePets />;
  }
  if (gameState.gamePhase === "setup" || gameState.gamePhase === "waiting") {
    return <Pregame />;
  }
  if (gameState.gamePhase === "ready" && gameState.opponentStatus === "setup") {
    return <WaitingOnPets />;
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
