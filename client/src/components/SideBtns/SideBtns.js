import React from "react";
import { useGameContext } from "../../utils/GameState";

function SideBtns() {
  const [state, dispatch] = useGameContext();

  return (
    <div className="container">
      <div className="row">
        <h1>Choose Your Side</h1>
      </div>
      <div className="row">
        <div className="col text-right">
          <button
            type="button"
            className="btn btn-primary"
            id="dogs-button"
            onClick={() => dispatch({ type: "CHANGE_PET_TYPE", data: "dogs" })}
          >
            Dogs
          </button>
        </div>
        <div className="col text-left">
          <button
            type="button"
            className="btn btn-primary"
            id="cats-button"
            onClick={() => dispatch({ type: "CHANGE_PET_TYPE", data: "cats" })}
            // disabled={state.player.pets[0].name === "munchkin" ? true : false}
          >
            Cats
          </button>
        </div>
        <div className="col text-left">
          <button
            type="button"
            className="btn"
            id="rotate-button"
            onClick={() => dispatch({ type: "ROTATE_PET" })}
          >
            Rotate Pet
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBtns;
