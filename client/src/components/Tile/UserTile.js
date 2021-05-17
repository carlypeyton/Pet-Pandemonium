import React from "react";
import { useGameContext } from "../../utils/GameState";
import check from "../../assets/img/green-check.png";
import miss from "../../assets/img/red-x.png";

const UserTile = ({ tile, index, action }) => {
  const [state, dispatch] = useGameContext();
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
        zIndex: 6
      }}
    ></button>
  );
};

export default UserTile;
