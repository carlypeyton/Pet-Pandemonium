import React, { useEffect, useState } from "react";
import axios from "axios";

import "./highscores.css";

import Score from "./Score";

function Highscore() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    axios.get("/api/user/scores").then(res => {
      console.log(res);
      let scores = res.data;
      setHighScores(scores);
    });
  }, []);

  return (
    <div className="container highscores">
      <h2 className="text-center">High Scores</h2>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <td>User Name</td>
            <td>Wins</td>
            <td>Losses</td>
            <td>Average</td>
          </tr>
        </thead>
        <tbody>
          {highScores ? (
            highScores.map(score => <Score key={score._id} score={score} />)
          ) : (
            <tr>
              <td>{"..."}</td>
              <td>{"Loading"}</td>
              <td>{"..."}</td>
              <td>{"Loading"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Highscore;
