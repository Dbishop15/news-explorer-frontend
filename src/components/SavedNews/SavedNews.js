import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "../NewsCardList/NewsCardList.css";
import "../NewsCard/NewsCard.css";
import "./SavedNews.css";
import cardsample1 from "../../images/card-sample1.png";
import cardsample2 from "../../images/card-sample2.png";
import cardsample3 from "../../images/card-sample3.png";

function SavedNews({ articles, savedArticles }) {
  const handleMouseEnter = (evt) => {
    if (evt.target.classList.contains("card__trash-button")) {
      evt.target.parentElement
        .querySelector(".card__hover-text")
        .classList.remove("card__hover-text-hidden");
    }
  };
  const handleMouseLeave = (evt) => {
    evt.target.parentElement
      .querySelector(".card__hover-text")
      .classList.add("card__hover-text-hidden");
  };
  return (
    <section className="save-news">
      <SavedNewsHeader articles={articles} />
      <NewsCardList />
      <section className="cards">
        <div className="cards__container">
          <h2 className="cards__container-title">Search Results:</h2>
          <ul className="cards__container-list">
            <li className="card">
              <button
                className="card__trash-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                type="button"
              ></button>
              <button
                className={`card__keyword-button ${
                  !savedArticles ? "" : "card__keyword-button-hidden"
                } `}
                type="button"
              >
                Flower
              </button>

              <button
                className="card__hover-text card__hover-text-hidden"
                type="button"
              >
                Remove from saved
              </button>

              <a
                href="https://www.theguardian.com/commentisfree/2023/aug/07/email-dread-pigeons-message-inbox"
                className="card__link"
              >
                <img
                  className="card__image"
                  src={cardsample1}
                  alt="cardsample1"
                />
                <p className="card__date">2023-08-07T06:00:32Z</p>
                <h3 className="card__title">
                  Email makes my fingers tingle and my stomach drop with dread.
                  Can’t we go back to pigeons? | Emma Beddington
                </h3>
                <p className="card__text">
                  How often does a new message in your inbox fill you with joy?
                  For me, it’s about every 20 yearsThe recent research on the
                  “best” time to send an email – it’s Sunday 3pm to 6pm if you
                  are a monster who doesn’t care about anything except getting
                  your message re…
                </p>
                <p className="card__source">The Guardian</p>
              </a>
            </li>
            <li className="card">
              <button
                className="card__trash-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                type="button"
              ></button>
              <button
                className={`card__keyword-button ${
                  !savedArticles ? "" : "card__keyword-button-hidden"
                } `}
                type="button"
              >
                Flower
              </button>
              <button
                className="card__hover-text card__hover-text-hidden"
                type="button"
              >
                Remove from saved
              </button>

              <a
                href="https://www.businessinsider.com/doordash-non-restaurant-retail-deliveries-increase-groceries-flowers-2023-8"
                className="card__link"
              >
                <img
                  className="card__image"
                  src={cardsample2}
                  alt="cardsample2"
                />
                <p className="card__date">2023-08-09T17:55:52Z</p>
                <h3 className="card__title">
                  New DoorDash customers are turning to the app for grocery
                  deliveries and flowers, not just restaurant meals
                </h3>
                <p className="card__text">
                  DoorDash's roots are in meal deliveries, but it also has more
                  than 100,00 retail stores on its app, surpassing Instacart.
                </p>
                <p className="card__source">Business Insider</p>
              </a>
            </li>
            <li className="card">
              <button
                className="card__trash-button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                type="button"
              ></button>
              <button
                className={`card__keyword-button ${
                  !savedArticles ? "" : "card__keyword-button-hidden"
                } `}
                type="button"
              >
                Flower
              </button>
              <button
                className="card__hover-text card__hover-text-hidden"
                type="button"
              >
                Remove from saved
              </button>
              <a
                href="https://www.theguardian.com/lifeandstyle/2023/aug/04/the-joy-of-gardensitting-very-little-work-and-a-lot-of-reward"
                className="card__link"
              >
                <img
                  className="card__image"
                  src={cardsample3}
                  alt="cardsample3"
                />
                <p className="card__date">2023-08-04T10:00:11Z</p>
                <h3 className="card__title">
                  The joy of gardensitting – very little work and a lot of
                  reward
                </h3>
                <p className="card__text">
                  You’ll have an over-eager list of instructions to follow, but
                  if in doubt follow these golden rulesAh, the great British
                  summer. Perhaps you’re lucky enough to escape it all with a
                  holiday, or maybe you’re staying at home and have volunteered
                  to look after so…
                </p>
                <p className="card__source">The Guardian</p>
              </a>
            </li>
          </ul>
        </div>
        <button type="button" className="cards__button">
          Show More
        </button>
      </section>
    </section>
  );
}

export default SavedNews;
