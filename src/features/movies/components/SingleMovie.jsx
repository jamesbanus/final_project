import "./SingleMovie.scss";
import {
  getMoviebyID,
  getReleaseDate,
  getTrailers,
  getRecommendations,
} from "../../../utils";
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
} from "../moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import TrailerModal from "./TrailerModal";
import RecMovies from "./RecMovies";
import Interaction from "./Interaction";
import { selectOpen } from "../modalSlice";
import { selectToken, selectLogin } from "../accountSlice";
import { checkIfFavourite, checkHasRating, setRating } from "../controlsSlice";

const SingleMovie = (props) => {
  const { changeScreen, id } = props;

  const dispatch = useDispatch();

  // Store Api Data for movie and certification

  const movie = useSelector(selectMovie);
  const cert = useSelector(selectCert);
  const videos = useSelector(selectVideos);
  const isOpen = useSelector(selectOpen);
  const recommendations = useSelector(selectRecommendations);
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLogin);

  // set endpointns for the api (URLS from utils)

  let endpoints = [
    getMoviebyID(id),
    getReleaseDate(id),
    getTrailers(id),
    getRecommendations(id),
  ];

  // call the apis

  const getMovieData = useCallback(async () => {
    if (!id) {
      return;
    }
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

  // Find the release date year

  const releaseDate = new Date(movie?.release_date).getFullYear();

  // Calculate movie runtime in hours and minutes

  const runTime = movie?.runtime;
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;

  // create empty object to store stripped out certification results

  const certificateResults = {};

  // loop through each country of the results, and then through the inner results. If there is a certificate add it to the above object

  for (let index = 0; index < cert?.length; index++) {
    const element = cert[index];
    const country = element.iso_3166_1;
    for (let index = 0; index < element?.release_dates.length; index++) {
      const innerElement = element.release_dates[index];
      if (innerElement.certification) {
        certificateResults[country] = innerElement.certification;
      }
    }
  }

  // if our object has an age rating for GB, use that. If not then US, and if not then the first one.

  const getAge = () => {
    if (certificateResults["GB"]) {
      return certificateResults["GB"];
    }
    if (certificateResults["US"]) {
      return certificateResults["US"];
    }
    const array = Object.values(certificateResults);
    return array[0];
  };

  // Create empty array to store the genres, n will be the index

  const genresResults = [];
  let n = 0;

  // loop over the movie data and store each genre

  for (let index = 0; index < movie?.genres.length; index++) {
    const element = movie.genres[index];
    if (element.name) {
      genresResults[n] = element.name;
      n++;
    }
  }

  // convert array to string

  const genres = genresResults.join(", ");

  // create empty object to store stripped out video results

  const videosResults = {};

  for (let index = 0; index < videos?.length; index++) {
    const element = videos[index];
    const videoName = element.name;
    if (element.key) {
      videosResults[videoName] = element.key;
    }
  }

  const getTrailerKey = () => {
    if (videosResults["Official Trailer"]) {
      return videosResults["Official Trailer"];
    }
    if (videosResults["Main Trailer"]) {
      return videosResults["Main Trailer"];
    }
    if (videosResults["Teaser Trailer"]) {
      return videosResults["Teaser Trailer"];
    }
    const keys = Object.keys(videosResults);
    const indexof = keys.findIndex((item) => item.includes("Trailer"));
    if (indexof !== -1) {
      return videosResults[keys[indexof]];
    }
    return null;
  };

  const trailerKey = getTrailerKey();

  // stuff for the interaction component //

  const grabFavouriteStatus = async () => {
    try {
      const favouriteResult = await axios.get(
        `http://localhost:4000/useractions/checkFavourite/${id}`,
        { headers: { token: token } }
      );
      const favouriteStatus = favouriteResult.data.status;
      if (favouriteStatus === 1) {
        dispatch(checkIfFavourite(true));
      } else {
        dispatch(checkIfFavourite(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const grabRatingStatus = async () => {
    try {
      const ratingResult = await axios.get(
        `http://localhost:4000/useractions/checkRating/${id}`,
        { headers: { token: token } }
      );
      const ratingStatus = ratingResult.data.status;
      if (ratingStatus === 1) {
        const storedRating = ratingResult.data.results[0].rating;
        dispatch(checkHasRating(true));
        dispatch(setRating(storedRating));
      } else {
        dispatch(checkHasRating(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grabFavouriteStatus();
    grabRatingStatus();
    // console.log("I fire once", Date.now());
  }, [id, isLoggedIn]);

  /////////////////////////////////////////

  if (!movie | !cert) {
    return;
  }

  return (
    <>
      {isOpen && <TrailerModal trailerKey={trailerKey} />}
      <div id="masterContainer">
        <div className="backDropContainer">
          <img
            className="backDrop"
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
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
          </div>
          <div className="singleMovieInfoContainer">
            <div className="movieTitleDiv">
              <h1 className="movieTitle">
                {movie?.title + " (" + releaseDate + ")"}
              </h1>
            </div>
            <div className="subInfoDiv">
              <h3 className="cert">{getAge()}</h3>
              <ul className="moreInfo">
                <li>{genres}</li>
                <li>{hours + "h " + minutes + "m"}</li>
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
            <Interaction movieid={id} />
          </div>
        </div>
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
      />
    </>
  );
};

export default SingleMovie;
