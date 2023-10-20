import "./LoginModal.scss";
import { closeLogin } from "../modalSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setEmail,
  selectEmail,
  setPassword,
  selectPassword,
  setLogIn,
  clearInputs,
  setMessage,
  selectMessage,
} from "../accountSlice";
import axios from "axios";
// import { fontAwesome } from "react-fontawesome";

const LoginModal = (props) => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  console.log(message);

  const accountInfo = { email: email, password: password };

  console.log(accountInfo);

  const register = async () => {
    try {
      const registerResult = await axios.post(
        `http://localhost:4000/account/register`,
        accountInfo
      );
      const registerStatus = registerResult.data.status;
      console.log(registerStatus);
      dispatch(setMessage(registerStatus));
      if (registerStatus === 1) {
        dispatch(setLogIn());
        dispatch(clearInputs());
        dispatch(closeLogin());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const loginResult = await axios.post(
        `http://localhost:4000/account/login`,
        accountInfo
      );
      const loginStatus = loginResult.data.status;
      console.log(loginStatus);
      dispatch(setMessage(loginStatus));
      if (loginStatus === 1) {
        dispatch(setLogIn());
        dispatch(clearInputs());
        dispatch(closeLogin());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <aside className="loginModalContainer">
        <div className="modal">
          <div className="btnContainer">
            <button
              type="button"
              className="exitButton"
              onClick={() => {
                dispatch(closeLogin());
                dispatch(clearInputs());
              }}
            >
              X
            </button>
          </div>
          <div className="formTitle">
            <p>Login</p>
          </div>
          <div className="loginContainer">
            <label htmlFor="uname" className="unameLabel">
              Email
            </label>
            <input
              value={email || ""}
              type="text"
              placeholder="Enter Email"
              name="uname"
              required
              className="unameInput"
              onInput={(e) => dispatch(setEmail(e.target.value))}
            />
            <label htmlFor="psw" className="pswLabel">
              Password
            </label>
            <input
              value={password || ""}
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              className="pswInput"
              onInput={(e) => dispatch(setPassword(e.target.value))}
            />
            <p className="message">{message}</p>
            <i className="far fa-eye" />
            <div className="loginButtonDiv">
              <button type="submit" className="loginButton" onClick={login}>
                Login
              </button>
            </div>
            <p> or </p>
            <div className="registerButtonDiv">
              <button
                type="submit"
                className="registerButton"
                onClick={register}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LoginModal;
