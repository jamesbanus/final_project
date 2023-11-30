import "./Movie.scss";
import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRating } from "../moviesSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Movie = (props) => {
  const { movies, changeScreen } = props;

  const dispatch = useDispatch();

  const obj = movies?.results;

  const newArray = obj?.filter((el) => {
    return el.poster_path !== null && el.backdrop_path !== null;
  });

  // console.log(newArray);

  // call database for ratings

  const getAvgRating = async (id) => {
    try {
      const avgRating = await axios.get(
        `http://localhost:4000/account/returnAvgRating/${id}`
      );
      const avgRatingStatus = avgRating.data.status;
      if (avgRatingStatus === 1) {
        const avgRatingResult = avgRating.data.results[0].avgRating;
        return avgRatingResult;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const avgRatingResult = async (id) => {
    const avgRating = await getAvgRating(id);
    dispatch(setRating({ id, avgRating }));
  };

  for (let index = 0; index < newArray?.length; index++) {
    const element = newArray[index];
    const id = element.id;
    avgRatingResult(id);
  }

  return (
    <>
      {newArray?.map((item) => {
        return (
          <>
            <div className="movie" key={item.id}>
              <img
                className="moviePoster"
                src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                alt={item.title}
                id={item.id}
                onClick={changeScreen}
              />
              <h1 className="movieTitle">{item.title}</h1>
              <div className="ratingBar">
                <CircularProgressbar
                  value={item.rating}
                  text={`${item.rating}%`}
                  background={true}
                />
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default Movie;
