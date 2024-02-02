import "./SingleMovie.scss";
import {
  getMoviebyID,
  getReleaseDate,
  getTrailers,
  getRecommendations,
  faveStatus,
  ratingStatus,
} from "../../../utils/apis";
import React, { useEffect, useCallback } from "react";
import axios from "axios";
import {
  selectMovie,
  setMovie,
  selectCert,
  setCert,
  selectVideos,
  setVideos,
  setRecommendationsApiResults,
  selectRecommendations,
  setSingleMovieRating,
} from "../moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import TrailerModal from "./TrailerModal";
import RecMovies from "./RecMovies";
import Interaction from "./Interaction";
import { selectOpen } from "../modalSlice";
import { selectToken, selectLogin } from "../accountSlice";
import { checkIfFavourite, setRating } from "../controlsSlice";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  genres,
  getAge,
  hours,
  minutes,
  releaseDate,
  trailerKey,
} from "../../../utils/singleMovie";

const SingleMovie = (props) => {
  const { changeScreen, id, ratingsData } = props;

  const dispatch = useDispatch();

  // Store Api Data for movie and certification

  const movie = useSelector(selectMovie);
  const cert = useSelector(selectCert);
  const videos = useSelector(selectVideos);
  const isOpen = useSelector(selectOpen);
  const recommendations = useSelector(selectRecommendations);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLogin);

  // call the apis

  const getMovieData = useCallback(async () => {
    if (!id) {
      return;
    }
    const endpoints = [
      getMoviebyID(id),
      getReleaseDate(id),
      getTrailers(id),
      getRecommendations(id),
    ];
    try {
      axios.all(endpoints.map((endpoints) => axios.get(endpoints))).then(
        axios.spread(
          (
            { data: movieData },
            { data: certData },
            { data: videoData },
            { data: recData }
          ) => {
            // console.log({ videoData });
            dispatch(setMovie(movieData));
            dispatch(setCert(certData.results));
            dispatch(setVideos(videoData.results));
            dispatch(setRecommendationsApiResults(recData));
          }
        )
      );
    } catch (error) {
      console.log(error, id);
    }
  }, [dispatch, id]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  useEffect(() => {
    for (let index = 0; index < ratingsData?.length; index++) {
      const element = ratingsData[index];
      const ratingID = element.movie_id;
      const avgRating = element.avgRating;
      if (Number(id) === ratingID) {
        dispatch(setSingleMovieRating(avgRating));
        return;
      }
    }
  });

  // stuff for the interaction component //

  const grabFavouriteStatus = useCallback(async () => {
    const api = faveStatus(token, id);
    try {
      const favouriteResult = await axios.get(api);
      const favouriteStatus = favouriteResult.data.status;
      if (favouriteStatus === 1) {
        dispatch(checkIfFavourite(true));
      } else {
        dispatch(checkIfFavourite(false));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id, token]);

  const grabRatingStatus = useCallback(async () => {
    const api = ratingStatus(token, id);
    try {
      const ratingResult = await axios.get(api);
      const ratingStatus = ratingResult.data.status;
      if (ratingStatus === 1) {
        const storedRating = ratingResult.data.results[0].rating;
        dispatch(setRating(storedRating));
      } else {
        dispatch(setRating(0));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    grabFavouriteStatus();
    grabRatingStatus();
  }, [id, isLoggedIn, grabFavouriteStatus, grabRatingStatus]);

  /////////////////////////////////////////

  if (!movie | !cert) {
    return;
  }

  return (
    <>
      {isOpen && <TrailerModal trailerKey={trailerKey(videos)} />}
      <div id="masterContainer">
        <div className="backDropContainer">
          <img
            className="backDrop"
            src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
            alt={movie?.title}
          />
        </div>
        <div id="singleMovieContainer">
          <div className="moviePosterDiv">
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
              alt={movie?.title}
            />
            <div className="singleMratingBar">
              {movie?.rating === undefined ? (
                <CircularProgressbar value={0} text={`?`} background={true} />
              ) : (
                <CircularProgressbar
                  value={movie?.rating}
                  text={`${movie?.rating}%`}
                  background={true}
                />
              )}
            </div>
          </div>
          <div className="singleMovieInfoContainer">
            <div className="movieTitleDiv">
              <h1 className="movieTitle">
                {movie?.title + " (" + releaseDate(movie) + ")"}
              </h1>
            </div>
            <div className="subInfoDiv">
              <h3 className="cert">{getAge(cert)}</h3>
              <ul className="moreInfo">
                <li>{genres(movie)}</li>
                <li>{hours(movie) + "h " + minutes(movie) + "m"}</li>
              </ul>
            </div>
            {movie?.tagline && (
              <div className="taglineDiv">
                <p className="tagLine">{movie?.tagline}</p>
              </div>
            )}
            <div className="overviewTitleDiv">
              <h2>Overview</h2>
            </div>
            <div className="movieOverviewDiv">
              <p className="movieOverview">{movie?.overview}</p>
            </div>
            <Interaction
              trailerKey={trailerKey(videos)}
              movieid={id}
              avgrating={movie?.rating}
            />
          </div>
        </div>
        <Interaction
          trailerKey={trailerKey(videos)}
          movieid={id}
          avgrating={movie?.rating}
        />
        <div className="overviewTitleDiv2">
          <h2 id="overview2">Overview</h2>
        </div>
        <div className="movieOverviewDiv2">
          <p id="movieOverview2">{movie?.overview}</p>
        </div>
      </div>
      <RecMovies
        recommendations={recommendations}
        changeScreen={changeScreen}
        ratingsData={ratingsData}
      />
    </>
  );
};

export default SingleMovie;
