// const allMoviesURL =
//   "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&sort_by=popularity.desc&with_genres=12";

const getPopular = (page, genreApiString) => {
  const encodedGetPopular = btoa(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&with_genres=${genreApiString}`
  );
  return `http://localhost:6001/proxy?url=${encodedGetPopular}`;
};

const getSearch = (search, page) => {
  const encodedGetSearch = btoa(
    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`
  );
  return `http://localhost:6001/proxy?url=${encodedGetSearch}`;
};

const getMoviebyID = (id) => {
  const encodedGetMoviebyID = btoa(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  );
  return `http://localhost:6001/proxy?url=${encodedGetMoviebyID}`;
};

const getReleaseDate = (id) => {
  const encodedGetReleaseDate = btoa(
    `https://api.themoviedb.org/3/movie/${id}/release_dates`
  );
  return `http://localhost:6001/proxy?url=${encodedGetReleaseDate}`;
};

const getTrailers = (id) => {
  const encodedGetTrailers = btoa(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
  );
  return `http://localhost:6001/proxy?url=${encodedGetTrailers}`;
};

const getRecommendations = (id) => {
  const encodedGetRecommendations = btoa(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`
  );
  return `http://localhost:6001/proxy?url=${encodedGetRecommendations}`;
};

const encodedGenreList = btoa(
  `https://api.themoviedb.org/3/genre/movie/list?language=en`
);
const genreList = `http://localhost:6001/proxy?url=${encodedGenreList}`;

export {
  genreList,
  getPopular,
  getSearch,
  getMoviebyID,
  getReleaseDate,
  getTrailers,
  getRecommendations,
};
