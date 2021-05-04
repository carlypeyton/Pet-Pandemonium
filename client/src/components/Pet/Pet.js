import React from "react";

import { useDrag } from "react-dnd";

const Pet = ({ data, index, rotatePet }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "pet",
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }));
  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: data.horizontal ? `${20 * data.length}px` : "20px",
        height: !data.horizontal ? `${20 * data.length}px` : "20px",
        backgroundColor: "yellow",
        border: "1px solid black"
      }}
      onClick={() => rotatePet(index)}
    ></div>
  );
};

export default Pet;
