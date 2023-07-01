import "./SingleMovie.scss";
import { movieByID1, movieByID2 } from "../../../utils";
import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { selectMovie, setMovie } from "../moviesSlice";
import { useSelector, useDispatch } from "react-redux";

const SingleMovie = (props) => {
  const { changeScreen, id } = props;
  const movie = useSelector(selectMovie);

  const dispatch = useDispatch();

  const getMovieData = useCallback(async () => {
    console.log("get movie ran", Date.now(), id);
    try {
      const { data } = await axios.get(movieByID1 + id + movieByID2, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDNjYzk1ZWE4Zjk5MWYxMDhkZWQxMjJhM2YwMzA3MCIsInN1YiI6IjY0OGM2ZDEwYzNjODkxMDBhZTUwMWJkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LX3gcqEZAqxOq0UVFVSm_L9rWNhXF4JgEn48pkSa9Rg",
        },
      });
      console.log(data);
      dispatch(setMovie(data));
    } catch (error) {
      console.log(error, id);
    }
  }, [dispatch, id]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  return (
    <>
      <div id="backButton">
        <button className="button" onClick={changeScreen}>
          Back
        </button>
      </div>
      <div id="singleMovieContainer">
        <div className="singleMovie">
          <div className="img">
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
              alt={movie?.title}
              onClick={changeScreen}
            />
          </div>
          <div className="title">
            <h1 className="movieTitle">{movie?.title}</h1>
          </div>
        </div>
        <div className="singleMovieInfo">
          <div className="overviewTitle">
            <h2>Overview</h2>
          </div>
          <div className="overview">
            <h3 className="movieOverview">{movie?.overview}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
