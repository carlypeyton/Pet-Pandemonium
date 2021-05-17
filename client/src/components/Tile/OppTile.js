import React from "react";
import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";
import howls from "../../utils/howls";
import check from "../../assets/img/green-check.png";
import miss from "../../assets/img/red-x.png";

const OppTile = ({ tile, index, action }) => {
  const [state, dispatch] = useGameContext();
  const socket = useSocketContext();

  const attack = () => {
    if (state.playerTurn && state.opponent.field[index].hit === false) {
      let msg;
      let remainingHealth = 6;
      if (state.opponent.field[index].contents !== 99) {
        if (
          state.opponent.pets[state.opponent.field[index].contents]
            .remainingHealth > 1
        ) {
          msg = `You are distracting ${state.opponent.userName}'s ${
            state.opponent.pets[state.opponent.field[index].contents].name
          }`;
          if (state.opponent.petType === "cats") {
            howls.meow();
          } else {
            howls.bark();
          }
        } else {
          msg = `You have made ${
            state.opponent.pets[state.opponent.field[index].contents].name
          } leave it's place in the yard!`;
          if (state.opponent.petType === "cat") {
            howls.meow();
          } else {
            howls.bark();
          }
        }
        remainingHealth =
          state.opponent.pets[state.opponent.field[index].contents]
            .remainingHealth;
        dispatch({
          type: "PLAYER_HIT",
          message: msg,
          data: { index, remainingHealth }
        });
      } else {
        msg = "You missed!";
        dispatch({
          type: "PLAYER_MISS",
          message: msg,
          data: { index, remainingHealth }
        });
        howls.squeak();
      }
      socket.emit("player_move", {
        index: index,
        gameId: state.gameId,
        player: state.player.userName,
        remainingHealth
      });
    }
  };

  return (
    <button
      style={{
        gridColumn: (index % 10) + 1,
        gridRow: Math.floor(index / 10) + 1,
        backgroundColor: "transparent",

        backgroundImage:
          tile.hit && tile.contents !== 99
            ? `url(${check})`
            : tile.hit && tile.contents === 99
            ? `url(${miss})`
            : "",
        backgroundSize: "contain",
        border: `1px solid white`,
        zIndex: 4
      }}
      onClick={attack}
    ></button>
  );
};

export default OppTile;
