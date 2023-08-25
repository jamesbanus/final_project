import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../modalSlice";
import play from "./../../../assets/play.png";

const Interaction = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="interactionContainer">
        <div className="playButtonDiv">
          <img
            className="playButton"
            onClick={() => dispatch(openModal())}
            src={play}
          />
          <p onClick={() => dispatch(openModal())}>Play Trailer</p>
        </div>
      </div>
    </>
  );
};

export default Interaction;
