import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import GameBoard from "../components/GameBoard/GameBoard";
import OpponentBoard from "../components/GameBoard/OpponentBoard";
import Pregame from "./Pregame";
import Postgame from "./Postgame";

import { useGameContext } from "../utils/GameState";
import { useChatContext } from "../utils/ChatState";
import { useSocketContext } from "../utils/SocketState";

const Game = () => {
  const [gameState, gameDispatch] = useGameContext();
  const [chatState, chatDispatch] = useChatContext();
  const { userName, room } = chatState;
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("opponent_ready", data => {
      console.log("ping");
      gameDispatch({
        type: "OPPONENT_READY",
        data: data
      });
    });
    socket.on("opponent_move", data => {
      console.log("opponent_move", data);
      if (gameState.player.field[data.index].contents !== "") {
        gameDispatch({ type: "OPPONENT_HIT", data });
      } else {
        gameDispatch({ type: "OPPONENT_MISS", data });
      }
      gameDispatch({
        type: "OPPONENT_MOVE",
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
    return (
      <div className="row">
        <div className="col-6">
          <GameBoard />
        </div>
        <div className="col-6">
          <OpponentBoard />
        </div>
      </div>
    );
  } else if (gameState.gamePhase === "done") {
    return <Postgame />;
  } else {
    return <Redirect to="/lobby" />;
  }
};

export default Game;
