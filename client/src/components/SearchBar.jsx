import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamedPokemon } from "../redux/actions";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchPokemon, setSearchPokemon] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    e.preventDefault();
    setSearchPokemon(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getNamedPokemon(searchPokemon));
    setSearchPokemon("");
  };
  return (
    <div className="searchbar">
      <input type="text" name="pokeName" onChange={(e) => handleChange(e)} />
      <button type="submit" onClick={(e) => handleSearch(e)}>
        Search
      </button>
      <Link to="/create">
        <button>Create your own</button>
      </Link>
    </div>
  );
};

export default SearchBar;
