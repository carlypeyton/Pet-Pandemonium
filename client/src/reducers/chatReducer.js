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
      console.log("add user reducer: ", action.data);
      return {
        ...state,
        users: action.data.users,
        chatLog: [
          ...chatLog,
          {
            text: action.data.text,
            userName: action.data.userName,
            room: action.data.room
          }
        ]
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
    case "CHANGE_ROOM":
      console.log(action.data);
      return {
        ...state,
        room: action.data
      };

    default:
      return state;
  }
};

export default chatReducer;
