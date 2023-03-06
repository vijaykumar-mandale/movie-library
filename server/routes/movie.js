import express from "express";
import movieController from "../controllers/movie.js";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/movies", movieController.getAllMovies);
router.get("/movies/:name", movieController.searchMovies);
router.get("/movie/:id", movieController.getMovieDetail);
router.post("/movie", upload.single("photo"), movieController.addNewMovie);
router.put("/movie/:id", upload.single("photo"), movieController.updateMovie);
router.delete("/movie/:id", movieController.deleteMovie);

export default router;
