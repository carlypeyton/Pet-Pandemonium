const userReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
    case "CREATE_USER":
      return {
        ...state,
        email: action.data.email,
        userName: action.data.userName,
        _id: action.data._id,
        wins: action.data.wins,
        losses: action.data.losses
      };
    case "UPDATE_RECORD":
      console.log(action.data);
      return {
        ...state,
        wins: action.data.wins,
        losses: action.data.losses
      };
    case "LOGOUT":
      return {
        email: "",
        _id: "",
        userName: "",
        wins: 0,
        losses: 0,
        accuracy: 0,
        lastGame: { users: ["", ""], gameId: "" }
      };
    default:
      return state;
  }
};

export default userReducer;
