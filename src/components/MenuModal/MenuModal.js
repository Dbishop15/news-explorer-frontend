import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./MenuModal.css";
import "../Navigation/Navigation";
import logoutwhite from "../../images/logout-white.svg";
import CurrentUserContext from "../../hooks/CurrentUserContext";

function MenuModal({ onClose, onLoginButton, isLoggedIn, onSignout }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const { currentUser } = useContext(CurrentUserContext);
  const renderAuthenticateContent = () => {
    return (
      <>
        <div id="nav__links" className="menu-modal__links">
          <NavLink to="/" className="menu-modal__links-item" onClick={onClose}>
            Home
          </NavLink>
          <NavLink
            to="/saved-news"
            className="menu-modal__links-item"
            onClick={onClose}
          >
            Saved Articles
          </NavLink>
          <div className="menu-modal__links-item menu-modal__links-item-user">
            <div
              type="text"
              className="menu-modal__links-item-user menu-modal__links-item-username"
            >
              {currentUser.name}
            </div>
            <NavLink to="/" className="menu-modal__link-loggedout">
              <button
                className="menu-modal__links-item-loggedout"
                type="button"
                onClick={onSignout}
              >
                <img src={logoutwhite} alt="log out" />
              </button>
            </NavLink>
          </div>
        </div>
      </>
    );
  };

  const renderUnauthenticateContent = () => {
    return (
      <>
        <div id="nav__links" className="menu-modal__links">
          <a href="/" className="menu-modal__links-item">
            Home
          </a>
          <button
            className="menu-modal__links-button"
            type="button"
            onClick={onLoginButton}
          >
            Sign in
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="modal menu-modal" onClick={handleOverlay}>
      <div className="menu-modal__container">
        <NavLink to="/" className="menu-modal__title">
          NewsExplorer
        </NavLink>
        <button
          className="menu-modal__close"
          type="button"
          onClick={onClose}
        ></button>
        {!isLoggedIn
          ? renderUnauthenticateContent()
          : renderAuthenticateContent()}
      </div>
    </div>
  );
}

export default MenuModal;
