import React from "react";
import { useDrop } from "react-dnd";

const Tile = ({ tile, index, handleHit }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "pet",
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  }));
  return (
    <div
      ref={drop}
      style={{
        gridColumn: (index % 10) + 1,
        gridRow: Math.floor(index / 10) + 1,
        backgroundColor:
          tile.hit && tile.contents ? "red" : tile.hit ? "green" : "blue",
        border: "1px solid white"
      }}
      onClick={() => handleHit(index)}
      key={index}
    >
      {isOver && (
        <div
          style={{
            position: "relative",
            top: 0,
            left: 0,
            height: "20px",
            width: "20px",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow"
          }}
        />
      )}
    </div>
  );
};

export default Tile;
