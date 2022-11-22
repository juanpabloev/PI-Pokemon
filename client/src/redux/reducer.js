import {
  ERROR,
  GET_POKEMONS,
  GET_TYPES,
  FILTER_BY_CREATION,
  FILTER_BY_TYPE,
  REFRESH,
  SORT_BY_ATK,
  SORT_ALPHA,
  GET_POKEMON_NAME,
  CREATE_POKEMON,
  GET_DETAILS,
} from "./actions";

const initialState = {
  totalPokemons: [],
  pokemons: [],
  types: [],
  details: {},
  error: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        totalPokemons: action.payload,
      };
    case FILTER_BY_CREATION:
      const statePokemonsMade = state.pokemons;
      let filteredPokemonMade;
      if (action.payload === "made") {
        filteredPokemonMade = statePokemonsMade.filter((pokemon) =>
          /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
            pokemon.id
          )
        );
      } else {
        filteredPokemonMade = statePokemonsMade.filter(
          (pokemon) =>
            !/^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
              pokemon.id
            )
        );
      }
      return {
        ...state,
        pokemons: filteredPokemonMade,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case CREATE_POKEMON:
      return {
        ...state,
        totalPokemons: [...state.totalPokemons, action.payload],
      };
    case FILTER_BY_TYPE:
      const statePokemonsType = state.pokemons;
      const filteredPokemonType1 = statePokemonsType.filter(
        (pokemon) => pokemon.types[0] === action.payload
      );
      const filteredPokemonType2 = statePokemonsType.filter(
        (pokemon) => pokemon.types[1] === action.payload
      );
      return {
        ...state,
        pokemons: [...filteredPokemonType1, ...filteredPokemonType2],
      };
    case REFRESH:
      return {
        ...state,
        pokemons: state.totalPokemons,
      };
    case SORT_BY_ATK:
      let sortedByAtk = state.pokemons;
      if (action.payload === "asc") {
        sortedByAtk = state.pokemons.sort((a, b) => {
          if (a.atk < b.atk) return -1;
          if (a.atk > b.atk) return 1;
          return 0;
        });
      } else {
        sortedByAtk = state.pokemons.sort((a, b) => {
          if (a.atk > b.atk) return -1;
          if (a.atk < b.atk) return 1;
          return 0;
        });
      }
      return {
        ...state,
        pokemons: sortedByAtk,
      };
    case SORT_ALPHA:
      let sortedByAlpha = [...state.pokemons];
      if (action.payload !== "atoz") {
        sortedByAlpha = state.pokemons.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      } else {
        sortedByAlpha = state.pokemons.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      return {
        ...state,
        pokemons: sortedByAlpha,
      };
    case GET_POKEMON_NAME:
      return {
        ...state,
        pokemons: [action.payload],
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
