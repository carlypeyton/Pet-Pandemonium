import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import InGame from "../components/InGame/InGame";
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
      let msg;
      if (gameState.player.field[data.index].contents < 99) {
        msg = `${gameState.opponent.userName} is distracting your ${
          gameState.player.pets[gameState.player.field[data.index].contents]
            .name
        }`;
        console.log(msg);
        gameDispatch({ type: "OPPONENT_HIT", message: msg, data });
      } else {
        msg = `${gameState.opponent.userName}'s treats missed`;
        console.log(gameState.player.field[0], data.index);
        gameDispatch({ type: "OPPONENT_MISS", message: msg, data });
      }
    });
  }, [socket, gameState]);

  if (
    gameState.gamePhase === "setup" ||
    gameState.gamePhase === "waiting" ||
    (gameState.gamePhase === "ready" && gameState.opponentStatus === "setup")
  ) {
    return <Pregame />;
  }
  if (gameState.gamePhase === "ready" && gameState.opponentStatus === "ready") {
    return <InGame />;
  } else if (gameState.gamePhase === "done") {
    return <Postgame />;
  } else {
    return <Redirect to="/lobby" />;
  }
};

export default Game;
