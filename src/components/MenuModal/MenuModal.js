import { Link } from "react-router-dom";
import "./MenuModal.css";

function MenuModal({ onClose, onLoginButton }) {
  return (
    <div className="modal menu-modal">
      <div className="menu-modal__container">
        <Link to="/" className="menu-modal__title">
          NewsExplorer
        </Link>
        <button
          className="menu-modal__close"
          type="button"
          onClick={onClose}
        ></button>
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
      </div>
    </div>
  );
}

export default MenuModal;
