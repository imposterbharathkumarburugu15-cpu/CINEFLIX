const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_BASE = "https://image.tmdb.org/t/p/w500";




export const getItems = async (type = "movie", category = "popular", page = 1) => {
  const endpoint =
    category === "latest"
      ? `${BASE_URL}/${type}/now_playing?api_key=${API_KEY}&page=${page}`
      : `${BASE_URL}/${type}/${category}?api_key=${API_KEY}&page=${page}`;

  const res = await fetch(endpoint);
  return res.json();
};

export const searchItems = async (query, type = "movie", page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  return res.json();
};
