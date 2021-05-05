import React, { createContext, useReducer, useContext } from "react";
import field from "../utils/createField";
import pets from "../utils/petHelper";
import socketReducer from "../reducers/socketReducer";
import socket from "./socket";

const SocketContext = createContext();
const { Provider } = SocketContext;

function SocketProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(socketReducer, {
    user: "Player 1",
    room: "Main",
    chatLog: [],
    socket: socket
  });

  return <Provider value={[state, dispatch]} {...props} />;
}

function useSocketContext() {
  return useContext(SocketContext);
}

export { SocketProvider, useSocketContext };
