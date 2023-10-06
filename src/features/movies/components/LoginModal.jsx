import "./LoginModal.scss";
import { closeLogin } from "../modalSlice";
import { useSelector, useDispatch } from "react-redux";
// import { fontAwesome } from "react-fontawesome";

const LoginModal = (props) => {
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
            <p>Login</p>
          </div>
          <div className="loginContainer">
            <label for="uname" className="unameLabel">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
              className="unameInput"
            />
            <label for="psw" className="pswLabel">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              className="pswInput"
            />
            <i class="far fa-eye" />
            <div className="loginButtonDiv">
              <button type="submit" className="loginButton">
                Login
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LoginModal;
