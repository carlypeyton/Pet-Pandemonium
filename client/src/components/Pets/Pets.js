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
          backgroundImage: `url(
            "https://pngimg.com/uploads/free/free_PNG90775.png"
          )`,
          backgroundSize: "cover",
          border: "1px solid black",
          zIndex: 5
        }}
        key={pet.position}
      ></div>
    );
  };

  return (
    <Fragment>
      {isUser
        ? state.playerPets.map(pet => renderPet(pet))
        : state.opponentPets.map(pet => renderPet(pet))}
    </Fragment>
  );
};

export default Pets;
