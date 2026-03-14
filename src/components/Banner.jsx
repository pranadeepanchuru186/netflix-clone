import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import requests from "../requests";
import { useTheme } from "../contexts/ThemeContext";

function Banner() {
  const [movie, setMovie] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [showTrailerToast, setShowTrailerToast] = useState(false);
  const navigate = useNavigate();
  const trailerToastTimer = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get(requests.trending);
        setMovie(
          req.data.results[Math.floor(Math.random() * req.data.results.length)],
        );
      } catch (error) {
        console.error("Error fetching banner movie:", error);
        // Set a default movie or show error
        setMovie({
          title: "API Key Required",
          overview: "Please add a valid TMDB API key to .env file",
          backdrop_path: null,
        });
      }
    }

    fetchData();
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
      );
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );
      if (trailer) {
        setTrailerUrl(
          `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&playlist=${trailer.key}`,
        );
        return true;
      }

      setTrailerUrl("");
      return false;
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerUrl("");
      return false;
    }
  };

  const showTrailerUnavailableToast = () => {
    setShowTrailerToast(true);
    if (trailerToastTimer.current) {
      clearTimeout(trailerToastTimer.current);
    }
    trailerToastTimer.current = setTimeout(() => {
      setShowTrailerToast(false);
      trailerToastTimer.current = null;
    }, 3000);
  };

  const handlePlayTrailer = async () => {
    if (!movie?.id) {
      showTrailerUnavailableToast();
      return;
    }

    const found = await fetchTrailer(movie.id);

    if (found) {
      setIsPlayingTrailer(true);
      setShowTrailerToast(false);
    } else {
      showTrailerUnavailableToast();
    }
  };

  useEffect(() => {
    return () => {
      if (trailerToastTimer.current) {
        clearTimeout(trailerToastTimer.current);
      }
    };
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: isPlayingTrailer
          ? "none"
          : movie?.backdrop_path
            ? `url("https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}")`
            : "linear-gradient(90deg, #000, #111)",
        backgroundPosition: "center center",
      }}
    >
      {isPlayingTrailer && trailerUrl && (
        <>
          <iframe
            className="banner__trailer"
            src={trailerUrl}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button
            className="banner__closeTrailer"
            onClick={() => setIsPlayingTrailer(false)}
          >
            ✕
          </button>
        </>
      )}

      {showTrailerToast && (
        <div className="banner__toast">
          The Trailer will be available soon for the selected movie
        </div>
      )}

      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name || "Loading..."}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={handlePlayTrailer}>
            Play Trailer
          </button>
          <button
            className="banner__button"
            onClick={() => navigate("/subscription")}
          >
            Watch Full Movie
          </button>
          <button
            className="banner__button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("showComingSoon"));
            }}
          >
            My List
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150) || "Please check your TMDB API key"}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
