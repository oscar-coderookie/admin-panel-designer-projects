import { NavLink } from "react-router-dom";
import './Header.scss'
import logo from "../../images/dark-logo.png";

const Header = ({ hasUser, onLogout }) => {
  const ubication = window.location.pathname;

  return (
    <div className="header-block w-100 container-fluid py-3 d-flex align-items-center justify-content-between">
      <img src={logo} alt="logo" className="header-block__logo mx-3"/>
      <h1 className="header-block__title text-center m-0">DashBoard upload design projects</h1>
      {ubication === "/" ? null : (
        <NavLink exact to="/">
          <p>Multiple Upload</p>
        </NavLink>
      )}
      {hasUser ? (
        <button className="header-block__logout btn btn-default mx-3" onClick={onLogout}>
        <span className="fas fa-sign-out-alt mx-2"></span>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Header;
