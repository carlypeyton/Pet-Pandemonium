import React, { useEffect, useState } from "react";

import "./highscores.css";

import Score from "./Score";

function Highscore({ highScores }) {
  return (
    <div className="container highscores">
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
