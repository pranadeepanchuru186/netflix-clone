import { useEffect, useState } from "react";
import axios from "../axios";

const baseURL = "https://image.tmdb.org/t/p/";

function Row({ title, fetchUrl, isLargeRow, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get(fetchUrl);
        setMovies(req.data.results);
        setError(false);
      } catch (err) {
        console.error(`Error fetching ${title}:`, err);
        setError(true);
        setMovies([]);
      }
    }

    fetchData();
  }, [fetchUrl, title]);

  if (error) {
    return (
      <div className="row">
        <h2>{title}</h2>
        <p style={{ color: "red", padding: "20px" }}>
          Failed to load movies. Check your TMDB API key.
        </p>
      </div>
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          const imagePath = movie.poster_path || movie.backdrop_path;
          const size = isLargeRow ? "w500" : "w342";

          return (
            <div
              className="row__posterWrapper"
              key={movie.id}
              onClick={() => onMovieClick(movie)}
            >
              <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={
                  imagePath
                    ? `${baseURL}${size}${imagePath}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.name || movie.title || "Movie poster"}
                loading="lazy"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x450?text=No+Image";
                }}
              />
              <div className="playButton">▶</div>
              <div className="row__posterOverlay">
                <p className="row__posterTitle">
                  {movie.title || movie.name || movie.original_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
