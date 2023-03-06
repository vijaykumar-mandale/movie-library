import React from "react";
import Movies from "./Movies";
import Search from "./Search";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div data-testid="myhome">
        <Search />
        <NavLink to={"/add"} className="action-btn">
          <button className="btn btn-primary btn-lg">
            <i className="fa fa-film" />
            &nbsp; Add Movie
          </button>
        </NavLink>

        <Movies />
      </div>
    </>
  );
};

export default Home;
