import React, { useEffect, useState } from "react";

function Highscore({ highScores }) {
  return (
    <div className="container">
      {highScores.map(score => {
        return (
          <div>
            <p key={score._id}>
              {score.userName} {score.wins} {score.losses}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Highscore;
