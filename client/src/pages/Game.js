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

  // useEffect(() => {
  //   socket.on("opponent_data", data => {
  //     console.log("ping");
  //     gameDispatch({
  //       type: "LOAD_OPPONENT",
  //       data: data
  //     });
  //   });
  // }, [socket]);

  if (gameState.gamePhase === "setup") {
    return <Pregame />;
  } else if (gameState.gamePhase === "ready") {
    return (
      <div>
        <GameBoard />
        <OpponentBoard />
      </div>
    );
  } else if (gameState.gamePhase === "done") {
    return <Postgame />;
  } else {
    return <Redirect to="/lobby" />;
  }
};

export default Game;
