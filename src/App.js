import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Interface from ".//features/movies/components/Interface";
import "./App.css";
import { selectMovies, setMovies } from "./features/movies/moviesSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const apiURL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=12";

  // const movies = useSelector(selectMovies);

  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    console.log("get data ran", Date.now());
    try {
      const { data } = await axios.get(apiURL, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDNjYzk1ZWE4Zjk5MWYxMDhkZWQxMjJhM2YwMzA3MCIsInN1YiI6IjY0OGM2ZDEwYzNjODkxMDBhZTUwMWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LX3gcqEZAqxOq0UVFVSm_L9rWNhXF4JgEn48pkSa9Rg",
        },
      });
      console.log(data);
      dispatch(setMovies(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Interface />
    </>
  );
};

export default App;
