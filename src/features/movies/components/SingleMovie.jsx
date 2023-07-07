import "./SingleMovie.scss";
import { apiAuth, movieByID1, movieByID2, releaseDate2 } from "../../../utils";
import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { selectMovie, setMovie, selectCert, setCert } from "../moviesSlice";
import { useSelector, useDispatch } from "react-redux";

const SingleMovie = (props) => {
  const { changeScreen, id } = props;

  const dispatch = useDispatch();

  // Store Api Data for movie and certification

  const movie = useSelector(selectMovie);
  const cert = useSelector(selectCert);

  // set endpointns for the api (URLS from utils)

  let endpoints = [
    movieByID1 + id + movieByID2,
    movieByID1 + id + releaseDate2,
  ];

  // create an insteance with headers so we only have to authorise once

  const axiosInstance = axios.create({
    headers: {
      Authorization: apiAuth,
    },
  });

  // call the apis

  const getMovieData = useCallback(async () => {
    console.log(id);
    if (!id) {
      return;
    }
    console.log("get movie ran", Date.now(), id);
    try {
      axios
        .all(endpoints.map((endpoints) => axiosInstance.get(endpoints)))
        .then(
          axios.spread(({ data: movieData }, { data: certData }) => {
            console.log({ movieData, certData });
            dispatch(setMovie(movieData));
            dispatch(setCert(certData.results));
          })
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

  if (!movie | !cert) {
    return;
  }
  return (
    <>
      <div id="backButton">
        <button className="button" onClick={changeScreen}>
          Back
        </button>
      </div>
      <div id="masterContainer">
        <img
          className="backDrop"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        <div id="singleMovieContainer">
          <div className="singleMovie">
            <div className="img">
              <img
                className="moviePoster"
                src={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
                alt={movie?.title}
              />
            </div>
          </div>
          <div className="singleMovieInfo">
            <div className="title">
              <h1 className="movieTitle">
                {movie?.title + " (" + releaseDate + ")"}
              </h1>
            </div>
            <div className="subInfo">
              <h3 className="cert">{getAge()}</h3>
              <ul className="moreInfo">
                <li>{genres}</li>
                <li>{hours + "h " + minutes + "m"}</li>
              </ul>
            </div>
            <div className="taglineDiv">
              <p className="tagLine">{movie?.tagline}</p>
            </div>
            <div className="overviewTitle">
              <h2>Overview</h2>
            </div>
            <div className="overview">
              <p className="movieOverview">{movie?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
