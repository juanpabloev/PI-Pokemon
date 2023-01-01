import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const ERROR = "ERROR";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_CREATION = "FILTER_BY_CREATION";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const REFRESH = "REFRESH";
export const SORT_BY_ATK = "SORT_BY_ATK";
export const SORT_ALPHA = "SORT_ALPHA";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_DETAILS = "GET_DETAILS";
export const ABOVE_905 = "ABOVE_905";

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons`);
      const pokemon = response.data;
      dispatch({ type: GET_POKEMONS, payload: pokemon });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/types`);
      const types = response.data;
      dispatch({ type: GET_TYPES, payload: types });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const filterByCreation = (payload) => {
  return {
    type: FILTER_BY_CREATION,
    payload,
  };
};

export const filterByType = (payload) => {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
};

export const filterAbove905 = () => {
  return {
    type: ABOVE_905,
  };
};

export const refresh = () => {
  return {
    type: REFRESH,
  };
};

export const sortByAtk = (payload) => {
  return {
    type: SORT_BY_ATK,
    payload,
  };
};

export const sortAlpha = (payload) => {
  return {
    type: SORT_ALPHA,
    payload,
  };
};

export const getNamedPokemon = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons?name=${name}`
      );
      const pokemon = response.data;
      dispatch({ type: GET_POKEMON_NAME, payload: pokemon });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};

export const createPokemon = (input, name) => {
  return async function (dispatch) {
    try {
      await axios.post(`http://localhost:3001/pokemons`, input);

      input = {
        ...input,
        types: name,
      };
      dispatch({ type: CREATE_POKEMON, payload: input });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};
export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
      const pokemon = response.data;

      dispatch({ type: GET_DETAILS, payload: pokemon });
    } catch (error) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
};
