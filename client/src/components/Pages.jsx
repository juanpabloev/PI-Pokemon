import React from "react";

const Pages = ({ pokemonPerPage, totalPokemons, changePage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((page) => {
          return (
            <li key={page}>
              <button onClick={() => changePage(page)}>{page}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pages;
