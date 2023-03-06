import fs from "fs";

// json file with the movies data
var data = fs.readFileSync("movies.json");

var moviesData = JSON.parse(data);
var moviesLength = Object.keys(moviesData).length;
var lastId = 0;
if (moviesLength > 0) {
  var moviesDataDesc = moviesData.sort((a, b) => b.id - a.id);
  lastId = moviesDataDesc[0].id;
}

class movieController {
  // Get all movies
  static getAllMovies = (req, res) => {
    // res.send("Get all Movies");
    if (moviesLength > 0) {
      return res.status(200).json({ Response: "True", Search: moviesData });
    } else {
      return res
        .status(200)
        .json({ Response: "False", Error: "Movie not found!" });
    }
  };

  // Get search movies by name
  static searchMovies = (req, res) => {
    const searchName = req.params.name;
    // res.send("get movie search");
    var filtered = moviesData.filter((obj) =>
      obj.name.toLowerCase().includes(searchName)
    );
    if (Object.keys(filtered).length > 0) {
      return res.status(200).json({ Response: "True", Search: filtered });
    } else {
      return res
        .status(200)
        .json({ Response: "False", Error: "Movie not found!" });
    }
  };

  // Get movie single details
  static getMovieDetail = async (req, res) => {
    const id = req.params.id;
    // res.send("get single movie");
    var movieDetails = moviesData.filter((obj) => obj.id == id);
    if (Object.keys(movieDetails).length > 0) {
      return res
        .status(200)
        .json({ Response: "True", Search: movieDetails[0] });
    } else {
      return res
        .status(200)
        .json({ Response: "False", Error: "Movie not found!" });
    }
  };

  // Add new movie
  static addNewMovie = async (req, res) => {
    // res.send("Add new movie");
    const { name, released, genre, director, actors, details } = req.body;
    let photo;
    if (req.file.filename) {
      photo = req.file.filename;
    } else {
      photo = "";
    }

    try {
      if (name) {
        let newMovie = {
          id: lastId + 1,
          name,
          released,
          genre,
          director,
          actors,
          details,
          photo: photo,
        };

        var movieExist = moviesData.filter((obj) => obj.name == name);
        if(movieExist){
          return res
          .status(201)
          .json({ Response: "False", Error: "Movie Already Exists" });
        }else{
        moviesData.push(newMovie);
        var newMovieData = JSON.stringify(moviesData);
        fs.writeFile("movies.json", newMovieData, (err) => {
          // error checking
          if (err) {
            return res.status(200).json({ Response: "False", Error: err });
          } else {
            return res.status(200).json({
              Response: "True",
              Message: "Successfully new movie added",
            });
          }
        });
      }
      } else {
        return res
          .status(200)
          .json({ Response: "False", Error: "Movie Name field is required" });
      }
    } catch (error) {
      return res.status(200).json({ Response: "False", Error: error.message });
    }
  };

  // Update movie
  static updateMovie = async (req, res) => {
    // res.send("Update movie");
    const id = req.params.id;
    const { name, released, genre, director, actors, details } = req.body;
    let photo;
    if (req.file.filename) {
      photo = req.file.filename;
    } else {
      photo = "";
    }

    try {
      if (name) {
        var index = moviesData.findIndex((el) => el.id == id);

        moviesData[index] = {
          ...moviesData[index],
          name,
          released,
          genre,
          director,
          actors,
          details,
          photo: photo,
        };

        var editMovieData = JSON.stringify(moviesData);
        fs.writeFile("movies.json", editMovieData, (err) => {
          // error checking
          if (err) {
            return res.status(200).json({ Response: "False", Error: err });
          } else {
            return res.status(200).json({
              Response: "True",
              Message: "Successfully movie updated",
            });
          }
        });
      } else {
        return res
          .status(200)
          .json({ Response: "False", Error: "Movie Name field is required" });
      }
    } catch (error) {
      return res.status(200).json({ Response: "False", Error: error.message });
    }
  };

  // delete movie
  static deleteMovie = async (req, res) => {
    //  res.send("Delete movie");
    const id = req.params.id;
    try {
      if (id) {
        var isMovieID = moviesData.filter((obj) => obj.id == id);
        if (isMovieID && isMovieID.length > 0) {
          var newMovies = moviesData.filter((obj) => obj.id != id);
          var newMovieData = JSON.stringify(newMovies);
          fs.writeFile("movies.json", newMovieData, (err) => {
            // error checking
            if (err) {
              return res.status(200).json({ Response: "False", Error: err });
            } else {
              return res.status(200).json({
                Response: "True",
                Message: "Movie deleted successfully",
              });
            }
          });
        } else {
          return res
            .status(200)
            .json({ Response: "False", Error: "Movie not exists" });
        }
      } else {
        return res
          .status(200)
          .json({ Response: "False", Error: "Movie ID is required to delete" });
      }
    } catch (error) {
      return res.status(200).json({ Response: "False", Error: error.message });
    }
  };
}

export default movieController;
