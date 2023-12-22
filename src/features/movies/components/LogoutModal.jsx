import "./LogoutModal.scss";
import { closeLogin } from "../modalSlice";
import {
  setLogIn,
  clearToken,
  checkDelete,
  deleteConfirm,
  selectPassword,
  setPassword,
  setMessage,
  selectMessage,
  clearInputs,
  changePassword,
  checkPasswordChange,
  setNewPassword,
  selectPassword2,
  selectPassword3,
  confirmNewPassword,
} from "../accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updatePassword } from "../../../utils/apis";
import axios from "axios";
import { selectToken } from "../accountSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutModal = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isDeleteClicked = useSelector(checkDelete);
  const password = useSelector(selectPassword);
  const message = useSelector(selectMessage);
  const changePasswordSelected = useSelector(checkPasswordChange);
  const password2 = useSelector(selectPassword2);
  const password3 = useSelector(selectPassword3);

  const notifyPswChg = () => toast(`Password Successfully Changed!`);

  const passwordChange = async () => {
    if (password2 !== password3) {
      dispatch(setMessage("Passwords do not match"));
      return;
    }
    if (!password2 || !password3) {
      dispatch(setMessage("Enter new Password"));
      return;
    }
    if (password2 === password) {
      dispatch(setMessage("New Password must be different"));
      return;
    }
    const api = updatePassword(token, password, password2);
    try {
      const updateResult = await axios.patch(api);
      const updateStatus = updateResult.data.status;
      if (updateStatus === 0) {
        dispatch(setMessage("Password Incorrect"));
      }

      if (updateStatus === 1) {
        notifyPswChg();
        dispatch(changePassword());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    if (!password || password.length === 0) {
      const message = "Enter Password";
      dispatch(setMessage(message));
      return;
    }
    const api = deleteUser(token, password);
    try {
      const deleteResult = await axios.delete(api);
      const deleteStatus = deleteResult.data.status;
      console.log(deleteResult.data.status);
      if (deleteStatus === 0) {
        dispatch(setMessage("Password Incorrect"));
      }

      if (deleteStatus === 1) {
        dispatch(setLogIn());
        dispatch(closeLogin());
        dispatch(clearInputs());
        dispatch(deleteConfirm());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <aside className="logoutModalContainer">
        <div className="modal">
          <div className="btnContainer">
            <button
              type="button"
              className="exitButton"
              onClick={() => {
                dispatch(closeLogin());
                dispatch(clearInputs());
                if (isDeleteClicked) {
                  dispatch(deleteConfirm());
                }
                if (changePasswordSelected) {
                  dispatch(changePassword());
                }
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
                  dispatch(clearInputs());
                  if (isDeleteClicked) {
                    dispatch(deleteConfirm());
                  }
                  if (changePasswordSelected) {
                    dispatch(changePassword());
                  }
                }}
              >
                Log Out
              </button>
            </div>
            <div className="changePasswordButtonDiv">
              <button
                type="submit"
                className="changePasswordButton"
                onClick={() => {
                  dispatch(changePassword());
                  dispatch(clearInputs());
                }}
                style={
                  isDeleteClicked
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
              >
                {changePasswordSelected ? "Cancel" : "Change Password"}
              </button>
            </div>
            {changePasswordSelected ? (
              <div className="passwordChangeDiv">
                <label htmlFor="psw1" className="psw1Label">
                  Current Password
                </label>
                <input
                  value={password || ""}
                  type="password"
                  placeholder="Enter Current Password"
                  name="psw"
                  required
                  className="enterOldPswInput"
                  onInput={(e) => dispatch(setPassword(e.target.value))}
                />
                <label htmlFor="psw2" className="psw2Label">
                  New Password
                </label>
                <input
                  value={password2 || ""}
                  type="password"
                  placeholder="Enter New Password"
                  name="psw2"
                  required
                  className="enterNewPswInput"
                  onInput={(e) => dispatch(setNewPassword(e.target.value))}
                />
                <label htmlFor="psw3" className="psw3Label">
                  Confirm New Password
                </label>
                <input
                  value={password3 || ""}
                  type="password"
                  placeholder="Confirm New Password"
                  name="psw3"
                  required
                  className="confirmNewPswInput"
                  onInput={(e) => dispatch(confirmNewPassword(e.target.value))}
                />
                <p className="message">{message}</p>
                <div className="confirmChangePswButtonDiv">
                  <button
                    type="submit"
                    className="confirmChangePswButton"
                    onClick={() => {
                      passwordChange();
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            ) : null}
            <div className="deleteAccountButtonDiv">
              <button
                type="submit"
                className="deleteAccountButton"
                onClick={() => {
                  dispatch(deleteConfirm());
                  dispatch(clearInputs());
                }}
                style={
                  changePasswordSelected
                    ? { pointerEvents: "none" }
                    : { pointerEvents: "auto" }
                }
              >
                {isDeleteClicked ? "Cancel" : "Delete Account"}
              </button>
            </div>
            {isDeleteClicked ? (
              <div className="deleteConfirmDiv">
                <div className="checkDeleteTitle">
                  <p>Enter password to confirm account deletion</p>
                </div>
                <div className="pswDeleteInputDiv">
                  <input
                    value={password || ""}
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    required
                    className="pswDeleteInput"
                    onInput={(e) => dispatch(setPassword(e.target.value))}
                  />
                </div>
                <p className="message">{message}</p>
                <div className="deleteButtonDiv">
                  <button
                    type="submit"
                    className="deleteAccountConfirmButton"
                    onClick={deleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
};

export default LogoutModal;
