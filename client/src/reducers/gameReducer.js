import pets from "../utils/petHelper";

const gameReducer = (state, action) => {
  const areSquaresOccupied = index => {
    const currentAnimal = state.playerPets[state.petIndexToPlace];
    for (let i = 0; i < currentAnimal.length; i++) {
      if (currentAnimal.horizontal) {
        if (state.playerField[index + i].contents) {
          return false;
        }
      } else {
        if (state.playerField[index + i * 10].contents) {
          return false;
        }
      }
    }
    return true;
  };

  const willPieceFitOnBoard = index => {
    const currentAnimal = state.playerPets[state.petIndexToPlace];
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
    const currentAnimal = state.playerPets[state.petIndexToPlace];
    let tileArray = [];
    for (let i = 0; i < currentAnimal.length; i++) {
      currentAnimal.horizontal
        ? tileArray.push(index + i)
        : tileArray.push(index + 10 * i);
    }
    const newField = state.playerField.map((field, i) => {
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
    const currentAnimal = state.playerPets[state.petIndexToPlace];
    let tileArray = [];
    for (let i = 0; i < currentAnimal.length; i++) {
      currentAnimal.horizontal
        ? tileArray.push(index + i)
        : tileArray.push(index + 10 * i);
    }
    const newField = state.playerField.map((field, i) => {
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
        playerPets: pets[action.data]
      };
    case "PLACE_PET":
      if (placementAllowed(action.data) && state.petIndexToPlace > 0) {
        return {
          ...state,
          playerField: placePieces(action.data),
          petIndexToPlace: state.petIndexToPlace - 1,
          playerPets: state.playerPets.map((pet, i) => {
            if (state.petIndexToPlace === i) {
              return {
                ...pet,
                position: action.data
              };
            }
            return pet;
          })
        };
      } else if (
        placementAllowed(action.data) &&
        state.petIndexToPlace === 0 &&
        state.gameState === "Setup"
      ) {
        return {
          ...state,
          playerField: placePieces(action.data),
          gameState: "Ready",
          playerPets: state.playerPets.map((pet, i) => {
            if (state.petIndexToPlace === i) {
              return {
                ...pet,
                position: action.data
              };
            }
            return pet;
          })
        };
      }
    case "ROTATE_PET":
      return {
        ...state,
        playerPets: state.playerPets.map((pet, i) => {
          if (state.petIndexToPlace === i) {
            return {
              ...pet,
              horizontal: !pet.horizontal
            };
          }
          return pet;
        })
      };
    case "SET_HOVER":
      if (placementAllowed(action.data)) {
        return {
          ...state,
          playerField: setHover(action.data, "green")
        };
      }
      return state;
    case "CLEAR_HOVER":
      if (placementAllowed(action.data)) {
        return {
          ...state,
          playerField: setHover(action.data, "white")
        };
      }
      return state;
    case "LOAD_OPPONENT":
      return {
        ...state,
        opponentField: action.data.playerField,
        opponentPets: action.data.playerPets
      };

    default:
      return state;
  }
};

export default gameReducer;
