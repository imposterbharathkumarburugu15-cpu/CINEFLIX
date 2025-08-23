import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../md.css";

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const removeFromWatchlist = (id) => {
    const updatedList = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem("watchlist", JSON.stringify(updatedList));
  };

  if (watchlist.length === 0) {
    return <p style={{ textAlign: "center" }}>Your watchlist is empty.</p>;
  }

  return (
    <div className="watchlist-page">
      <h1>Your Watchlist</h1>
      <div className="watchlist-container">
        {watchlist.map(movie => (
          <div key={movie.id} className="watchlist-card">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>Release: {movie.release_date}</p>
            </Link>
            <button className="btn-danger" onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchlistPage;
