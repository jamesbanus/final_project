import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../modalSlice";
import play from "./../../../assets/play.png";
import favourite from "./../../../assets/favourite.png";
import favouriteFilled from "./../../../assets/favouriteFilled.png";
import star from "./../../../assets/star.png";
import starFilled from "./../../../assets/starFilled.png";

const Interaction = () => {
  const dispatch = useDispatch();

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
          <img src={favourite} alt="favourite" className="favourite" />
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
