import React, { useEffect } from "react";
import OppTile from "../Tile/OppTile";
import Pets from "../Pets/Pets";
import grass from "../../assets/img/grass_field.png";
import { useGameContext } from "../../utils/GameState";

const OpponentBoard = () => {
  const [state, dispatch] = useGameContext();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 30px)",
        gridTemplateRows: "repeat(10, 30px)",
        border: "2rem solid #879DEE",
        borderRadius: "2rem"
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
      {state.opponent.field.map((tile, index) => (
        <OppTile tile={tile} key={index} index={index}></OppTile>
      ))}
    </div>
  );
};

export default OpponentBoard;
