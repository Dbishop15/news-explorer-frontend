import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logout from "../../images/logout-white.svg";

function Navigation({ onLoginButton, isLoggedIn, onSignout }) {
  const renderAuthenticateContent = () => {
    return (
      <>
        <a href="/" className="nav__links-item-login">
          Home
        </a>
        <NavLink to="/saved-news" className="nav__links-item-login">
          Saved Articles
        </NavLink>
        <div className="nav__links-item nav__links-item-user">
          <div type="text" className="nav__links-item-username">
            Elise
          </div>
          <NavLink to="/">
            <button
              className="nav__links-item-loggedout"
              type="button"
              onClick={onSignout}
            >
              <img src={logout} alt="log out" />
            </button>
          </NavLink>
        </div>
      </>
    );
  };

  const renderUnauthenticateContent = () => {
    return (
      <>
        <a href="/" className="nav__links-item">
          Home
        </a>
        <button
          className="nav__links-button"
          type="button"
          onClick={onLoginButton}
        >
          Sign in
        </button>
      </>
    );
  };

  return (
    <nav id="nav__links" className="nav__links nav__links-hidden">
      {!isLoggedIn
        ? renderUnauthenticateContent()
        : renderAuthenticateContent()}
    </nav>
  );
}

export default Navigation;
