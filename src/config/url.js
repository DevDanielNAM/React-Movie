const API_KEY = process.env.REACT_APP_API_KEY;

const config = {
  URL: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR`,
  TOP_RATED_URL: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR`,
  IMAGE_URL: "https://image.tmdb.org/t/p/w500",
  GENRE_URL: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`,
  SEARCH_URL: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR`,
};

export default config;
