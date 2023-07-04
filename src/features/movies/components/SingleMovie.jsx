import "./SingleMovie.scss";
import { apiAuth, movieByID1, movieByID2, releaseDate2 } from "../../../utils";
import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { selectMovie, setMovie, selectCert, setCert } from "../moviesSlice";
import { useSelector, useDispatch } from "react-redux";

const SingleMovie = (props) => {
  const { changeScreen, id } = props;
  const movie = useSelector(selectMovie);
  const cert = useSelector(selectCert);
  const releaseDate = new Date(movie?.release_date).getFullYear();

  let certInfo = cert?.find((certificate) => certificate.iso_3166_1 === "GB");

  if (certInfo === undefined) {
    certInfo = cert?.find((certificate) => certificate.iso_3166_1 === "US");
  }
  // else {
  //   certInfo = cert?.find((certificate) => certificate.iso_3166_1 === "GB");
  // }

  const certificate = certInfo?.release_dates.find(
    (certificate) => certificate.certification !== ""
  );

  console.log(certificate);

  const dispatch = useDispatch();

  let endpoints = [
    movieByID1 + id + movieByID2,
    movieByID1 + id + releaseDate2,
  ];

  const axiosInstance = axios.create({
    headers: {
      Authorization: apiAuth,
    },
  });

  const getMovieData = useCallback(async () => {
    console.log("get movie ran", Date.now(), id);
    try {
      axios
        .all(endpoints.map((endpoints) => axiosInstance.get(endpoints)))
        .then(
          axios.spread(({ data: movieData }, { data: certData }) => {
            console.log({ movieData, certData });
            dispatch(setCert(certData.results));
            dispatch(setMovie(movieData));
          })
        );
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
              <h3>{certificate?.certification}</h3>
            </div>
            <div className="overviewTitle">
              <h2>Overview</h2>
            </div>
            <div className="overview">
              <h3 className="movieOverview">{movie?.overview}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleMovie;
