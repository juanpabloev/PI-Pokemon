const express = require("express");
const { getTypes } = require("../Controllers/TypesController.js");

const typesRouter = express.Router();

typesRouter.get("/", async (req, res) => {
  try {
    const types = await getTypes();
    res.status(200).send(types);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = typesRouter;
