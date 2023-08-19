import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logoutwhite from "../../images/logout-white.svg";
import logoutblack from "../../images/logout.svg";

import { useMatch } from "react-router-dom";

function Navigation({ onLoginButton, isLoggedIn, onSignout }) {
  const match = useMatch("/");
  const renderAuthenticateContent = () => {
    return (
      <>
        <a
          href="/"
          className={match ? "nav__links-item" : "nav__links-item-saved-news"}
        >
          Home
        </a>
        <NavLink
          to="/saved-news"
          className={match ? "nav__links-item" : "nav__links-item-saved-news"}
        >
          Saved Articles
        </NavLink>
        <div
          className={
            match
              ? "nav__links-item nav__links-item-user"
              : "nav__links-item-saved-news nav__links-item-user"
          }
        >
          <div
            type="text"
            className={
              match
                ? "nav__links-item-username"
                : "nav__links-item-user-saved-news"
            }
          >
            Elise
          </div>
          <NavLink to="/" className="nav__link-loggedout">
            <button
              className="nav__links-item-loggedout"
              type="button"
              onClick={onSignout}
            >
              <img src={match ? logoutwhite : logoutblack} alt="log out" />
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
