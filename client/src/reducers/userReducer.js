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
    default:
      return state;
  }
};

export default userReducer;
