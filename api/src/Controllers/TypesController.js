const { Type } = require("../db.js");
const axios = require("axios");

const getTypes = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/type");
  const typeArray = response.data.results;

  for (let i = 0; i < typeArray.length; i++) {
    const type = await Type.findOrCreate({
      where: { name: typeArray[i].name },
    });
  }
  let allTypes = Type.findAll();

  return allTypes;
};

module.exports = {
  getTypes,
};
