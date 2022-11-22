const express = require("express");
const {
  getApiPokemonData,
  getPokemonByIdApi,
  getPokemonByIdDb,
  getPokemonByName,
  getPokemonByNameDB,
  createPokemon,
} = require("../Controllers/PokemonController.js");

const pokemonRouter = express.Router();

pokemonRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let pokemonNamed = await getPokemonByNameDB(name);

      if (Object.keys(pokemonNamed).length <= 0) {
        pokemonNamed = await getPokemonByName(name);
      }

      if (Object.keys(pokemonNamed).length > 0) {
        return res.status(200).send(pokemonNamed);
      }
      return res.status(404).send({ error: `Pokemon ${name} not found` });
    }
    const data = await getApiPokemonData();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let pokemonFound;
    if (
      /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
        id
      )
    ) {
      pokemonFound = await getPokemonByIdDb(id);
    } else {
      pokemonFound = await getPokemonByIdApi(id);
    }
    //-------------------------------------------------------------------------------------------------------
    if (pokemonFound) {
      return res.status(200).send(pokemonFound);
    }
    res.status(404).send({ error: "Pokemon not found" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

pokemonRouter.post("/", async (req, res) => {
  try {
    const { name, hp, atk, def, spd, height, weight, types } = req.body;
    if (!name) {
      return res.status(400).send({ error: "name is missing" });
    }
    const newPokemon = await createPokemon(
      name,
      hp,
      atk,
      def,
      spd,
      height,
      weight,
      types
    );
    res.status(200).send(newPokemon);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = pokemonRouter;
