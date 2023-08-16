import "./Nav.scss";
import logo from "./../../../assets/Logo.png";
import login from "./../../../assets/login.png";

const Nav = () => {
  return (
    <>
      <div id="navBar">
        <div className="logoDiv">
          <img className="logo" src={logo} alt="siteLogo" />
        </div>
        <div id="LoginButton">
          <img className="login" src={login} alt="loginLogo" />
        </div>
      </div>
    </>
  );
};

export default Nav;
