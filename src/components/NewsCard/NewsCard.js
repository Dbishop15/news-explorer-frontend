import React from "react";
import "./NewsCard.css";
import { useMatch } from "react-router-dom";

function NewsCard({
  cardInfo,
  isLoggedIn,
  keyword,
  savedNewsArticles,
  handleSaveArticle,
  handleDeleteArticle,
  handleLoginModal,
  index,
}) {
  const match = useMatch("/");
  const card = {
    keyword: keyword || cardInfo?.keyword,
    title: cardInfo?.title,
    text: cardInfo?.description || cardInfo?.text,
    date: cardInfo?.publishedAt || cardInfo?.date,
    source: cardInfo?.source.name || cardInfo?.source,
    link: cardInfo?.url || cardInfo?.link,
    image: cardInfo?.urlToImage || cardInfo?.image,
    _id: cardInfo?._id || cardInfo?.id,
  };

  const handleMouseEnter = (evt) => {
    if (isLoggedIn && match && evt.target.classList.contains("card__button")) {
      evt.target.parentElement
        .querySelector(".card__hover-text")
        .classList.remove("card__hover-text_active");
    } else if (
      isLoggedIn &&
      match &&
      evt.target.classList.contains("card__button")
    ) {
      evt.target.parentElement
        .querySelector(".card__hover-text")
        .classList.add("card__hover-text_active");
    } else {
      evt.target.parentElement
        .querySelector(".card__hover-text")
        .classList.add("card__hover-text_active");
    }
  };

  const handleMouseLeave = (evt) => {
    evt.target.parentElement
      .querySelector(".card__hover-text")
      .classList.remove("card__hover-text_active");
  };
  const handleBookMarkButtonClick = (evt) => {
    const bookmarkButton =
      evt.target.parentElement.querySelector(".card__button");

    if (bookmarkButton.classList.contains("card__button-save_active")) {
      handleDeleteArticle(card);
      bookmarkButton.classList.remove("card__button-save_active");
    } else {
      handleSaveArticle(card);
      bookmarkButton.classList.add("card__button-save_active");
    }
  };
  const isBookmarked = savedNewsArticles?.some(
    (article) => article.link === card.link
  );
  const cardButtonClassname = isBookmarked
    ? "card__button card__button-save_active"
    : "card__button card__button-save";

  return (
    <li className="card" key={index}>
      {match ? (
        <button
          className={cardButtonClassname}
          type="button"
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={isLoggedIn ? handleBookMarkButtonClick : handleLoginModal}
        ></button>
      ) : (
        <button
          className="card__button card__button-trash"
          type="button"
          onMouseOver={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            handleDeleteArticle(card);
          }}
        ></button>
      )}
      {match ? (
        <button className="card__hover-text" type="button">
          Sign in to save articles
        </button>
      ) : (
        <button className="card__hover-text" type="button">
          Remove from saved
        </button>
      )}
      <button
        className={
          match ? "card__keyword-button-hidden" : "card__keyword-button"
        }
        type="button"
      >
        {cardInfo.keyword}
      </button>
      <a
        href={card?.link}
        target="_blank"
        rel="noreferrer"
        className="card__link"
      >
        <img className="card__image" src={card?.image} alt={card?.title} />
        <p className="card__date">{card?.date}</p>
        <h3 className="card__title">{card?.title}</h3>
        <p className="card__text">{card?.text}</p>
        <p className="card__source">{card?.source}</p>
      </a>
    </li>
  );
}

export default NewsCard;
