import React, { useEffect } from "react";
import Tile from "../Tile/Tile";
import Pets from "../Pets/Pets";

import { useGameContext } from "../../utils/GameState";

const OpponentBoard = () => {
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
        {state.opponent.field.map((tile, index) => (
          <Tile tile={tile} key={index} index={index}></Tile>
        ))}
        {<Pets isUser={false} />}
      </div>
    </div>
  );
};

export default OpponentBoard;
