import React, { createContext, useReducer, useContext } from "react";
import chatReducer from "../reducers/chatReducer";

const ChatContext = createContext();
const { Provider } = ChatContext;

function ChatProvider({ value = [], ...props }) {
  const [state, dispatch] = useReducer(chatReducer, {
    userName: "Anon",
    userId: "",
    socketId: "",
    users: [],
    room: "Main",
    chatLog: []
  });

  return <Provider value={[state, dispatch]} {...props} />;
}

function useChatContext() {
  return useContext(ChatContext);
}

export { ChatProvider, useChatContext };
