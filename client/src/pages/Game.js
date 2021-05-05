import React, { useEffect } from "react";
import GameBoard from "../components/GameBoard/GameBoard";
import OpponentBoard from "../components/GameBoard/OpponentBoard";

import { useGameContext } from "../utils/GameState";
import { useSocketContext } from "../utils/SocketState";

const Game = () => {
  const [gameState, gameDispatch] = useGameContext();
  const [socketState, socketDispatch] = useSocketContext();
  const { socket, room, user } = socketState;

  useEffect(() => {
    //socket = io(CONNECTION_PORT);
    socket.emit("join_room", {
      room: room,
      user: user,
      text: `has joined room ${room}`
    });
    socket.emit("start_game", { game: gameState, room: room });
  }, [room]);

  useEffect(() => {
    socket.on("opponent_data", data => {
      console.log("ping");
      gameDispatch({
        type: "LOAD_OPPONENT",
        data: data
      });
    });
  }, [socket]);

  return (
    <div>
      <GameBoard />
      <OpponentBoard />
    </div>
  );
};

export default Game;
