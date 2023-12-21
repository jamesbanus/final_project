import "./LogoutModal.scss";
import { closeLogin } from "../modalSlice";
import { setLogIn, clearToken } from "../accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../utils/apis";
import axios from "axios";
import { selectToken } from "../accountSlice";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const deleteAccount = async () => {
    const api = deleteUser(token);
    try {
      const deleteResult = await axios.delete(api);
      const deleteStatus = deleteResult.data.status;
      console.log(deleteResult.data.status);
      //   dispatch(setMessage(loginStatus));
      if (deleteStatus === 1) {
        dispatch(setLogIn());
        dispatch(closeLogin());
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                // onClick={() => {
                //   deleteAccount();
                //   // dispatch(setLogIn());
                //   // dispatch(closeLogin());
                //   // dispatch(clearToken());
                // }}
                onClick={deleteAccount}
              >
                Delete Account
              </button>
            </div>
            <div className="checkDeleteTitle">
              <p>Enter password to confirm account deletion</p>
              <input
                // value={password || ""}
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
                className="pswDeleteInput"
                // onInput={(e) => dispatch(setPassword(e.target.value))}
              />
              <div className="deleteButtonDiv">
                <button
                  type="submit"
                  className="deleteAccountConfirmButton"
                  //   onClick={register}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LogoutModal;
