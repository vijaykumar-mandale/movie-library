import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const API_PATH = process.env.REACT_APP_API_PATH;
const moviesAPI = `${API_PATH}movies`;
const AppContext = React.createContext();
// provider func
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("");
  const [action, setAction] = useState(false);

  const getMovies = async (url) => {
    try {
      const res = await axios.get(url);
      const data = res.data;
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({
          show: false,
          msg: "",
        });
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
        setMovie([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      if (query) {
        getMovies(`${moviesAPI}/${query}`);
        setAction(false);
      } else {
        getMovies(`${moviesAPI}`);
        setAction(false);
      }
    }, 500);

    return () => clearTimeout(timerOut);
  }, [query, action]);
  return (
    <AppContext.Provider
      value={{ isLoading, isError, movie, query, setQuery, action, setAction }}
    >
      {children}
    </AppContext.Provider>
  );
};

// global custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
