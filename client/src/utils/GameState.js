import React, { createContext, useReducer, useContext } from "react";
import field from "../utils/createField";
import pets from "../utils/petHelper";
import gameReducer from "../reducers/gameReducer";

const GameContext = createContext();
const { Provider } = GameContext;

function GameProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(gameReducer, {
    users: ["Challenger", "Defender"],
    player: {
      field: field,
      pets: pets.cats,
      userName: "Challenger",
      userId: ""
    },
    opponent: {
      field: field,
      pets: pets.cats,
      userName: "Defender",
      userId: ""
    },
    gamePhase: "none",
    opponentStatus: "none",
    playerTurn: true,
    petIndexToPlace: 4,
    gameId: ""
  });

  return <Provider value={[state, dispatch]} {...props} />;
}

function useGameContext() {
  return useContext(GameContext);
}

export { GameProvider, useGameContext };
