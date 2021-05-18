import pets from "../utils/petHelper";

const gameReducer = (state, action) => {
  const areSquaresOccupied = index => {
    const currentAnimal = state.player.pets[state.petIndexToPlace];
    for (let i = 0; i < currentAnimal.length; i++) {
      if (currentAnimal.horizontal) {
        if (index + i > 99) {
          return false;
        }
        if (state.player.field[index + i].contents !== 99) {
          return false;
        }
      } else {
        if (index + i * 10 > 99) {
          return false;
        }
        if (state.player.field[index + i * 10].contents !== 99) {
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
          contents: state.petIndexToPlace
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

  // const setOppHover = (index, color) => {
  //   const newField = state.player.field.map((field, i) => {
  //     if (index === i) {
  //       return {
  //         ...field,
  //         status: color
  //       };
  //     }
  //     return field;
  //   });
  //   return newField;
  // };

  const applyAttack = (index, which) => {
    const newField = state[which].field.map((field, i) => {
      if (index === i) {
        return {
          ...field,
          hit: true
        };
      }
      return field;
    });
    return newField;
  };

  const adjustHealth = (data, which) => {
    const newPets = state[which].pets.map((pet, i) => {
      if (i === state[which].field[data.index].contents) {
        return {
          ...pet,
          remainingHealth: data.remainingHealth - 1
        };
      }
      return pet;
    });
    return newPets;
  };

  const checkStatus = () => {
    const opponentHealth = state.opponent.pets.reduce((a, b) => {
      return a + b.remainingHealth;
    }, 0);
    const playerHealth = state.player.pets.reduce((a, b) => {
      return a + b.remainingHealth;
    }, 0);
    console.log(playerHealth, opponentHealth);
    if (playerHealth === 1) {
      return "lose";
    } else if (opponentHealth === 1) {
      return "win";
    } else {
      return "ready";
    }
  };

  switch (action.type) {
    case "CHANGE_PET_TYPE":
      return {
        ...state,
        player: {
          ...state.player,
          petType: action.data,
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

          gamePhase: "waiting",
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
      if (placementAllowed(action.data) && state.gamePhase === "setup") {
        return {
          ...state,
          player: {
            ...state.player,
            field: setHover(action.data, "#19c3f1")
          }
        };
      }
      return state;
    case "CLEAR_HOVER":
      if (placementAllowed(action.data) && state.gamePhase === "setup") {
        return {
          ...state,
          player: {
            ...state.player,
            field: setHover(action.data, "white")
          }
        };
      }
      return state;
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
      console.log("player ready reducer");
      return {
        ...state,
        gamePhase: "ready"
      };
    case "OPPONENT_READY":
      console.log("opponent ready", state);
      return {
        ...state,
        opponentStatus: "ready",
        opponent: {
          ...state.opponent,
          field: action.data.player.field,
          pets: action.data.player.pets,
          petType: action.data.player.petType
        }
      };
    case "PLAYER_HIT":
      return {
        ...state,
        message: action.message,
        playerTurn: true,
        gamePhase: checkStatus(),
        opponent: {
          ...state.opponent,
          field: applyAttack(action.data.index, "opponent"),
          pets: adjustHealth(action.data, "opponent")
        }
      };
    case "PLAYER_MISS":
      return {
        ...state,
        playerTurn: false,
        message: action.message,
        opponent: {
          ...state.opponent,
          field: applyAttack(action.data.index, "opponent")
        }
      };
    case "OPPONENT_HIT":
      return {
        ...state,
        message: action.message,
        gamePhase: checkStatus(),
        playerTurn: false,
        player: {
          ...state.player,
          field: applyAttack(action.data.index, "player"),
          pets: adjustHealth(action.data, "player")
        }
      };
    case "OPPONENT_MISS":
      return {
        ...state,
        message: action.message,
        playerTurn: true,
        player: {
          ...state.player,
          field: applyAttack(action.data.index, "player")
        }
      };
    default:
      return state;
  }
};

export default gameReducer;
