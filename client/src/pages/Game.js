import React, { useState, useEffect } from "react";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Pet from "../components/Pet/Pet";
import Tile from "../components/Tile/Tile";

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

  const rotatePet = index => {
    console.log(index);
    let newPets = [...playerPets];
    newPets[index].horizontal = !playerPets[index].horizontal;
    setPlayerPets(newPets);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 20px)",
            gridTemplateRows: "repeat(10, 20px)"
          }}
        >
          {playerField.map((tile, index) => (
            <Tile tile={tile} key={index} index={index} handleHit={handleHit} />
          ))}
        </div>
        {playerPets.map((pet, index) => (
          <Pet data={pet} key={pet.name} index={index} rotatePet={rotatePet} />
        ))}
        <button onClick={addContent}></button>
      </div>
    </DndProvider>
  );
};

export default Game;
