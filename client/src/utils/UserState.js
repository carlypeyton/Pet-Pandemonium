import React, { createContext, useReducer, useContext } from "react";

import userReducer from "../reducers/userReducer";

const UserContext = createContext();
const { Provider } = UserContext;

function UserProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(userReducer, {
    email: "",
    _id: "",
    userName: "",
    wins: 0,
    losses: 0,
    accuracy: 0,
    lastGame: { users: ["", ""], gameId: "" }
  });

  return <Provider value={[state, dispatch]} {...props} />;
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
