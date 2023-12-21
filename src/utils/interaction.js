import { checkUserData, setFavourites, updateFavourites } from "./apis";
import axios from "axios";

//////// favourites functions ////////////

const setFavourite = async (token, movieid, fave) => {
  const api = setFavourites(token, movieid, fave);
  try {
    await axios.post(api);
  } catch (error) {
    console.log(error);
  }
};

const updateFavourite = async (token, movieid, fave) => {
  const api = updateFavourites(token, movieid, fave);
  try {
    await axios.patch(api);
  } catch (error) {
    console.log(error);
  }
};

const checkFavouriteExists = async (token, movieid, fave) => {
  const api = checkUserData(token, movieid);
  try {
    const favouriteResult = await axios.get(api);
    const favouriteStatus = favouriteResult.data.status;
    if (favouriteStatus === 1) {
      updateFavourite(token, movieid, fave);
    } else {
      setFavourite(token, movieid, fave);
    }
  } catch (error) {
    console.log(error);
  }
};

export { checkFavouriteExists };
