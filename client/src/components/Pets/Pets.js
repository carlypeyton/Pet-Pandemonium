import React, { Fragment } from "react";
import { useGameContext } from "../../utils/GameState";

const Pets = ({ isUser }) => {
  const [state, dispatch] = useGameContext();

  const renderPet = pet => {
    return (
      <div
        style={{
          gridColumn: `${(pet.position % 10) + 1} / span ${
            pet.horizontal ? pet.length : 1
          }`,
          gridRow: `${Math.floor(pet.position / 10) + 1} / span ${
            !pet.horizontal ? pet.length : 1
          }`,
          backgroundImage: `url(${pet.image})`,
          backgroundPosition: "center",
          border: "1px solid black",
          zIndex: 5,
          display: isUser ? "flex" : "none"
        }}
        key={pet.position}
      ></div>
    );
  };

  return (
    <Fragment>
      {isUser
        ? state.player.pets.map(pet => renderPet(pet))
        : state.opponent.pets.map(pet => renderPet(pet))}
    </Fragment>
  );
};

export default Pets;
