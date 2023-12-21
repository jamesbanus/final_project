import "./Movie.scss";
import React, { useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { setRating } from "../moviesSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Movie = (props) => {
  const { movies, changeScreen, ratingsData } = props;

  const dispatch = useDispatch();

  const obj = movies?.results;

  const newArray = obj?.filter((el) => {
    return el.poster_path !== null && el.backdrop_path !== null;
  });

  useEffect(() => {
    for (let index = 0; index < newArray?.length; index++) {
      const element = newArray[index];
      const id = element.id;
      for (let index = 0; index < ratingsData?.length; index++) {
        const element = ratingsData[index];
        const ratingID = element.movie_id;
        const avgRating = element.avgRating;
        if (id === ratingID) {
          dispatch(setRating({ id, avgRating }));
        }
      }
    }
  });

  return (
    <>
      {newArray?.map((item) => {
        return (
          <Fragment key={item.id}>
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
                  {item.rating === undefined ? (
                    <CircularProgressbar
                      value={0}
                      text={`?`}
                      background={true}
                    />
                  ) : (
                    <CircularProgressbar
                      value={item.rating}
                      text={`${item.rating}%`}
                      background={true}
                    />
                  )}
                </div>
              </div>
            </>
          </Fragment>
        );
      })}
    </>
  );
};

export default Movie;
