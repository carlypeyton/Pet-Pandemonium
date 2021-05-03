import React, { useState, useEffect } from "react";
import Pet from "../components/Pet";
import field from "../utils/createField";
import pets from "../utils/petHelper";

const Game = () => {
  const [playerTeam, setPlayerTeam] = useState("cats");
  const [playerField, setPlayerField] = useState(field);
  const [playerPets, setPlayerPets] = useState(pets.cats);

  const handleHit = index => {
    if (!playerField[index].hit) {
      let newField = [...playerField];
      newField[index].hit = true;
      setPlayerField(newField);
    }
  };

  const addContent = () => {
    let newField = [...playerField];
    newField[11].contents = "dog";
    setPlayerField(newField);
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 20px)",
          gridTemplateRows: "repeat(10, 20px)"
        }}
      >
        {playerField.map((tile, index) => (
          <div
            style={{
              gridColumn: (index % 10) + 1,
              gridRow: Math.floor(index / 10) + 1,
              backgroundColor:
                tile.hit && tile.contents ? "red" : tile.hit ? "green" : "blue",
              border: "1px solid white"
            }}
            onClick={() => handleHit(index)}
            key={index}
          ></div>
        ))}
      </div>
      {playerPets.map((pet, index) => (
        <Pet data={pet} key={index} />
      ))}
      <button onClick={addContent}></button>
    </div>
  );
};

export default Game;
