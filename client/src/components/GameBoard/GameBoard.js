import React, { useEffect } from "react";

import UserTile from "../Tile/UserTile";
import Pets from "../Pets/Pets";
import grass from "../../assets/img/grass_field.png";

import { useGameContext } from "../../utils/GameState";

const GameBoard = ({ which }) => {
  const [state, dispatch] = useGameContext();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 30px)",
        gridTemplateRows: "repeat(10, 30px)"
      }}
    >
      <div
        style={{
          gridColumn: "1 / span 10",
          gridRow: "1 / span 10",
          backgroundImage: `url(${grass})`,
          zIndex: 3,
          backgroundSize: "contain"
        }}
      ></div>
      {state.gamePhase !== "win" && state.gamePhase !== "lose"
        ? state[which].field.map((tile, index) => (
            <UserTile tile={tile} key={index} index={index}></UserTile>
          ))
        : ""}
      {<Pets which={which} />}
    </div>
  );
};

export default GameBoard;
