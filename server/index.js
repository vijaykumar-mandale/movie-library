import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movie.js";
const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

// Function to serve all static files
// inside public directory.
app.use(express.static("public"));

// Routes
app.use("/api/v1", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
