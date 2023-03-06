import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/MainContext";

const SERVER_PATH = process.env.REACT_APP_SERVER_PATH;

const Movies = () => {
  const { movie, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <section className=" ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <>
      <section className="movie-page">
        <div className="container grid grid-4-col">
          {movie.map((curMovie) => {
            const { id, name, photo } = curMovie;
            const movieName = name.substring(0, 15);
            return (
              <NavLink to={`movie/${id}`} key={id}>
                <div className="card">
                  <div className="card-info">
                    <h2>
                      {movieName.length >= 15 ? `${movieName}...` : movieName}
                    </h2>
                    <img src={`${SERVER_PATH}${photo}`} alt={id} />
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Movies;
