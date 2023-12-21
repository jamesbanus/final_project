import "./LogoutModal.scss";
import { closeLogin } from "../modalSlice";
import { setLogIn, clearToken } from "../accountSlice";
import { useDispatch } from "react-redux";

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
          <div className="formTitle">
            <p>Account Management</p>
          </div>
          <div className="logoutContainer">
            <div className="logoutButtonDiv">
              <button
                type="submit"
                className="logoutButton"
                onClick={() => {
                  dispatch(setLogIn());
                  dispatch(closeLogin());
                  dispatch(clearToken());
                }}
              >
                Log Out
              </button>
            </div>
            <div className="changePasswordButtonDiv">
              <button
                type="submit"
                className="changePasswordButton"
                //   onClick={() => {
                //     dispatch(setLogIn());
                //     dispatch(closeLogin());
                //     dispatch(clearToken());
                //   }}
              >
                Change Password
              </button>
            </div>
            <div className="deleteAccountButtonDiv">
              <button
                type="submit"
                className="deleteAccountButton"
                //   onClick={() => {
                //     dispatch(setLogIn());
                //     dispatch(closeLogin());
                //     dispatch(clearToken());
                //   }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LogoutModal;
