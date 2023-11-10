import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../modalSlice";
import play from "./../../../assets/play.png";
import favourite from "./../../../assets/favourite.png";
import favouriteFilled from "./../../../assets/favouriteFilled.png";
import star from "./../../../assets/star.png";
import starFilled from "./../../../assets/starFilled.png";
import { setFavouriteImage, selectFavouriteImage } from "../controlsSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectLogin, selectToken } from "../accountSlice";
import { selectID } from "../moviesSlice";

const Interaction = () => {
  const faveToggle = useSelector(selectFavouriteImage);
  const isLoggedIn = useSelector(selectLogin);
  const movieID = useSelector(selectID);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  console.log(faveToggle);

  const favouriteImageName = faveToggle ? favouriteFilled : favourite;

  const notify = () => toast("Please Log In to set Favourites!");

  const faveInfo = { movie_id: movieID, favourite: faveToggle };

  const setFavourite = async () => {
    try {
      const registerFavourite = await axios.post(
        `http://localhost:4000/useractions/add`,
        faveInfo
      );
      const registerFavouriteStatus = registerFavourite.data.status;
      console.log(registerFavouriteStatus);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="interactionContainer">
        <div className="ratingsDiv">
          <img src={star} alt="star" className="ratings" />
          <img src={star} alt="star" className="ratings" />
          <img src={star} alt="star" className="ratings" />
          <img src={star} alt="star" className="ratings" />
          <img src={star} alt="star" className="ratings" />
          <div className="ratingsInnerDiv">
            <img src={starFilled} alt="starFilled" className="ratingsFilled" />
            <img src={starFilled} alt="starFilled" className="ratingsFilled" />
            <img src={starFilled} alt="starFilled" className="ratingsFilled" />
            <img src={starFilled} alt="starFilled" className="ratingsFilled" />
            <img src={starFilled} alt="starFilled" className="ratingsFilled" />
          </div>
        </div>
        <div className="favouriteDiv">
          <img
            onClick={() => {
              if (!isLoggedIn) {
                notify();
              } else {
                dispatch(setFavouriteImage(!faveToggle));
                setFavourite();
              }
            }}
            src={favouriteImageName}
            alt="favourite"
            className="favourite"
          />
          <ToastContainer />
        </div>
        <div className="playButtonDiv">
          <img
            className="playButton"
            onClick={() => dispatch(openModal())}
            src={play}
          />
          <div className="wording">
            <p onClick={() => dispatch(openModal())}>Play Trailer</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interaction;
