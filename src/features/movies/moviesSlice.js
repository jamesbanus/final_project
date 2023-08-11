import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCount } from "./moviesAPI";

const initialState = {
  value: 1,
  status: "idle",
  screenMode: 0,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

let checkedGenreArray = [];

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = initialState.value;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setScreenMode: (state, action) => {
      state.screenMode = action.payload;
    },
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setID: (state, action) => {
      state.id = action.payload;
      state.screenMode = 1;
    },
    setCert: (state, action) => {
      state.cert = action.payload;
    },
    clearCert: (state) => {
      state.cert = undefined;
    },
    clearMovie: (state) => {
      state.movie = undefined;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setGenreApiResults: (state, action) => {
      state.genreApiResults = action.payload;
    },
    setCheckedGenres: (state, action) => {
      checkedGenreArray = [...checkedGenreArray];
      const genreId = action.payload;
      const indexOf = checkedGenreArray.indexOf(genreId);

      if (indexOf === -1) {
        checkedGenreArray.push(genreId);
      } else {
        checkedGenreArray.splice(indexOf, 1);
      }
      state.checkedGenres = checkedGenreArray;
    },
  },
});

export const {
  setMovies,
  increment,
  decrement,
  reset,
  setSearch,
  setScreenMode,
  setMovie,
  setID,
  setCert,
  clearCert,
  clearMovie,
  setVideos,
  setSearchResults,
  setGenreApiResults,
  setCheckedGenres,
} = moviesSlice.actions;

export const selectMovies = (state) => state.movies.movies;
export const selectPage = (state) => state.movies.value;
export const selectSearch = (state) => state.movies.search;
export const selectScreen = (state) => state.movies.screenMode;
export const selectMovie = (state) => state.movies.movie;
export const selectID = (state) => state.movies.id;
export const selectCert = (state) => state.movies.cert;
export const selectVideos = (state) => state.movies.videos;
export const selectSearchResults = (state) => state.movies.searchResults;
export const genreApiResults = (state) => state.movies.genreApiResults;
export const selectGenres = (state) => state.movies.checkedGenres;

export default moviesSlice.reducer;
