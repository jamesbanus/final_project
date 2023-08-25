import "./Nav.scss";
import logo from "./../../../assets/Logo.png";
import login from "./../../../assets/login.png";
import { useSelector, useDispatch } from "react-redux";
import { openLogin, selectLoginOpen } from "../modalSlice";
import LoginModal from "./LoginModal";

const Nav = (props) => {
  const { changeScreen } = props;
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(selectLoginOpen);

  return (
    <>
      {isLoginOpen && <LoginModal />}
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
