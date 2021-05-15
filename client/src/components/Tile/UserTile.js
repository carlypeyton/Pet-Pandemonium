import React from "react";
import { useGameContext } from "../../utils/GameState";
import token from "../../assets/img/2_cats.png";

const UserTile = ({ tile, index, action }) => {
  const [state, dispatch] = useGameContext();
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
        zIndex: 6
      }}
    ></button>
  );
};

export default UserTile;
