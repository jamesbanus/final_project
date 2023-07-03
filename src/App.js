import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Interface from ".//features/movies/components/Interface";
import "./App.css";
import {
  selectMovies,
  setMovies,
  selectPage,
  increment,
  decrement,
  reset,
} from "./features/movies/moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import { apiAuth, popularListURL } from "./utils";

const App = () => {
  const movies = useSelector(selectMovies);
  const page = useSelector(selectPage);

  const dispatch = useDispatch();

  const getPopularData = useCallback(async () => {
    console.log("get data ran", Date.now());
    try {
      const { data } = await axios.get(popularListURL + page, {
        headers: {
          Authorization: apiAuth,
        },
      });
      console.log(data);
      dispatch(setMovies(data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, page]);

  useEffect(() => {
    getPopularData();
  }, [getPopularData]);

  const onPageNext = () => {
    dispatch(increment());
  };

  const onPageBack = () => {
    dispatch(decrement());
  };

  const onPageReset = () => {
    dispatch(reset());
  };

  return (
    <>
      <Interface
        movies={movies}
        onPageNext={onPageNext}
        onPageBack={onPageBack}
        onPageReset={onPageReset}
        page={page}
      />
    </>
  );
};

export default App;
