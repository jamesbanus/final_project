import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useCallback } from "react";
import { selectToken, selectLogin } from "../accountSlice";
import { getMoviebyID, userFavourites } from "../../../utils/apis";
import {
  selectFavourites,
  setFavourites,
  setFavouritesRating,
} from "../moviesSlice";
import "./Favourites.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Favourite = (props) => {
  const { id, changeScreen, ratingsData } = props;
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectLogin);
  const favourite = useSelector(selectFavourites);
  const dispatch = useDispatch();

  const dispatchFavourites = useCallback(
    async (favouritesObject) => {
      dispatch(setFavourites(favouritesObject));
    },
    [dispatch]
  );

  const getFavouritesData = useCallback(
    async (favouriteResults) => {
      try {
        const favouritesObject = [];
        let n = 0;
        favouriteResults.forEach((id) => {
          const endpoints = [getMoviebyID(id)];
          axios.all(endpoints.map((endpoints) => axios.get(endpoints))).then(
            axios.spread(({ data: favouritesData }) => {
              favouritesObject[n] = favouritesData;
              n++;
              if (n === favouriteResults.length) {
                dispatchFavourites(favouritesObject);
              }
            })
          );
        });
      } catch (error) {
        console.log(error, id);
      }
    },
    [id, dispatchFavourites]
  );
  // get list of favourite IDs for user //

  const grabFavouriteList = useCallback(async () => {
    if (!isLoggedIn) {
      return;
    }
    const api = userFavourites(token);
    try {
      const favouriteResult = await axios.get(api);
      const favouriteList = favouriteResult.data.results;
      const favouriteStatus = favouriteResult.data.status;
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
  }, [token, isLoggedIn, getFavouritesData, dispatchFavourites]);

  useEffect(() => {
    grabFavouriteList();
  }, [isLoggedIn, grabFavouriteList]);

  useEffect(() => {
    for (let index = 0; index < favourite?.length; index++) {
      const element = favourite[index];
      const id = element.id;
      for (let index = 0; index < ratingsData?.length; index++) {
        const element = ratingsData[index];
        const ratingID = element.movie_id;
        const avgRating = element.avgRating;
        if (id === ratingID) {
          dispatch(setFavouritesRating({ id, avgRating }));
        }
      }
    }
  });

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
      <div className="favouritesHeadersDiv">
        <div className="popular">
          <h1 className="subHeading">Popular</h1>
        </div>
        <div className="favourite">
          <h1 className="subHeading">Favourites</h1>
        </div>
      </div>
      <div id="favouriteMovies">
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
              <div className="favRatingBar">
                {item.rating === undefined ? (
                  <CircularProgressbar value={0} text={`?`} background={true} />
                ) : (
                  <CircularProgressbar
                    value={item.rating}
                    text={`${item.rating}%`}
                    background={true}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Favourite;
