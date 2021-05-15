import React, { useEffect } from "react";
import SetUpTile from "../Tile/SetUpTile";
import Pets from "../Pets/Pets";

import { useGameContext } from "../../utils/GameState";

const SetUpBoard = () => {
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
          <SetUpTile tile={tile} key={index} index={index}></SetUpTile>
        ))}
        {<Pets isUser={true} />}
      </div>
    </div>
  );
};

export default SetUpBoard;
