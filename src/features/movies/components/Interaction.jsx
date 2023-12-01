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
import { selectID } from "../moviesSlice";
import { FaStar, FaHeart, FaPlay } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Interaction = (props) => {
  const { movieid, avgrating } = props;

  const faveToggle = useSelector(selectIfFavourite);
  const isLoggedIn = useSelector(selectLogin);
  const movieID = useSelector(selectID);
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

  const faveInfo = { movie_id: movieID, favourite: fave };

  const setFavourite = async () => {
    try {
      const registerFavourite = await axios.post(
        `http://localhost:4000/useractions/add`,
        faveInfo,
        { headers: { token: token } }
      );
      const registerFavouriteStatus = registerFavourite.data.status;
      console.log("set fave", registerFavouriteStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFavourite = async () => {
    try {
      const updateFavourite = await axios.patch(
        `http://localhost:4000/useractions/update/${movieid}`,
        faveInfo,
        { headers: { token: token } }
      );
      const updateFavouriteStatus = updateFavourite.data.status;
      console.log("update fave", updateFavouriteStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavouriteExists = async () => {
    try {
      const favouriteResult = await axios.get(
        `http://localhost:4000/useractions/actions/${movieid}`,
        { headers: { token: token } }
      );
      const favouriteStatus = favouriteResult.data.status;
      //   console.log("status", favouriteStatus);
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

  //   console.log(hasRating);

  const addRating = async (currentRating) => {
    const ratingInfo = { movie_id: movieID, rating: currentRating };
    try {
      const registerRating = await axios.post(
        `http://localhost:4000/useractions/add`,
        ratingInfo,
        { headers: { token: token } }
      );
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
    const ratingInfo = { movie_id: movieID, rating: currentRating };
    try {
      const updateRating = await axios.patch(
        `http://localhost:4000/useractions/update/${movieid}`,
        ratingInfo,
        { headers: { token: token } }
      );
      const updateRatingStatus = updateRating.data.status;
      if (updateRatingStatus === 1) {
        dispatch(callRatingsonChange(!callRating));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkRatingExists = async (currentRating) => {
    try {
      const ratingResult = await axios.get(
        `http://localhost:4000/useractions/actions/${movieid}`,
        { headers: { token: token } }
      );
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
