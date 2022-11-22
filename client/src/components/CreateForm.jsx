import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createPokemon } from "../redux/actions";
import "./CreateFrom.css";
const validate = (input) => {
  const err = {};

  if (!input.name) {
    err.nameError = "name is required";
  }

  if (input.height < 0.1 || input.height > 1000) {
    err.valueError = "height  must be between  0.1 and 1000";
  }
  if (input.weight < 0.1 || input.weight > 1000) {
    err.valueError = "height  must be between  0.1 and 1000";
  }

  if (input.hp < 1 || input.atk < 1 || input.spd < 1 || input.def < 1) {
    err.valueError = "values of any stat must be above 0";
  }

  return err;
};

const CreateForm = () => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "name",
    hp: 1,
    atk: 1,
    spd: 1,
    def: 1,
    weight: 0.1,
    height: 0.1,

    types: [types[0].id, "none"],
  });

  const [name, setName] = useState([types[0].name, ""]);

  const handleChange = (e) => {
    e.preventDefault();

    setInput((inp) => {
      const newInput = {
        ...inp,
        [e.target.name]: e.target.value,
      };

      const errors = validate(newInput);
      setError(errors);

      return newInput;
    });
  };

  const handleTypes = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (e.target.name === "type1") {
      if (!value) {
        setError({ ...error, typeError: "type 1 is required" });
      }
      setInput({
        ...input,
        types: [value, input.types[1]],
      });
      setName([types.find((type) => type.id === value).name, name[1]]);
    }
    if (e.target.name === "type2") {
      if (value === input.types[0]) {
        value = "";
      }
      setInput({
        ...input,
        types: [input.types[0], value],
      });
      setName([name[0], types.find((type) => type.id === value).name]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.keys(error).length) {
      dispatch(createPokemon(input, name));
    }
  };

  return (
    <section className="sectionForm">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <label htmlFor="name">name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          defaultValue="name.."
        />
        <hr />
        <label htmlFor="weight">weight:</label>
        <input
          type="number"
          name="weight"
          min="0.1"
          defaultValue="0.1"
          step="any"
          onChange={(e) => handleChange(e)}
        />
        <hr />
        <label htmlFor="height">height:</label>
        <input
          type="number"
          name="height"
          min="0.1"
          defaultValue="0.1"
          step="any"
          onChange={(e) => handleChange(e)}
        />
        <hr />
        <label htmlFor="hp">hp:</label>
        <input
          type="number"
          name="hp"
          min="1"
          defaultValue="1"
          onChange={(e) => handleChange(e)}
        />
        <hr />
        <label htmlFor="atk">atk:</label>
        <input
          type="number"
          name="atk"
          min="1"
          defaultValue="1"
          onChange={(e) => handleChange(e)}
        />
        <hr />
        <label htmlFor="def">def:</label>
        <input
          type="number"
          name="def"
          min="1"
          defaultValue="1"
          onChange={(e) => handleChange(e)}
        />
        <hr />
        <label htmlFor="spd">spd:</label>
        <input
          type="number"
          name="spd"
          min="1"
          defaultValue="1"
          onChange={(e) => handleChange(e)}
        />
        <hr />
        <label htmlFor="type1">type1:</label>
        <select name="type1" onChange={(e) => handleTypes(e)}>
          {types.map((type) => {
            return (
              <option value={type.id} key={type.name}>
                {type.name}
              </option>
            );
          })}
        </select>
        <hr />
        <label htmlFor="type2">type2:</label>
        <select name="type2" onChange={(e) => handleTypes(e)}>
          <option value="none" key={"none"}>
            none
          </option>
          {types.map((type) => {
            return (
              <option value={type.id} key={type.name}>
                {type.name}
              </option>
            );
          })}
        </select>
        <hr />
        <button type="submit">submit</button>
      </form>

      {error ? (
        <ul>
          {Object.values(error).map((value) => {
            return <li key={value}>{value}</li>;
          })}
        </ul>
      ) : (
        <></>
      )}
    </section>
  );
};

export default CreateForm;
