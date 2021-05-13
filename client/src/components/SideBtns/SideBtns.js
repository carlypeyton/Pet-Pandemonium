import React from "react";
import { useGameContext } from "../../utils/GameState";
import "./SideBtns.css";

function SideBtns() {
  const [state, dispatch] = useGameContext();

  return (
    <div className="container">
      <div className="row text-center">
        <h1 id="choose-side">Choose Your Side</h1>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn"
            id="dogs-button"
            onClick={() => dispatch({ type: "CHANGE_PET_TYPE", data: "dogs" })}
          >
            Dogs
          </button>
          <button
            type="button"
            className="btn"
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
