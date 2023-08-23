import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import "../NewsCardList/NewsCardList.css";
import "../NewsCard/NewsCard.css";
import "./SavedNews.css";

function SavedNews({
  isLoggedIn,
  keyword,
  savedNewsArticles,
  handleDeleteArticle,
}) {
  return (
    <section className="save-news">
      <SavedNewsHeader savedNewsArticles={savedNewsArticles} />
      <NewsCardList
        newsArticles={savedNewsArticles}
        isLoggedIn={isLoggedIn}
        handleDeleteArticle={handleDeleteArticle}
        keyword={keyword}
      />
    </section>
  );
}

export default SavedNews;
