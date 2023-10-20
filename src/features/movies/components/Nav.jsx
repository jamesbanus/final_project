import "./Nav.scss";
import logo from "./../../../assets/Logo.png";
import login from "./../../../assets/login.png";
import { useSelector, useDispatch } from "react-redux";
import {
  openLogin,
  selectLoginOpen,
  openLogout,
  selectLogoutOpen,
} from "../modalSlice";
import { selectLogin } from "../accountSlice";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";

const Nav = (props) => {
  const { changeScreen } = props;
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(selectLoginOpen);
  const isLoggedOut = useSelector(selectLogin);

  return (
    <>
      {isLoginOpen && !isLoggedOut && <LoginModal />}
      {isLoginOpen && isLoggedOut && <LogoutModal />}
      <div id="navBar">
        <div className="logoDiv" onClick={changeScreen}>
          <img className="logo" src={logo} alt="siteLogo" />
        </div>
        <div id="LoginButton" onClick={() => dispatch(openLogin())}>
          <img className="login" src={login} alt="loginLogo" />
        </div>
      </div>
    </>
  );
};

export default Nav;
