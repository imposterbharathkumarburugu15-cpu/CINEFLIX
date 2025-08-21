import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "../theme.css";   
import "../movie.css";   

function MoviesPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("movie");       // movie | tv
  const [category, setCategory] = useState("popular"); // popular | top_rated | trending
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "";

      if (query) {
        // Search
        url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1&include_adult=false`;
      } else if (category === "trending") {
        // Trending
        url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${API_KEY}&language=en-US&page=1`;
      } else {
        // Popular or Top Rated
        url = `https://api.themoviedb.org/3/${type}/${category}?api_key=${API_KEY}&language=en-US&page=1`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        // ✅ preprocess posters before saving
        const results = data.results.map((item) => ({
          ...item,
          poster_full: item.poster_path
            ? IMG_BASE + item.poster_path
            : "https://via.placeholder.com/300x450?text=No+Image",
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

      {/* Loading */}
      {loading && <p className="info">⏳ Loading...</p>}

      {/* Error */}
      {error && <p className="info">{error}</p>}

      {/* Movies / TV Shows */}
      <div className="grid">
        {!loading && !error && items.length === 0 && (
          <p className="info">No results found.</p>
        )}

        {items.map((item) => (
          <div key={item.id} className="card">
            <img src={item.poster_full} alt={item.title || item.name} />
            <h3>{item.title || item.name}</h3>
            <p>⭐ {item.vote_average?.toFixed(1)}</p>

            {/* ✅ Navigate to details */}
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
