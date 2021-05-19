import React, { useEffect, useState } from "react";
import axios from "axios";
import GameResults from "../components/GameResults/GameResults";
import GameEndDisplay from "../components/GameEndDisplay/GameEndDisplay";
import Highscore from "../components/Highscore/Highscore";
import ReturnToLobby from "../components/ReturnToLobby/ReturnToLobby";

import { useGameContext } from "../utils/GameState";

const Postgame = () => {
  return (
    <div className="container">
      <div className="row">
        <GameResults />
      </div>
      <div className="row">
        <GameEndDisplay />
      </div>
      <div className="row d-flex justify-content-center">
        <ReturnToLobby />
      </div>
      <div className="row">
        <Highscore />
      </div>
    </div>
  );
};

export default Postgame;
