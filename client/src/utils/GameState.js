import React, { createContext, useReducer, useContext } from "react";
import field from "../utils/createField";
import pets from "../utils/petHelper";
import gameReducer from "../reducers/gameReducer";

const GameContext = createContext();
const { Provider } = GameContext;

function GameProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(gameReducer, {
    users: ["Player 1", "Player 2"],
    gameState: "Setup",
    platerTurn: true,
    playerField: field,
    playerPets: pets.cats,
    opponentField: [],
    opponentPets: [],
    petIndexToPlace: 4,
    room: 1
  });

  return <Provider value={[state, dispatch]} {...props} />;
}

function useGameContext() {
  return useContext(GameContext);
}

export { GameProvider, useGameContext };
