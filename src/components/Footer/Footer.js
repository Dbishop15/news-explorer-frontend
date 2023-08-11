import "./Footer.css";
import github from "../../images/github-icon.svg";
import facebook from "../../images/fb-icon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">©2023 Supersite, Powered by News API</p>
      <div className="footer__container">
        <ul className="footer__container-content footer__container-content-links">
          <li className="footer__container-item">
            <a href="/" className="footer__container-link">
              Home
            </a>
          </li>
          <a href="https://tripleten.com/" className="footer__container-link">
            Practicum
          </a>
        </ul>
        <ul className="footer__container-content">
          <li>
            <a href="https://github.com" className="footer__content-icon">
              <img src={github} alt="github-icon" />
            </a>
          </li>
          <li>
            <a href="https://facebook.com" className="footer__content-icon">
              <img src={facebook} alt="fb-icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
