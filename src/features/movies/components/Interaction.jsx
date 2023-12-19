import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../modalSlice";
import {
  checkIfFavourite,
  selectIfFavourite,
  setRating,
  callRatingsonChange,
  selectRating,
  setHover,
  selectHover,
  selectCallRatingsonChange,
} from "../controlsSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectLogin, selectToken } from "../accountSlice";
import { FaStar, FaHeart, FaPlay } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  checkUserData,
  setFavourites,
  setRatings,
  updateFavourites,
  updateRatings,
} from "../../../utils/apis";

const Interaction = (props) => {
  const { movieid, avgrating } = props;

  const faveToggle = useSelector(selectIfFavourite);
  const isLoggedIn = useSelector(selectLogin);
  const token = useSelector(selectToken);
  const rating = useSelector(selectRating);
  const hover = useSelector(selectHover);
  const callRating = useSelector(selectCallRatingsonChange);

  const dispatch = useDispatch();

  const notify = (message) => toast(`Please Log In to set ${message}!`);

  /// Favourite Functions //////////////////////////

  let fave;

  if (faveToggle) {
    fave = 0;
  } else {
    fave = 1;
  }

  const setFavourite = async () => {
    const api = setFavourites(token, movieid, fave);
    try {
      await axios.post(api);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFavourite = async () => {
    const api = updateFavourites(token, movieid, fave);
    try {
      await axios.patch(api);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavouriteExists = async () => {
    const api = checkUserData(token, movieid);
    try {
      const favouriteResult = await axios.get(api);
      const favouriteStatus = favouriteResult.data.status;
      if (favouriteStatus === 1) {
        updateFavourite();
      } else {
        setFavourite();
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////////

  /// Ratings Functions /////////////////

  const addRating = async (currentRating) => {
    const api = setRatings(token, movieid, currentRating);
    try {
      const registerRating = await axios.post(api);
      const registerRatingStatus = registerRating.data.status;
      if (registerRatingStatus === 1) {
        dispatch(callRatingsonChange(!callRating));
      }
      console.log(registerRatingStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRating = async (currentRating) => {
    const api = updateRatings(token, movieid, currentRating);
    try {
      const updateRating = await axios.patch(api);
      const updateRatingStatus = updateRating.data.status;
      if (updateRatingStatus === 1) {
        dispatch(callRatingsonChange(!callRating));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkRatingExists = async (currentRating) => {
    const api = checkUserData(token, movieid);
    try {
      const ratingResult = await axios.get(api);
      const ratingStatus = ratingResult.data.status;
      if (ratingStatus === 1) {
        updateRating(currentRating);
      } else {
        addRating(currentRating);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   console.log(rating);

  return (
    <>
      <div className="interactionContainer">
        <div id="ratingBar">
          {avgrating === undefined ? (
            <CircularProgressbar value={0} text={`?`} background={true} />
          ) : (
            <CircularProgressbar
              value={avgrating}
              text={`${avgrating}%`}
              background={true}
            />
          )}
        </div>
        <div className="ratingsDiv">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <FaStar
                key={index}
                size={30}
                className="ratings"
                // value={currentRating}
                onClick={() => {
                  if (!isLoggedIn) {
                    notify("Ratings");
                  } else {
                    dispatch(setRating(currentRating));
                    checkRatingExists(currentRating);
                  }
                }}
                color={
                  currentRating <= (hover || rating) ? "#13dafb" : "#ffffff"
                }
                onMouseEnter={() => dispatch(setHover(currentRating))}
                onMouseLeave={() => dispatch(setHover(null))}
              />
            );
          })}
        </div>
        <div className="favouriteDiv">
          <FaHeart
            size={30}
            onClick={() => {
              if (!isLoggedIn) {
                notify("Favourites");
              } else {
                dispatch(checkIfFavourite(!faveToggle));
                checkFavouriteExists();
              }
            }}
            color={faveToggle ? "#13dafb" : "#ffffff"}
            alt="favourite"
            className="favourite"
          />
          <ToastContainer />
        </div>
        <div className="playButtonDiv">
          <FaPlay
            size={30}
            className="playButton"
            onClick={() => dispatch(openModal())}
          />
          <div className="wording">
            <p onClick={() => dispatch(openModal())}> Play Trailer </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interaction;
