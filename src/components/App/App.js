import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useMatch } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import About from "../About/About";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getNewsApi } from "../../utils/newsApi";
import { APIkey } from "../../utils/constants";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import MenuModal from "../MenuModal/MenuModal";
import RegisterConfirmationModal from "../RegisterConfirmationModal/RegisterConfirmationModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [loading, setLoading] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [articles, setArticles] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const match = useMatch("/");

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };
  const handleLoginModal = () => {
    setActiveModal("signin");
  };
  const handleMenuModal = () => {
    setActiveModal("menu");
  };
  const handleRegisterConfirmationModal = () => {
    setActiveModal("confirm");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  function handleAltClick() {
    if (activeModal === "signin") {
      handleCloseModal();
      handleRegisterModal();
    }
    if (activeModal === "signup") {
      handleRegisterConfirmationModal();
      handleCloseModal();
    }
    if (activeModal === "menu") {
      handleCloseModal();
      handleMenuModal();
    }
    if (activeModal === "confirm") {
      handleCloseModal();
      handleLoginModal();
    }
  }
  const handleSignUp = ({ email, password, name }) => {
    setLoading(true);
    handleRegisterConfirmationModal();
  };
  const handleSignIn = (values) => {
    setLoading(true);
    handleCloseModal();
    setIsLoggedIn(true);
  };
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setArticles(null);
    setIsSearching(false);
    navigate("/");
  };

  const handleSeeMoreArticles = () => {
    setNumberOfCards(numberOfCards + 3);
  };

  const searchBotton = (data) => {
    const keyword = data.charAt(0).toUpperCase() + data.slice(1);
    setNumberOfCards(3);
    setKeyword(keyword);
    setArticles(null);
    setLoading(true);
    setNothingFound(false);
    setIsSearching(true);
    getNewsApi({ APIkey, keyword })
      .then((data) => {
        setLoading(false);
        if (data.articles.length === 0) {
          setNothingFound(true);
        } else {
          const articles = data.articles.map(
            (article) => (article = { ...article, _id: Math.random() })
          );
          setArticles(articles);
          setIsSearching(false);
          // localStorage.setItem("articles", JSON.stringify(articles));
          // localStorage.setItem("keyword", keyword);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSearching(false);
      });
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <>
      <div className="page">
        <div className="page__main">
          <Header
            onRegisterButton={handleRegisterModal}
            onLoginButton={handleLoginModal}
            isLoggedIn={isLoggedIn}
            handleMenuModal={handleMenuModal}
            onSignout={handleSignOut}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Main
                  searchBotton={searchBotton}
                  isSearching={isSearching}
                  isLoading={loading}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <SavedNews
                  articles={articles}
                  isLoggedIn={isLoggedIn}
                  keyword={keyword}
                />
              }
            />
          </Routes>
        </div>
        {isSearching && (
          <Preloader isSearching={isSearching} nothingFound={nothingFound} />
        )}
        {articles && match && (
          <NewsCardList
            keyword={keyword}
            numberOfCards={numberOfCards}
            articles={articles}
            handleSeeMoreArticles={handleSeeMoreArticles}
            isLoggedIn={isLoggedIn}
          />
        )}
        {match && <About />}
        <Footer />
        {activeModal === "signup" && (
          <RegisterModal
            isOpen={handleRegisterModal}
            onClose={handleCloseModal}
            handleCloseModal={handleCloseModal}
            buttonText="Sign up"
            altButtonText="Sign in"
            altClick={handleAltClick}
            onSubmit={handleRegisterConfirmationModal}
            onSignUp={handleSignUp}
            loading={loading}
          />
        )}
        {activeModal === "signin" && (
          <LoginModal
            isOpen={handleLoginModal}
            onClose={handleCloseModal}
            onSignIn={handleSignIn}
            handleCloseModal={handleCloseModal}
            buttonText="Sign in"
            altButtonText="Sign up"
            altClick={handleAltClick}
            loading={loading}
          />
        )}
        {activeModal === "menu" && (
          <MenuModal
            isOpen={handleMenuModal}
            onClose={handleCloseModal}
            handleCloseModal={handleCloseModal}
            onLoginButton={handleLoginModal}
            altClick={handleAltClick}
          />
        )}
        {activeModal === "confirm" && (
          <RegisterConfirmationModal
            isOpen={handleRegisterConfirmationModal}
            onClose={handleCloseModal}
            handleCloseModal={handleCloseModal}
            onLoginButton={handleLoginModal}
          />
        )}
      </div>
    </>
  );
}

export default App;
