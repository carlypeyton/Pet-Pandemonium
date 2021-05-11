const chatReducer = (state, action) => {
  const { chatLog } = state;
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.data
      };
    case "SET_SOCKET_ID":
      return {
        ...state,
        socketId: action.data
      };
    case "ADD_USER":
      console.log(action.data);
      return {
        ...state,
        users: action.data.users,
        chatLog: [...chatLog, action.data]
      };
    case "SEND_MESSAGE":
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

export default chatReducer;
