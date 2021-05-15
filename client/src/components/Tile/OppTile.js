import React from "react";
import { useGameContext } from "../../utils/GameState";
import { useSocketContext } from "../../utils/SocketState";
import token from "../../assets/img/2_cats.png";

const OppTile = ({ tile, index, action }) => {
  const [state, dispatch] = useGameContext();
  const socket = useSocketContext();

  const attack = () => {
    if (state.playerTurn && state.opponent.field[index].hit === false) {
      if (state.opponent.field[index].contents !== 99) {
        console.log("Hit!");
        dispatch({ type: "PLAYER_HIT", data: index });
      } else {
        dispatch({ type: "PLAYER_MISS", data: index });
      }
      socket.emit("player_move", {
        index: index,
        gameId: state.gameId,
        player: state.player.userName
      });
    }
  };

  return (
    <button
      style={{
        gridColumn: (index % 10) + 1,
        gridRow: Math.floor(index / 10) + 1,
        backgroundColor: tile.hit ? "red" : "transparent",

        backgroundImage:
          tile.hit && tile.contents !== 99 ? `url(${token})` : "",
        backgroundSize: "contain",
        border: `1px solid white`,
        zIndex: 4
      }}
      onClick={attack}
    ></button>
  );
};

export default OppTile;
