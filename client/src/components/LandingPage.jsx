import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="pokemonBackground">
      <Link to={"/home"}>
        <button className="letsGo">Let's catch them all</button>
      </Link>
    </div>
  );
};

export default LandingPage;
