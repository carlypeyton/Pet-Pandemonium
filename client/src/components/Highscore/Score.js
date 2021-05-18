import React from "react";

const Score = ({ score }) => {
  return (
    <tr>
      <td>{score.userName}</td>
      <td>{score.wins}</td>
      <td>{score.losses}</td>
      <td>
        {!isNaN(score.wins / (score.wins + score.losses))
          ? Math.floor((score.wins * 100) / (score.wins + score.losses))
          : "-"}
        %
      </td>
    </tr>
  );
};

export default Score;
