import { useNavigate, NavLink, useParams } from "react-router-dom";
import MovieDetails from "../services/MovieDetails";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useGlobalContext } from "../context/MainContext";

const SERVER_PATH = process.env.REACT_APP_SERVER_PATH;
const API_PATH = process.env.REACT_APP_API_PATH;
const movieAPI = `${API_PATH}movie/`;

const SingleMovie = () => {
  const navigate = useNavigate();
  const { setAction } = useGlobalContext();

  const { id } = useParams();

  const { isLoading, movie } = MovieDetails(`${id}`);

  // Delete a Movie
  const movieDelete = async (id) => {
    try {
      const res = await axios.delete(`${movieAPI}${id}`);
      const data = res.data;
      if (data.Response === "True") {
        setAction(true);
        alert(data.Message);
        navigate("/");
      } else {
        alert(data.Error);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete a movie.",
      buttons: [
        {
          label: "Yes",
          onClick: () => movieDelete(id),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={`${SERVER_PATH}${movie.photo}`} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.name}</p>
          <p className=""></p>
          <p className="card-text">
            <span className="card-text-label">Released:</span> {movie.released}
          </p>
          <p className="card-text">
            <span className="card-text-label">Genre:</span> {movie.genre}
          </p>
          <p className="card-text">
            <span className="card-text-label">Director:</span> {movie.director}
          </p>
          <p className="card-text">
            <span className="card-text-label">Actors:</span> {movie.actors}
          </p>
          <p className="card-text">
            <span className="card-text-label">Details:</span> {movie.details}
          </p>
          <div className="form-group m-3 row">
            <div className="col-sm-4">
              <NavLink to="/" className="action-btn">
                <button className="btn btn-secondary btn-lg">
                  <i className="fa fa-arrow-left" />
                  &nbsp; Go Back
                </button>
              </NavLink>
            </div>
            <div className="col-sm-4">
              <NavLink to={`/edit/${movie.id}`} className="action-btn">
                <button className="btn btn-success btn-lg">
                  <i className="fa fa-pencil" />
                  &nbsp; Edit Movie
                </button>
              </NavLink>
            </div>
            <div className="col-sm-4">
              <button
                onClick={() => handleDelete(movie.id)}
                type="submit"
                className="btn btn-danger btn-lg"
              >
                <i className="fa fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
