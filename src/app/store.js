import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import modalReducer from "../features/movies/modalSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    modal: modalReducer,
  },
});
