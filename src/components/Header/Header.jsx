import { NavLink } from "react-router-dom";
import './Header.scss'
import logo from "../../images/dark-logo.png";

const Header = ({ hasUser, onLogout }) => {
  const ubication = window.location.pathname;

  return (
    <div className="header-block w-100 container-fluid py-3 d-flex align-items-center justify-content-around">
      <img src={logo} alt="logo" style={{ height: '4vh' }} />
      <h1 className="header-block__title text-center">DashBoard upload design projects</h1>
      {ubication === "/" ? null : (
        <NavLink exact to="/">
          <p>Multiple Upload</p>
        </NavLink>
      )}
      {hasUser ? (
        <button className="header-block__logout btn btn-default" onClick={onLogout}>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Header;
