const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const { Op } = require("sequelize");

const getApiPokemonData = async () => {
  const apiPokemons = [];
  const response = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=40"
  );

  const pokemonUrls = response.data.results;

  for (let i = 0; i < pokemonUrls.length; i++) {
    const response = await axios.get(pokemonUrls[i].url);
    const data = response.data;
    const pokemonInfo = {
      id: data.id,
      name: data.name,
      img: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((slot) => {
        return slot.type.name;
      }),
      atk: data.stats[1].base_stat,
    };
    apiPokemons.push(pokemonInfo);
  }
  const arrayPokemonsDb = await Pokemon.findAll({
    include: {
      attributes: ["name"],
      model: Type,
      through: {
        attributes: [],
      },
    },
  });

  return apiPokemons.concat(arrayPokemonsDb);
};

const getPokemonByIdApi = async (id) => {
  const response = await await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const data = response.data;
  const pokemon = {
    id: data.id,
    name: data.name,
    img: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((slot) => {
      return slot.type.name;
    }),
    hp: data.stats[0].base_stat,
    atk: data.stats[1].base_stat,
    def: data.stats[2].base_stat,
    spd: data.stats[5].base_stat,
    weight: data.weight,
    height: data.height,
  };
  return pokemon;
};
const getPokemonByIdDb = async (id) => {
  const foundPokemon = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return foundPokemon;
};

const getPokemonByName = async (pokemonName) => {
  try {
    let pokemon;

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = response.data;
    pokemon = {
      id: data.id,
      name: data.name,
      img: data.sprites.other["official-artwork"].front_default,
      types: data.types.map((slot) => {
        return slot.type.name;
      }),
      atk: data.stats[0].base_stat,
    };
    return pokemon;
  } catch (error) {
    return [];
  }
};

const getPokemonByNameDB = async (name) => {
  try {
    let pokemon;
    const pokemonDb = await Pokemon.findOne({
      where: {
        name: name,
      },
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (Object.keys(pokemonDb).length > 0) {
      pokemon = {
        id: pokemonDb.id,
        atk: pokemonDb.atk,
        name: pokemonDb.name,
        types: pokemonDb.types.map((type) => type.name),
      };
    }
    return pokemon;
  } catch (error) {
    return error;
  }
};

const createPokemon = async (
  name,
  hp,
  atk,
  def,
  spd,
  height,
  weight,
  types
) => {
  const newPokemon = await Pokemon.create({
    name,
    hp,
    atk,
    def,
    spd,
    height,
    weight,
  });
  newPokemon.addTypes(types);
  return newPokemon;
};

module.exports = {
  getApiPokemonData,
  getPokemonByIdApi,
  getPokemonByIdDb,
  getPokemonByName,
  getPokemonByNameDB,
  createPokemon,
};
