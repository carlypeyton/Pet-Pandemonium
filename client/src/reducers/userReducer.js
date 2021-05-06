const userReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        email: action.data.email
      };
    case "CREATE_USER":
      return {
        ...state,
        email: action.data.email
      };
    default:
      return state;
  }
};

export default userReducer;
