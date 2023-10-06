const allMoviesURL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&sort_by=popularity.desc&with_genres=12";

const getPopular = (page, genreApiString) => {
  return `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&with_genres=${genreApiString}`;
};

const getSearch = (search, page) => {
  return `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
};

const getMoviebyID = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
};

const getReleaseDate = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/release_dates`;
};

const getTrailers = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
};

const getRecommendations = (id) => {
  return `https://api.themoviedb.org/3/movie/${id}/recommendations`;
};

const genreList = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

const apiAuth =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDNjYzk1ZWE4Zjk5MWYxMDhkZWQxMjJhM2YwMzA3MCIsInN1YiI6IjY0OGM2ZDEwYzNjODkxMDBhZTUwMWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LX3gcqEZAqxOq0UVFVSm_L9rWNhXF4JgEn48pkSa9Rg";

export {
  apiAuth,
  genreList,
  getPopular,
  getSearch,
  getMoviebyID,
  getReleaseDate,
  getTrailers,
  getRecommendations,
};
