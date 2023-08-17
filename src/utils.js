const allMoviesURL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&sort_by=popularity.desc&with_genres=12";

const popularListURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=`;
const popularListURL2 = `&with_genres=`;

const searchMoviebyTitleURL1 = `https://api.themoviedb.org/3/search/movie?query=`;
const searchMoviebyTitleURL2 = `&include_adult=false&language=en-US&page=`;

const movieByID1 = `https://api.themoviedb.org/3/movie/`;
const movieByID2 = `?language=en-US`;

const recommendationsApi = `/recommendations`;

const releaseDate2 = `/release_dates`;

const apiVideos = `/videos?language=en-US`;

const genreList = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

const apiAuth =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDNjYzk1ZWE4Zjk5MWYxMDhkZWQxMjJhM2YwMzA3MCIsInN1YiI6IjY0OGM2ZDEwYzNjODkxMDBhZTUwMWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LX3gcqEZAqxOq0UVFVSm_L9rWNhXF4JgEn48pkSa9Rg";

export {
  apiAuth,
  allMoviesURL,
  popularListURL,
  searchMoviebyTitleURL1,
  searchMoviebyTitleURL2,
  movieByID1,
  movieByID2,
  releaseDate2,
  apiVideos,
  popularListURL2,
  genreList,
  recommendationsApi,
};
