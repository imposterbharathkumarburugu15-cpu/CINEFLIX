
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../md.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // fetch movie details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  // fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        setReviews(data.results || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [id]);

  if (!movie) return <p style={{ textAlign: "center" }}> Loading...</p>;
 const addToWatchlist = () => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!storedWatchlist.find(m => m.id === movie.id)) {
      storedWatchlist.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
      });
      localStorage.setItem("watchlist", JSON.stringify(storedWatchlist));
      alert(`${movie.title} added to watchlist!`);
    } else {
      alert(`${movie.title} is already in your watchlist.`);
    }
  };

  return (
    <div className="detail-page">
      {/* Movie Main Section */}
      <div className="detail-container">
        <img
          className="detail-poster"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
        />

        <div className="detail-info">
          <h1>{movie.title}</h1>
          <h3>
            Release: {movie.release_date} | Time {movie.runtime} mins
          </h3>
          <p className="rating">⭐ {movie.vote_average?.toFixed(1)} / 10</p>

          <p className="overview">{movie.overview}</p>

          <div className="actions">
            <Link to={`/movie/${movie.id}/book`}>
              <button className="btn-primary"> Book Tickets</button>
           </Link>
           <button className="btn-secondary" onClick={addToWatchlist}>Add to Watchlist</button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2> Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
