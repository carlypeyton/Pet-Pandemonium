import React, { useContext } from "react";
import Tile from "../Tile/Tile";
import Pets from "../Pets/Pets";

import { useGameContext } from "../../utils/GameState";

const GameBoard = () => {
  const [state, dispatch] = useGameContext();
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 40px)",
          gridTemplateRows: "repeat(10, 40px)"
        }}
      >
        {state.playerField.map((tile, index) => (
          <Tile tile={tile} key={index} index={index}></Tile>
        ))}
        {<Pets />}
      </div>
    </div>
  );
};

export default GameBoard;
