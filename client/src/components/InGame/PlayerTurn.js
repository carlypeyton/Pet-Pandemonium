import React from "react";

import { useGameContext } from "../../utils/GameState";

const PlayerTurn = () => {
  const [state, dispatch] = useGameContext();
  return (
    <div>
      {state.playerTurn ? (
        <h2 className="text-center">It's your turn</h2>
      ) : (
        <h2 className="text-center">
          Waiting for {state.opponent.userName} to make a move...
        </h2>
      )}
    </div>
  );
};

export default PlayerTurn;
