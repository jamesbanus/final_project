import "./Movie.scss";
import React, { useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { setRating } from "../moviesSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "react-tooltip";

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
      <div className="popularHeadersDiv">
        <div className="popular">
          <h1 className="subHeading">Popular</h1>
        </div>
        <div className="favourite" onClick={changeScreen}>
          <h1 className="subHeading">Favourites</h1>
        </div>
      </div>
      <div id="popularMovies">
        {newArray?.map((item) => {
          return (
            <Fragment key={item.id}>
              <>
                <div className="movie" key={item.id}>
                  <div>
                    <img
                      className="moviePoster"
                      src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
                      alt={item.title}
                      id={item.id}
                      onClick={changeScreen}
                    />
                  </div>
                  <div>
                    <h1 className="movieTitle">{item.title}</h1>
                  </div>
                  <div className="ratingBar">
                    {item.rating === undefined ? (
                      <div data-tooltip-id="ratingToolTip1">
                        <CircularProgressbar
                          value={0}
                          text={`?`}
                          background={true}
                        />
                      </div>
                    ) : (
                      <div data-tooltip-id="ratingToolTip2">
                        <CircularProgressbar
                          value={item.rating}
                          text={`${item.rating}%`}
                          background={true}
                        />
                      </div>
                    )}
                  </div>
                  <Tooltip
                    id="ratingToolTip1"
                    place="top"
                    content="Be The First to Rate this Movie"
                  />
                  <Tooltip
                    id="ratingToolTip2"
                    place="top"
                    content="Average User Rating"
                  />
                </div>
              </>
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Movie;
