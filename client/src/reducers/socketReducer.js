import socket from "../utils/socket";

const socketReducer = (state, action) => {
  const { chatLog, socket } = state;
  switch (action.type) {
    case "SEND_MESSAGE":
      socket.emit("chat_message", action.data);

      return {
        ...state,
        chatLog: [...chatLog, action.data]
      };
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        chatLog: [...chatLog, action.data]
      };

    default:
      return state;
  }
};

export default socketReducer;
