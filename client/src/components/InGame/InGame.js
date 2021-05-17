import React, { useEffect } from "react";

import "./ingame.css";

import PlayerTurn from "./PlayerTurn";
import GameMessage from "./GameMessage";
import GameBoard from "../GameBoard/GameBoard";
import OpponentBoard from "../GameBoard/OpponentBoard";
import Chat from "../Chat/Chat";

import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";

const InGame = () => {
  const [gameState, gameDispatch] = useGameContext();
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("opponent_move", data => {
      let msg;
      if (gameState.player.field[data.index].contents < 99) {
        if (data.remainingHealth > 1) {
          msg = `${gameState.opponent.userName} is distracting your ${
            gameState.player.pets[gameState.player.field[data.index].contents]
              .name
          }`;
        } else {
          msg = `${gameState.opponent.userName} has made your ${
            gameState.player.pets[gameState.player.field[data.index].contents]
              .name
          } leave it's place in the yard!`;
        }
        gameDispatch({ type: "OPPONENT_HIT", message: msg, data });
      } else {
        msg = `${gameState.opponent.userName} missed`;
        gameDispatch({ type: "OPPONENT_MISS", message: msg, data });
      }
      console.log(gameState.player.field[data.index].contents);
    });
  }, [socket]);

  return (
    <div className="wrapper">
      <PlayerTurn />
      <div className="row d-flex justify-content-around">
        <GameBoard />

        <OpponentBoard />
      </div>
      <div className="row d-flex justify-content-center">
        <GameMessage />
      </div>
      <div className="row justify-content-center chat-row">
        <Chat />
      </div>
    </div>
  );
};

export default InGame;
