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
  setToken,
  deleteConfirm,
  changePassword,
  checkDelete,
  checkPasswordChange,
  checkLimitUser,
  limitUser,
  checkRegisterRequest,
  registerRequest,
  checkPassword,
  checkPasswordMatch,
} from "../accountSlice";
import { loginUser, registerUser } from "../../../utils/apis";
import axios from "axios";
import Joi from "joi";
import { useCookies } from "react-cookie";
import { tlds } from "@hapi/tlds";

const LoginModal = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const isDeleteClicked = useSelector(checkDelete);
  const changePasswordSelected = useSelector(checkPasswordChange);
  const limit = useSelector(checkLimitUser);
  const [cookies, setCookie] = useCookies(["user"]);
  const registerRequested = useSelector(checkRegisterRequest);
  const passwordCheck = useSelector(checkPasswordMatch);

  const schema = Joi.object({
    Email: Joi.string()
      .email({
        // minDomainSegments: 2,
        tlds: { allow: tlds },
      })
      .required(),
    Password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{6,25}$"))
      .required()
      .messages({
        "string.pattern.base": `Password should be between 6 to 25 characters and contain letters or numbers only`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
      }),
  });

  const register = async () => {
    if (!email || email.length === 0) {
      const message = "Enter Email";
      dispatch(setMessage(message));
      return;
    }
    if (!password || password.length === 0) {
      const message = "Enter Password";
      dispatch(setMessage(message));
      return;
    }
    if (passwordCheck !== password) {
      const message = "Passwords do not match";
      dispatch(setMessage(message));
      return;
    }
    try {
      await schema.validateAsync({ Email: email, Password: password });
      const api = registerUser(email, password);
      try {
        const registerResult = await axios.post(api);
        const registerStatus = registerResult.data.status;
        const loginToken = registerResult.data.token;
        dispatch(setMessage(registerStatus));
        if (registerStatus === 1) {
          dispatch(setLogIn());
          dispatch(clearInputs());
          dispatch(closeLogin());
          dispatch(setToken(loginToken));
          dispatch(registerRequest(false));
          setCookie("user", loginToken, { path: "/" });
        }
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      dispatch(setMessage(err.message));
    }
  };

  const login = async () => {
    if (!email || email.length === 0) {
      const message = "Enter Email";
      dispatch(setMessage(message));
      return;
    }
    if (!password || password.length === 0) {
      const message = "Enter Password";
      dispatch(setMessage(message));
      return;
    }
    const api = loginUser(email, password);
    try {
      const loginResult = await axios.post(api);
      const loginStatus = loginResult.data.status;
      const loginToken = loginResult.data.token;
      dispatch(setMessage(loginStatus));
      if (loginStatus === 200) {
        dispatch(limitUser());
        setTimeout(() => {
          dispatch(limitUser());
        }, 60000);
      }
      if (loginStatus === 1) {
        dispatch(setLogIn());
        dispatch(clearInputs());
        dispatch(closeLogin());
        dispatch(registerRequest(false));
        dispatch(setToken(loginToken));
        setCookie("user", loginToken, { path: "/" });
        if (isDeleteClicked) {
          dispatch(deleteConfirm());
        }
        if (changePasswordSelected) {
          dispatch(changePassword());
        }
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
                dispatch(registerRequest(false));
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
              <button
                disabled={limit}
                type="submit"
                className="loginButton"
                onClick={login}
              >
                Login
              </button>
            </div>
            <p> or </p>
            {!registerRequested ? (
              <div className="registerButtonDiv">
                <button
                  type="submit"
                  className="registerButton"
                  onClick={() => {
                    dispatch(registerRequest(true));
                  }}
                >
                  Register
                </button>
              </div>
            ) : (
              <>
                <label htmlFor="psw2" className="pswLabel2">
                  Re-Enter Password
                </label>
                <input
                  value={passwordCheck || ""}
                  type="password"
                  placeholder="Enter Password"
                  name="psw2"
                  required
                  className="pswInput2"
                  onInput={(e) => dispatch(checkPassword(e.target.value))}
                />
                <p className="message2">{message}</p>
                <i className="far fa-eye" />
                <div className="registerButtonDiv">
                  <button
                    type="submit"
                    className="registerButton"
                    onClick={register}
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default LoginModal;
