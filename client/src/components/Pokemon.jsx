import React from "react";
import eggImage from "../img/egg.png";

const Pokemon = ({ img, name, types }) => {
  if (!img) img = eggImage;
  return (
    <div>
      <img src={img} alt={name} />
      <h3>{name}</h3>
      {!(typeof types[0] === "object") ? (
        <p>
          {types[0] + "  "}
          {types.lenght > 1 || types[1]}
        </p>
      ) : (
        <p>
          {types && types[0].name + "  "}
          {types.lenght > 1 || (types[1] && types[1].name)}
        </p>
      )}
    </div>
  );
};

export default Pokemon;
