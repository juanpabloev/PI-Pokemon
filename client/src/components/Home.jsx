import React from "react";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getTypes,
  filterByCreation,
  filterByType,
  refresh,
  sortByAtk,
  sortAlpha,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Pokemon from "./Pokemon";
import Pages from "./Pages";
import "./Home.css";
let typekey = 0;

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);

  const [currentorder, setCurrentOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(12);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);

  const indexLastPokemon = currentPage * pokemonPerPage;
  const indexFirstPokemon = indexLastPokemon - pokemonPerPage;
  const currentPokemons = pokemons.slice(indexFirstPokemon, indexLastPokemon);

  const changePage = (number) => {
    setCurrentPage(number);
  };

  const handleOriginFilter = (e) => {
    e.preventDefault();
    dispatch(filterByCreation(e.target.value));
    setCurrentPage(1);
  };
  const handleTypeFilter = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  };
  const handleRefresh = () => {
    dispatch(refresh());
    setCurrentPage(1);
  };
  const handleAtkSort = (e) => {
    e.preventDefault();
    dispatch(sortByAtk(e.target.value));
    setCurrentPage(1);
    setCurrentOrder(` ${e.target.value}`);
  };
  const handleAlphaSort = (e) => {
    e.preventDefault();
    dispatch(sortAlpha(e.target.value));
    setCurrentPage(1);
    setCurrentOrder(` ${e.target.value}`);
  };
  return (
    <section className="home">
      <SearchBar />
      <div className="searchFilter">
        <label>Sort:</label>
        <select name="alphabetical" onChange={(e) => handleAlphaSort(e)}>
          <option>Alphabetical:</option>
          <option value="atoz">A to Z</option>
          <option value="ztoa">Z to A</option>
        </select>
        <select name="atack" onChange={(e) => handleAtkSort(e)}>
          <option>Atk:</option>
          <option value="asc"> Min to Max</option>
          <option value="desc"> Max to Min</option>
        </select>
        <br />
        <label>Filter:</label>
        <select name="origin" onChange={(e) => handleOriginFilter(e)}>
          <option>Origin:</option>
          <option value="api">Api</option>
          <option value="made">Created manualy</option>
        </select>
        <select name="types" onChange={(e) => handleTypeFilter(e)}>
          <option>Type:</option>
          {types.map((type) => {
            typekey++;
            return (
              <option value={type.name} key={typekey}>
                {type.name}
              </option>
            );
          })}
        </select>
        <button onClick={() => handleRefresh()}>Clear Filters</button>
      </div>
      <div>
        <Pages
          pokemonPerPage={pokemonPerPage}
          totalPokemons={pokemons.length}
          changePage={changePage}
        />
        <div className="Allpokemons">
          {currentPokemons.map((pokemon) => {
            return (
              <Link
                className="pokemon"
                key={pokemon.id}
                to={`/pokemon/${pokemon.id}`}
              >
                <Pokemon
                  name={pokemon.name}
                  img={pokemon.img}
                  types={pokemon.types}
                />
              </Link>
            );
          })}
        </div>
        <Pages
          pokemonPerPage={pokemonPerPage}
          totalPokemons={pokemons.length}
          changePage={changePage}
        />
      </div>
    </section>
  );
};

export default Home;
