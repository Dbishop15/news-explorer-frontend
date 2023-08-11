import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logout from "../../images/logout.svg";

function Navigation({ onLoginButton, isLoggedIn }) {
  const renderAuthenticateContent = () => {
    return (
      <>
        <NavLink to="/saved-news" className="nav__links-item">
          Saved Articles
        </NavLink>
        <div className="nav__links-item nav__links-item-user">
          <div type="text" className="nav__links-item-username">
            Elise
          </div>
          <NavLink to="/" className="nav__links-item-loggedout">
            {logout}
          </NavLink>
        </div>
      </>
    );
  };

  const renderUnauthenticateContent = () => {
    return (
      <>
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
    <div id="nav__links" className="nav__links nav__links-hidden">
      <a href="/" className="nav__links-item">
        Home
      </a>
      {!isLoggedIn
        ? renderUnauthenticateContent()
        : renderAuthenticateContent()}
    </div>
  );
}

export default Navigation;
