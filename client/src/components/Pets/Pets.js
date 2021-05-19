import React, { Fragment } from "react";
import { useGameContext } from "../../utils/GameState";

const Pets = ({ which }) => {
  const [state, dispatch] = useGameContext();

  return (
    <Fragment>
      {state[which].pets.map(pet => {
        if (state.gamePhase === "win" || state.gamePhase === "lose") {
          return (
            <div
              style={{
                gridColumn:
                  (pet.position % 10) + 1 + pet.length <= 10
                    ? `${(pet.position % 10) + 1} / span ${pet.length}`
                    : `${11 - pet.length} /  span ${pet.length}`,
                gridRow:
                  Math.floor(pet.position / 10) + 1 + pet.length <= 10
                    ? `${Math.floor(pet.position / 10) + 1} / span ${
                        pet.length
                      }`
                    : `${11 - pet.length} /  span ${pet.length}`,
                backgroundSize: "100% 100%",
                backgroundImage: `url(${pet.image})`,
                backgroundPosition: "center",
                zIndex: 5 + pet.position,
                display: "flex"
              }}
              key={pet.position}
            ></div>
          );
        } else {
          return (
            <div
              style={{
                gridColumn: `${(pet.position % 10) + 1} / span ${
                  pet.horizontal ? pet.length : 1
                }`,
                gridRow: `${Math.floor(pet.position / 10) + 1} / span ${
                  !pet.horizontal ? pet.length : 1
                }`,
                backgroundSize: pet.horizontal ? "100% auto" : "auto 100%",
                backgroundImage: `url(${pet.image})`,
                backgroundPosition: "center",
                border: "2px solid #ACA7DF",
                zIndex: 5,
                display: pet.position < 100 ? "flex" : "none"
              }}
              key={pet.position}
            ></div>
          );
        }
      })}
    </Fragment>
  );
};

export default Pets;
