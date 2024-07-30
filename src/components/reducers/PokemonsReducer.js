export const PokemonsReducer = (state = [], action) => {
  switch (action.type) {
      case "add":
          return [...state, action.payload];
      case "remove":
          return state.filter(pokemon => pokemon.name !== action.payload.name);
      default:
        return state;
  }
}
