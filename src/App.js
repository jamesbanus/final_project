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
  setSearch,
  selectSearch,
  setSearchResults,
  selectSearchResults,
} from "./features/movies/moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  apiAuth,
  popularListURL,
  searchMoviebyTitleURL1,
  searchMoviebyTitleURL2,
} from "./utils";

const App = () => {
  let movies = useSelector(selectMovies);
  const page = useSelector(selectPage);
  const search = useSelector(selectSearch);
  const searchResults = useSelector(selectSearchResults);

  const dispatch = useDispatch();

  // set endpointns for the api (URLS from utils)

  let endpoints = [
    popularListURL + page,
    searchMoviebyTitleURL1 + search + searchMoviebyTitleURL2 + page,
  ];

  // create an insteance with headers so we only have to authorise once

  const axiosInstance = axios.create({
    headers: {
      Authorization: apiAuth,
    },
  });

  // call the apis

  const getMainData = useCallback(async () => {
    try {
      axios
        .all(endpoints.map((endpoints) => axiosInstance.get(endpoints)))
        .then(
          axios.spread(({ data: movieData }, { data: searchData }) => {
            // console.log({ searchData });
            dispatch(setMovies(movieData));
            dispatch(setSearchResults(searchData));
          })
        );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, page, search]);

  useEffect(() => {
    getMainData();
  }, [getMainData]);

  const onSearchInput = async (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(reset());
  };

  const onPageNext = () => {
    dispatch(increment());
  };

  const onPageBack = () => {
    dispatch(decrement());
  };

  const onPageReset = () => {
    dispatch(reset());
  };

  //choose what api to display depending on if there is a search result

  if (!search) {
    movies = movies;
  } else {
    movies = searchResults;
  }

  const totalPages = movies?.total_pages;

  // console.log(movies);

  return (
    <>
      <Interface
        movies={movies}
        onSearchInput={onSearchInput}
        search={search}
        onPageNext={onPageNext}
        onPageBack={onPageBack}
        onPageReset={onPageReset}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
};

export default App;
