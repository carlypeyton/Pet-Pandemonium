import React from "react";
import GameResults from "../components/GameResults/GameResults.js";
import Highscore from "../components/Highscore/Highscore.js";

const Postgame = () => {
  return (
    <div className="container">
      <div className="row">
        <GameResults />
      </div>
      <div className="row">
        <Highscore />
      </div>
    </div>
  )
};

export default Postgame;