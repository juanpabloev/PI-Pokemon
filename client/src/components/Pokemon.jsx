import React from "react";

const Pokemon = ({ img, name, types }) => {
  if (!img)
    img =
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FTJbobo_pokemon-egg-png-transparent-png%2F&psig=AOvVaw1TfYz2OWIKl7HCAGYFi5Dd&ust=1669237699765000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCLjriJPZwvsCFQAAAAAdAAAAABAE";
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
