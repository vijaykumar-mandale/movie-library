import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/MainContext";

const API_PATH = process.env.REACT_APP_API_PATH;
const movieAPI = `${API_PATH}movie`;

const AddMovie = () => {
  const navigate = useNavigate();
  const { setAction } = useGlobalContext();

  const [input, setInput] = useState({
    name: "",
    released: "",
    genre: "",
    director: "",
    actors: "",
    details: "",
  });

  const [file, setFile] = useState([]);

  const formdata = new FormData();

  formdata.append("name", input.name);
  formdata.append("released", input.released);
  formdata.append("genre", input.genre);
  formdata.append("director", input.director);
  formdata.append("actors", input.actors);
  formdata.append("details", input.details);
  formdata.append("photo", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${movieAPI}`, formdata);
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

  return (
    <div className="container flex items-center justify-content-center custom-form-section">
      <h2
        className="text-center text-white p-2 m-2"
        style={{ backgroundColor: "blue" }}
      >
        Add New Movie
      </h2>

      <form className="p-2 m-2 needs-validation" onSubmit={handleSubmit}>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Movie Name"
              value={input.name}
              name="name"
              required
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="released">Released Date</label>
            <input
              type="date"
              className="form-control"
              id="released"
              value={input.released}
              name="released"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              placeholder="Enter genre"
              value={input.genre}
              name="genre"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="director">Director</label>
            <input
              type="text"
              className="form-control"
              id="director"
              placeholder="Enter director"
              value={input.director}
              name="director"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label htmlFor="actors">Actors</label>
            <input
              type="text"
              className="form-control"
              id="actors"
              placeholder="Enter actors"
              value={input.actors}
              name="actors"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="details">Details</label>
            <input
              type="text"
              className="form-control"
              id="details"
              placeholder="Enter details"
              value={input.details}
              name="details"
              onChange={(e) =>
                setInput({ ...input, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-6">
            <label>Photo</label>
            <input
              type="file"
              name="photo"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group m-3 row">
          <div className="col-sm-4">
            <button type="submit" className="btn btn-success btn-lg">
              Submit
            </button>
            <Link to={"/"} className="action-btn">
              <button className="btn btn-danger m-3 btn-lg">Cancel</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
