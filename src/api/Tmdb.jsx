const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";

// Check if API key is available
if (!API_KEY) {
  console.error('TMDB API key is not configured. Please set VITE_TMDB_API_KEY in your environment variables.');
}




export const getItems = async (type = "movie", category = "popular", page = 1) => {
  if (!API_KEY) {
    throw new Error('API key not configured');
  }
  
  const endpoint =
    category === "latest"
      ? `${BASE_URL}/${type}/now_playing?api_key=${API_KEY}&page=${page}`
      : `${BASE_URL}/${type}/${category}?api_key=${API_KEY}&page=${page}`;

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }
  return res.json();
};

export const searchItems = async (query, type = "movie", page = 1) => {
  if (!API_KEY) {
    throw new Error('API key not configured');
  }
  
  const res = await fetch(
    `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!res.ok) {
    throw new Error(`Search request failed: ${res.status}`);
  }
  return res.json();
};
