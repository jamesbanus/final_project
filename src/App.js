import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Interface from ".//features/movies/components/Interface";
import "./App.css";
import { selectMovies, setMovies } from "./features/movies/moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import { allMoviesURL, popularListURL } from "./utils";

const App = () => {
  const movies = useSelector(selectMovies);

  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    console.log("get data ran", Date.now());
    try {
      const { data } = await axios.get(popularListURL, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDNjYzk1ZWE4Zjk5MWYxMDhkZWQxMjJhM2YwMzA3MCIsInN1YiI6IjY0OGM2ZDEwYzNjODkxMDBhZTUwMWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LX3gcqEZAqxOq0UVFVSm_L9rWNhXF4JgEn48pkSa9Rg",
        },
      });
      console.log(data.results);
      dispatch(setMovies(data.results));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Interface movies={movies} />
    </>
  );
};

export default App;
