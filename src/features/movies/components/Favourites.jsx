import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";
import { selectToken, selectLogin } from "../accountSlice";
import { getMoviebyID } from "../../../utils";
import { selectFavourites, setFavourites } from "../moviesSlice";
import "./Favourites.scss";

const Favourite = (props) => {
  const { id, changeScreen } = props;
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLogin);
  const favourite = useSelector(selectFavourites);
  const dispatch = useDispatch();

  const dispatchFavourites = (favouritesObject) => {
    dispatch(setFavourites(favouritesObject));
  };

  const getFavouritesData = useCallback(
    async (favouriteResults) => {
      try {
        const favouritesObject = [];
        let n = 0;
        for (let index = 0; index < favouriteResults.length; index++) {
          let id = favouriteResults[index];
          let endpoints = [getMoviebyID(id)];
          axios.all(endpoints.map((endpoints) => axios.get(endpoints))).then(
            axios.spread(({ data: favouritesData }) => {
              favouritesObject[n] = favouritesData;
              n++;
              if (n == favouriteResults.length) {
                dispatchFavourites(favouritesObject);
              }
            })
          );
        }
      } catch (error) {
        console.log(error, id);
      }
    },
    [dispatch, id]
  );

  // get list of favourite IDs for user //

  const grabFavouriteList = async () => {
    if (!isLoggedIn) {
      return;
    }
    try {
      const favouriteResult = await axios.get(
        `http://localhost:4000/useractions/returnFavourites`,
        { headers: { token: token } }
      );
      const favouriteList = favouriteResult.data.results;
      const favouriteStatus = favouriteResult.data.status;
      console.log(favouriteStatus);
      if (favouriteStatus === 0) {
        dispatchFavourites(null);
        return;
      } else {
        const favouriteResults = [];
        let n = 0;
        for (let index = 0; index < favouriteList.length; index++) {
          const element = favouriteList[index];
          if (element.movie_id) {
            favouriteResults[n] = element.movie_id;
            n++;
          }
        }
        getFavouritesData(favouriteResults);
      }
      //   console.log(favouriteResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grabFavouriteList();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <>
        <div className="favouritesError">
          <h1 className="errorMessage">Please Log In to see Favourites!</h1>
        </div>
      </>
    );
  }
  if (!favourite) {
    return (
      <>
        <div className="favouritesError">
          <h1 className="errorMessage">
            Get Favouriting to Populate this Section!
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      {favourite.map((item) => {
        return (
          <div className="favouriteMovie" key={item.id}>
            <img
              className="fMoviePoster"
              src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
              alt={item.title}
              id={item.id}
              onClick={changeScreen}
            />
            <h1 className="fMovieTitle">{item.title}</h1>
          </div>
        );
      })}
    </>
  );
};

export default Favourite;
