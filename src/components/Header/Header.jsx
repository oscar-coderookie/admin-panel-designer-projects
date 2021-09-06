import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

const Header = ({ hasUser, onLogout }) => {
  const ubication = window.location.pathname;

  return (
    <div className="w-100 container-fluid bg-light py-3 d-flex align-items-center justify-content-around">
      <img src={logo} alt="logo" style={{ height: 60 }} />
      <h1 className="text-center">Panel admin. Diseño</h1>
      {ubication === "/" ? null : (
        <NavLink exact to="/">
          <p>Multiple Upload</p>
        </NavLink>
      )}
      {hasUser ? (
        <button className="btn btn-default" onClick={onLogout}>
          Logout
        </button>
      ) : null}
    </div>
  );
};

export default Header;
