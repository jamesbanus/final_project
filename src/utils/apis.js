// theMovieDB APIs

const getPopular = (page, genreApiString) => {
  const encodedGetPopular = btoa(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreApiString}`
    // `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&with_genres=${genreApiString}`
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

// dataBase APIs

const registerUser = (email, password) => {
  const encodedRegister = btoa(`http://localhost:4000/account/register`);
  return `http://localhost:6001/proxy/databasePost/${email}/${password}?url=${encodedRegister}`;
};

const loginUser = (email, password) => {
  const encodedLogin = btoa(`http://localhost:4000/account/login`);
  return `http://localhost:6001/proxy/databasePost/${email}/${password}?url=${encodedLogin}`;
};

const getAllAvgRatings = () => {
  const encodedgetAllAvgRatings = btoa(
    `http://localhost:4000/account/returnAllAvgRating`
  );
  return `http://localhost:6001/proxy/database?url=${encodedgetAllAvgRatings}`;
};

const userFavourites = (token) => {
  const encodedUserFavourites = btoa(
    `http://localhost:4000/useractions/returnFavourites`
  );
  return `http://localhost:6001/proxy/database/${token}?url=${encodedUserFavourites}`;
};

const checkUserData = (token, movieid) => {
  const encodedCheckFavourites = btoa(
    `http://localhost:4000/useractions/actions/${movieid}`
  );
  return `http://localhost:6001/proxy/database/${token}?url=${encodedCheckFavourites}`;
};

const setFavourites = (token, movieid, fave) => {
  const encodedSetFavourites = btoa(`http://localhost:4000/useractions/add`);
  return `http://localhost:6001/proxy/databasePostFave/${token}/${movieid}/${fave}?url=${encodedSetFavourites}`;
};

const updateFavourites = (token, movieid, fave) => {
  const encodedUpdateFavourites = btoa(
    `http://localhost:4000/useractions/update/${movieid}`
  );
  return `http://localhost:6001/proxy/databasePatchFave/${token}/${movieid}/${fave}?url=${encodedUpdateFavourites}`;
};

const setRatings = (token, movieid, currentRating) => {
  const encodedSetRatings = btoa(`http://localhost:4000/useractions/add`);
  return `http://localhost:6001/proxy/databasePostRating/${token}/${movieid}/${currentRating}?url=${encodedSetRatings}`;
};

const updateRatings = (token, movieid, currentRating) => {
  const encodedUpdateRatings = btoa(
    `http://localhost:4000/useractions/update/${movieid}`
  );
  return `http://localhost:6001/proxy/databasePatchRating/${token}/${movieid}/${currentRating}?url=${encodedUpdateRatings}`;
};

export {
  genreList,
  getPopular,
  getSearch,
  getMoviebyID,
  getReleaseDate,
  getTrailers,
  getRecommendations,
  getAllAvgRatings,
  userFavourites,
  setFavourites,
  updateFavourites,
  checkUserData,
  setRatings,
  updateRatings,
  registerUser,
  loginUser,
};
