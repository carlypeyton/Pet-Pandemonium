import React from "react";

import { useGameContext } from "../../utils/GameState";

const GameMessage = () => {
  const [state, dispatch] = useGameContext();

  return (
    <div>
      <h2 className="text-center">{state.message}</h2>
    </div>
  );
};

export default GameMessage;
