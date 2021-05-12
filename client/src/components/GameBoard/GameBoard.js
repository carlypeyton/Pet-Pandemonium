import React, { useEffect } from "react";
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
          gridTemplateColumns: "repeat(10, 30px)",
          gridTemplateRows: "repeat(10, 30px)"
        }}
      >
        {state.player.field.map((tile, index) => (
          <Tile tile={tile} key={index} index={index}></Tile>
        ))}
        {<Pets isUser={true} />}
      </div>
    </div>
  );
};

export default GameBoard;
