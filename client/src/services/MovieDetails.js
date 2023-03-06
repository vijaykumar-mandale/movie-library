import { useState, useEffect } from "react";
import axios from "axios";

// setting the api link
const API_PATH = process.env.REACT_APP_API_PATH;
const movieDetailsAPI = `${API_PATH}movie/`;

const MovieDetails = (apiParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" });
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      const data = res.data;

      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search || data);
        setIsError({ show: "false", msg: "" });
      } else {
        setIsError({ show: "true", msg: data.Error });
        setMovie(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovie(`${movieDetailsAPI}${apiParams}`);
    }, 1000);
    console.log("set");
    return () => {
      clearTimeout(timeOut);
      console.log("clear");
    };
  }, [apiParams]);

  return { isLoading, isError, movie };
};

export default MovieDetails;
