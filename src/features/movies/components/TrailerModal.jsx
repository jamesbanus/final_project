import "./TrailerModal.scss";
import { closeModal } from "../modalSlice";
import { useSelector, useDispatch } from "react-redux";

const TrailerModal = (props) => {
  const { trailerKey } = props;
  const dispatch = useDispatch();

  return (
    <>
      <aside className="modalContainer">
        <div className="modal">
          <div className="btnContainer">
            <button
              type="button"
              className="exitButton"
              onClick={() => dispatch(closeModal())}
            >
              X
            </button>
          </div>
          <iframe
            className="video"
            title="Youtube player"
            allowFullScreen
            src={`https://youtube.com/embed/${trailerKey}?autoplay=0`}
          ></iframe>
        </div>
      </aside>
    </>
  );
};

export default TrailerModal;
