import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logoutwhite from "../../images/logout-white.svg";
import logoutblack from "../../images/logout.svg";
import { useMatch } from "react-router-dom";
import CurrentUserContext from "../../hooks/CurrentUserContext";

function Navigation({ onLoginButton, isLoggedIn, onSignout, handleHomeClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  const match = useMatch("/");
  const renderAuthenticateContent = () => {
    return (
      <>
        <NavLink
          to="/"
          className={match ? "nav__links-item" : "nav__links-item-saved-news"}
        >
          Home
        </NavLink>
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
              : "nav__links-item-saved-news nav__links-item-user-saved-news"
          }
        >
          <div
            type="text"
            className={
              match
                ? "nav__links-item-user nav__links-item-username"
                : "nav__links-item-user-saved-news nav__links-item-username "
            }
          >
            {currentUser.name}
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
        <NavLink to="/" className="nav__links-item">
          Home
        </NavLink>
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
