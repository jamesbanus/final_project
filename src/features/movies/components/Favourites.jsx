import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";
import { selectToken, selectLogin } from "../accountSlice";
import { getMoviebyID } from "../../../utils";
import { selectFavourites, setFavourites } from "../moviesSlice";
import "./Favourites.scss";

const Favourite = (props) => {
  const { id } = props;
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
        const favouritesObject = {};
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
      const favouriteResults = [];
      let n = 0;
      for (let index = 0; index < favouriteList.length; index++) {
        const element = favouriteList[index];
        if (element.movie_id) {
          favouriteResults[n] = element.movie_id;
          n++;
        }
      }
      //   console.log(favouriteResults);
      getFavouritesData(favouriteResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    grabFavouriteList();
    console.log("I fire once", Date.now());
  }, [isLoggedIn]);

  const faveArray = Object.values(favourite);

  console.log(faveArray);

  if (!isLoggedIn) {
    return <></>;
  }
  return (
    <>
      {faveArray.map((item) => {
        return (
          <div className="favouriteMovie" key={item.id}>
            <img
              className="fMoviePoster"
              src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
              alt={item.title}
              id={item.id}
              //   onClick={changeScreen}
            />
            <h1 className="fMovieTitle">{item.title}</h1>
          </div>
        );
      })}
    </>
  );
};

export default Favourite;
