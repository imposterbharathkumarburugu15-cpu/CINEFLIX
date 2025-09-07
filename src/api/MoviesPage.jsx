import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "../theme.css";
import "../movie.css";

function MoviesPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie"); // movie | tv
  const [category, setCategory] = useState("popular"); // popular | top_rated | trending
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMG_BASE = "https://image.tmdb.org/t/p/original"; // bigger size for carousel

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "";

      if (query) {
        url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1&include_adult=false`;
      } else if (category === "trending") {
        url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}&language=en-US&page=1`;
      } else {
        url = `https://api.themoviedb.org/3/${type}/${category}?api_key=${API_KEY}&language=en-US&page=1`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        const results = data.results.map((item) => ({
          ...item,
          poster_full: item.poster_path
            ? IMG_BASE + item.poster_path
            : "https://via.placeholder.com/800x450?text=No+Image",
          backdrop_full: item.backdrop_path
            ? IMG_BASE + item.backdrop_path
            : "https://via.placeholder.com/1280x720?text=No+Backdrop",
        }));
        setItems(results);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="movies-container">
      <h1 className="title">🎬 Cineflix Explorer</h1>

      {/* Search & Filters */}
      <form className="controls" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder={`Search ${type === "movie" ? "Movies" : "TV Shows"}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="popular">Popular</option>
          <option value="top_rated">Top Rated</option>
          <option value="trending">Trending</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="info">⏳ Loading...</p>}
      {error && <p className="info">{error}</p>}

      {/* Carousel - Top */}
      {items.length > 0 && (
        <Carousel fade interval={3000} className="mb-5">
          {items.slice(0, 5).map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block w-100"
                src={movie.backdrop_full}
                alt={movie.title || movie.name}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{movie.title || movie.name}</h3>
                <p>⭐ {movie.vote_average?.toFixed(1)}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* Grid - Bottom */}
      <div className="grid">
        {!loading && !error && items.length === 0 && (
          <p className="info">No results found.</p>
        )}

        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.poster_full} alt={item.title || item.name} />
            <h3>{item.title || item.name}</h3>
            <p>⭐ {item.vote_average?.toFixed(1)}</p>

            <Link to={`/movie/${item.id}`}>
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Reports
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;

