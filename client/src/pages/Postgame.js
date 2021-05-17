import React, { useEffect, useState } from "react";
import axios from "axios";
import GameResults from "../components/GameResults/GameResults.js";
import Highscore from "../components/Highscore/Highscore.js";

import { useGameContext } from "../utils/GameState";

const Postgame = () => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    axios.get("/api/user/scores").then(res => {
      console.log(res);
      let scores = res.data;
      setHighScores(scores);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        <GameResults />
      </div>
      <div className="row">
        <Highscore highScores={highScores} />
      </div>
    </div>
  );
};

export default Postgame;
