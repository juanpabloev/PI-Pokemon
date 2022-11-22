import React from "react";

const Pokemon = ({ img, name, types }) => {
  if (!img) img = "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif";
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
