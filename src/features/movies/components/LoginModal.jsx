import "./LoginModal.scss";
import { closeLogin } from "../modalSlice";
import { useSelector, useDispatch } from "react-redux";

const LoginModal = (props) => {
  const { trailerKey } = props;
  const dispatch = useDispatch();

  return (
    <>
      <aside className="loginModalContainer">
        <div className="modal">
          <div className="btnContainer">
            <button
              type="button"
              className="exitButton"
              onClick={() => dispatch(closeLogin())}
            >
              X
            </button>
          </div>
          <div className="formTitle">
            <p>Welcome! Log In</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LoginModal;
