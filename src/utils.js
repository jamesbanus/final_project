const allMoviesURL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&sort_by=popularity.desc&with_genres=12";

const popularListURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=`;

const searchMoviebyTitleURL1 = `https://api.themoviedb.org/3/search/movie?query=`;

const searchMoviebyTitleURL2 = `s&include_adult=false&language=en-US&page=`;

const movieByID1 = `https://api.themoviedb.org/3/movie/`;
const movieByID2 = `?language=en-US`;

export {
  allMoviesURL,
  popularListURL,
  searchMoviebyTitleURL1,
  searchMoviebyTitleURL2,
  movieByID1,
  movieByID2,
};
