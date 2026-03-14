import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const TrailerModal = ({ movie, onClose }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (movie) {
      fetchTrailer(movie.id);
      setShowTrailer(false); // Reset trailer state when movie changes
    }
  }, [movie]);

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
      } else {
        setTrailerUrl("");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerUrl("");
    }
  };

  const handleClose = () => {
    setShowTrailer(false); // Reset trailer state when modal closes
    onClose();
  };

  if (!movie) return null;

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>{movie.title || movie.name}</h2>
        {!showTrailer ? (
          <div>
            <button
              className="modal-button"
              onClick={() => setShowTrailer(true)}
            >
              Play Trailer
            </button>
            <button
              className="modal-button watch-full-movie-btn"
              onClick={() => navigate("/subscription")}
            >
              Watch Full Movie
            </button>
          </div>
        ) : trailerUrl ? (
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
