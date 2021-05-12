import pets from "../utils/petHelper";

const gameReducer = (state, action) => {
  const areSquaresOccupied = index => {
    const currentAnimal = state.player.pets[state.petIndexToPlace];
    for (let i = 0; i < currentAnimal.length; i++) {
      if (currentAnimal.horizontal) {
        if (index + i > 99) {
          return false;
        }
        if (state.player.field[index + i].contents) {
          return false;
        }
      } else {
        if (index + i * 10 > 99) {
          return false;
        }
        if (state.player.field[index + i * 10].contents) {
          return false;
        }
      }
    }
    return true;
  };

  const willPieceFitOnBoard = index => {
    const currentAnimal = state.player.pets[state.petIndexToPlace];
    return (
      (currentAnimal.horizontal &&
        index % 10 < (index + currentAnimal.length - 1) % 10) ||
      (!currentAnimal.horizontal &&
        index + (currentAnimal.length - 1) * 10 < 100)
    );
  };

  const placementAllowed = index => {
    return areSquaresOccupied(index) && willPieceFitOnBoard(index);
  };

  const placePieces = index => {
    const currentAnimal = state.player.pets[state.petIndexToPlace];
    let tileArray = [];
    for (let i = 0; i < currentAnimal.length; i++) {
      currentAnimal.horizontal
        ? tileArray.push(index + i)
        : tileArray.push(index + 10 * i);
    }
    const newField = state.player.field.map((field, i) => {
      if (tileArray.includes(i)) {
        return {
          ...field,
          status: "white",
          contents: currentAnimal.name
        };
      }
      return field;
    });
    return newField;
  };

  const setHover = (index, color) => {
    const currentAnimal = state.player.pets[state.petIndexToPlace];
    let tileArray = [];
    for (let i = 0; i < currentAnimal.length; i++) {
      currentAnimal.horizontal
        ? tileArray.push(index + i)
        : tileArray.push(index + 10 * i);
    }
    const newField = state.player.field.map((field, i) => {
      if (tileArray.includes(i)) {
        return {
          ...field,
          status: color
        };
      }
      return field;
    });
    return newField;
  };

  switch (action.type) {
    case "CHANGE_PET_TYPE":
      return {
        ...state,
        player: {
          ...state.player,
          pets: pets[action.data]
        }
        //playerPets: pets[action.data]
      };
    case "PLACE_PET":
      if (placementAllowed(action.data) && state.petIndexToPlace > 0) {
        return {
          ...state,
          petIndexToPlace: state.petIndexToPlace - 1,
          player: {
            ...state.player,
            field: placePieces(action.data),
            pets: state.player.pets.map((pet, i) => {
              if (state.petIndexToPlace === i) {
                return {
                  ...pet,
                  position: action.data
                };
              }
              return pet;
            })
          }
        };
      } else if (
        placementAllowed(action.data) &&
        state.petIndexToPlace === 0 &&
        state.gamePhase === "setup"
      ) {
        return {
          ...state,

          gamePhase: "ready",
          player: {
            ...state.player,
            field: placePieces(action.data),
            pets: state.player.pets.map((pet, i) => {
              if (state.petIndexToPlace === i) {
                return {
                  ...pet,
                  position: action.data
                };
              }
              return pet;
            })
          }
        };
      }
      return state;
    case "ROTATE_PET":
      return {
        ...state,
        player: {
          ...state.player,
          pets: state.player.pets.map((pet, i) => {
            if (state.petIndexToPlace === i) {
              return {
                ...pet,
                horizontal: !pet.horizontal
              };
            }
            return pet;
          })
        }
      };
    case "SET_HOVER":
      if (placementAllowed(action.data)) {
        return {
          ...state,
          player: {
            ...state.player,
            field: setHover(action.data, "green")
          }
        };
      }
      return state;
    case "CLEAR_HOVER":
      if (placementAllowed(action.data)) {
        return {
          ...state,
          player: {
            ...state.player,
            field: setHover(action.data, "white")
          }
        };
      }
      return state;
    case "LOAD_OPPONENT":
      console.log(action.data);
      return {
        ...state,
        opponent: {
          field: action.data.player.field,
          pets: action.data.player.pets
        }
      };
    case "CHALLENGE_ACCEPTED":
      console.log(action.data);
      return {
        ...state,
        users: [action.data.challenger.userId, action.data.defender.userId],
        playerTurn: false,
        gameId: action.data.gameId,
        gamePhase: "setup",
        opponentStatus: "setup",
        opponent: {
          ...state.opponent,
          userName: action.data.challenger.userName,
          userId: action.data.challenger.userId
        },
        player: {
          ...state.player,
          userName: action.data.defender.userName,
          userId: action.data.defender.userId
        }
      };
    case "INVITE_ACCEPTED":
      console.log("invite accepted reducer hit");
      return {
        ...state,
        users: [action.data.challenger.userId, action.data.defender.userId],
        playerTurn: true,
        gameId: action.data.gameId,
        gamePhase: "setup",
        opponentStatus: "setup",
        opponent: {
          ...state.opponent,
          userName: action.data.defender.userName,
          userId: action.data.defender.userId
        },
        player: {
          ...state.player,
          userName: action.data.challenger.userName,
          userId: action.data.challenger.userId
        }
      };
    case "PLAYER_READY":
      return {
        ...state,
        gamePhase: "ready"
      };
    case "OPPONENT_READY":
      return {
        ...state,
        opponentStatus: "ready"
      };
    default:
      return state;
  }
};

export default gameReducer;
