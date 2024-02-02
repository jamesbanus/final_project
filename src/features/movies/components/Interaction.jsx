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
import { checkUserData, setRatings, updateRatings } from "../../../utils/apis";
import { checkFavouriteExists } from "../../../utils/interaction";
import { selectLoginOpen } from "../modalSlice";
import { Tooltip } from "react-tooltip";

const Interaction = (props) => {
  const { movieid, avgrating, trailerKey } = props;

  const faveToggle = useSelector(selectIfFavourite);
  const isLoggedIn = useSelector(selectLogin);
  const token = useSelector(selectToken);
  const rating = useSelector(selectRating);
  const hover = useSelector(selectHover);
  const callRating = useSelector(selectCallRatingsonChange);
  const isLoginOpen = useSelector(selectLoginOpen);

  const dispatch = useDispatch();

  const notify = (message) => toast(`Please Log In to set ${message}!`);

  let fave;

  if (faveToggle) {
    fave = 0;
  } else {
    fave = 1;
  }

  //////////////////////// Ratings Functions /////////////////

  const addRating = async (currentRating) => {
    const api = setRatings(token, movieid, currentRating);
    try {
      const registerRating = await axios.post(api);
      const registerRatingStatus = registerRating.data.status;
      if (registerRatingStatus === 1) {
        dispatch(callRatingsonChange(!callRating));
      }
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

  return (
    <>
      <div className="interactionContainer">
        <div id="ratingBar">
          {avgrating === undefined ? (
            <div data-tooltip-id="ratingToolTip1">
              <CircularProgressbar value={0} text={`?`} background={true} />
            </div>
          ) : (
            <div data-tooltip-id="ratingToolTip2">
              <CircularProgressbar
                value={avgrating}
                text={`${avgrating}%`}
                background={true}
              />
            </div>
          )}
        </div>
        <Tooltip
          id="ratingToolTip1"
          place="top"
          content="Be The First to Rate this Movie"
        />
        <Tooltip
          id="ratingToolTip2"
          place="top"
          content="Average User Rating"
        />
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
                    checkRatingExists(currentRating, token, movieid);
                  }
                }}
                color={
                  currentRating <= (hover || rating) ? "#13dafb" : "#ffffff"
                }
                onMouseEnter={() => dispatch(setHover(currentRating))}
                onMouseLeave={() => dispatch(setHover(null))}
                style={
                  isLoginOpen
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
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
                checkFavouriteExists(token, movieid, fave);
              }
            }}
            color={faveToggle ? "#13dafb" : "#ffffff"}
            alt="favourite"
            className="favourite"
            style={
              isLoginOpen
                ? { pointerEvents: "none" }
                : { pointerEvents: "auto" }
            }
          />
          <ToastContainer />
        </div>

        <div className="playButtonDiv">
          {trailerKey ? (
            <FaPlay
              size={30}
              className="playButton"
              onClick={() => dispatch(openModal())}
              style={
                isLoginOpen
                  ? { pointerEvents: "none" }
                  : { pointerEvents: "auto" }
              }
            />
          ) : (
            <div></div>
          )}
          <div className="wording">
            {trailerKey ? (
              <p
                onClick={() => dispatch(openModal())}
                style={
                  isLoginOpen
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
              >
                {" "}
                Play Trailer{" "}
              </p>
            ) : (
              <p
                style={
                  isLoginOpen
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
              >
                {" "}
                Trailer Unavailable{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interaction;
