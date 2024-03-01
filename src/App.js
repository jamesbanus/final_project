import React, { useEffect, useCallback } from "react";
import axios from "axios";
import Interface from ".//features/movies/components/Interface";
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
  // setGenreApiResults,
  genreApiResults,
  selectCheckedGenreArray,
  setRatingsData,
  selectRatingsData,
  fetchContent,
} from "./features/movies/moviesSlice";
import { selectCallRatingsonChange } from "./features/movies/controlsSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  genreList,
  getPopular,
  getSearch,
  getAllAvgRatings,
} from "../src/utils/apis";
import { useCookies } from "react-cookie";
import { setLogIn, setToken } from "../src/features/movies/accountSlice";

const App = () => {
  let movies = useSelector(selectMovies);
  const page = useSelector(selectPage);
  const search = useSelector(selectSearch);
  const searchResults = useSelector(selectSearchResults);
  const genreApiList = useSelector(genreApiResults);
  const genre = useSelector(selectCheckedGenreArray);
  const ratingsData = useSelector(selectRatingsData);
  const ratingChange = useSelector(selectCallRatingsonChange);
  const [cookies] = useCookies(["user"]);
  const cookieToken = cookies.user;

  // console.log(ratingsData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const genreApiString = genre?.toString();
  // let genreApiString = genreString?.replace(/,/g, "|");

  useEffect(() => {
    if (cookieToken) {
      // console.log("running cookie check");
      dispatch(setLogIn());
      dispatch(setToken(cookieToken));
    }
  }, [dispatch]);

  // call the apis

  const getMainData = useCallback(async () => {
    const endpoints = [
      getPopular(page, genreApiString),
      getSearch(search, page),
      genreList,
    ];
    try {
      axios.all(endpoints.map((endpoints) => axios.get(endpoints))).then(
        axios.spread(
          ({ data: movieData }, { data: searchData }, { data: genreData }) => {
            dispatch(setMovies(movieData));
            dispatch(setSearchResults(searchData));
            // dispatch(setGenreApiResults(genreData));
          }
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, page, search, genreApiString]);

  useEffect(() => {
    getMainData();
  }, [getMainData]);

  const getRatingsData = useCallback(async () => {
    const api = getAllAvgRatings();
    try {
      const avgRating = await axios.get(api);
      const avgRatingStatus = avgRating.data.status;
      if (avgRatingStatus === 1) {
        const avgRatingData = avgRating.data.results;
        dispatch(setRatingsData(avgRatingData));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getRatingsData();
  }, [getRatingsData, ratingChange]);

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

  if (search) {
    movies = searchResults;
  }

  const totalPages = movies?.total_pages;

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
        genreApiList={genreApiList}
        ratingsData={ratingsData}
      />
    </>
  );
};

export default App;
