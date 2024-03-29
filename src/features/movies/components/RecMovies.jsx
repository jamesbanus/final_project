import "./RecMovies.scss";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRecommendationsRating } from "../moviesSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "react-tooltip";

const RecMovies = (props) => {
  const { recommendations, changeScreen, ratingsData } = props;

  const dispatch = useDispatch();

  const obj = recommendations?.results;

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
          dispatch(setRecommendationsRating({ id, avgRating }));
        }
      }
    }
  });

  if (newArray?.length === 0) {
    return (
      <>
        <div id="relFilmHeading">
          <p>Sorry, no recommendations!</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="relFilmHeading">
          <p>Other recommendations</p>
        </div>
        <div className="relatedFilmsDiv">
          {newArray?.map((item) => {
            return (
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
                    <div data-tooltip-id="ratingToolTip3">
                      <CircularProgressbar
                        value={0}
                        text={`?`}
                        background={true}
                      />
                    </div>
                  ) : (
                    <div data-tooltip-id="ratingToolTip4">
                      <CircularProgressbar
                        value={item.rating}
                        text={`${item.rating}%`}
                        background={true}
                      />
                    </div>
                  )}
                </div>
                <Tooltip
                  id="ratingToolTip3"
                  place="top"
                  content="Be The First to Rate this Movie"
                />
                <Tooltip
                  id="ratingToolTip4"
                  place="top"
                  content="Average User Rating"
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default RecMovies;
