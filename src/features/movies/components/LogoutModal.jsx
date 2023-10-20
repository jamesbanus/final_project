import "./LogoutModal.scss";
import { closeLogin } from "../modalSlice";
import { setLogIn } from "../accountSlice";
import { useSelector, useDispatch } from "react-redux";

const LogoutModal = () => {
  const dispatch = useDispatch();

  return (
    <>
      <aside className="logoutModalContainer">
        <div className="modal">
          <div className="btnContainer">
            <button
              type="button"
              className="exitButton"
              onClick={() => {
                dispatch(closeLogin());
              }}
            >
              X
            </button>
          </div>
          <div className="logoutButtonDiv">
            <button
              type="submit"
              className="logoutButton"
              onClick={() => {
                dispatch(setLogIn());
                dispatch(closeLogin());
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LogoutModal;
