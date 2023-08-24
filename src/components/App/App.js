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
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import CurrentUserContext from "../../hooks/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfCards, setNumberOfCards] = useState(3);
  const [newsArticles, setNewsArticles] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [savedNewsArticles, setSavedNewsArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isCheckingToken, setIsCheckingToken] = useState(true);

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
      handleMenuModal();
      handleCloseModal();
    }
    if (activeModal === "confirm") {
      handleCloseModal();
      handleLoginModal();
    }
  }

  const handleSignUp = (inputValues) => {
    setIsLoading(true);
    auth
      .signUp(inputValues)
      .then(() => {
        handleRegisterConfirmationModal();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSignIn = (inputValues) => {
    setIsLoading(true);
    auth
      .signIn(inputValues)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          getUserArticles(data.token);
          return auth.checkToken(data.token);
        }
      })
      .then((res) => {
        const data = res.data;
        setCurrentUser(data);
        handleCloseModal();
        setIsLoggedIn(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleSignOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
    localStorage.clear();
  };

  const handleSaveArticle = (card) => {
    api
      .saveArticle(card, token)
      .then((data) => {
        setSavedNewsArticles([...savedNewsArticles, data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserArticles = (token) => {
    api
      .getArticles(token)
      .then((data) => {
        setSavedNewsArticles(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteArticle = (articleId) => {
    api
      .deleteArticle(articleId, token)
      .then(() => {
        const filteredCards = savedNewsArticles.filter(
          (article) => articleId !== article._id
        );
        setSavedNewsArticles(filteredCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSeeMoreArticles = () => {
    setNumberOfCards(numberOfCards + 3);
  };

  const searchBotton = (data) => {
    const keyword =
      data.charAt(0).toUpperCase() + data.replace(/ .*/, "").slice(1);
    setNumberOfCards(3);
    setKeyword(keyword);
    setIsLoading(true);
    setNothingFound(false);
    setIsSearching(true);
    getNewsApi({ APIkey, keyword })
      .then((data) => {
        setIsLoading(false);
        if (data.articles.length === 0) {
          setNothingFound(true);
        } else {
          setNewsArticles(data.articles);
          setIsSearching(false);
          localStorage.setItem("articles", JSON.stringify(data.articles));
          localStorage.setItem("keyword", keyword);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsCheckingToken(true);
      auth
        .checkToken(token)
        .then((res) => {
          setCurrentUser(res.data);
          setToken(token);
          getUserArticles(token);
          setIsLoggedIn(true);
          handleCloseModal();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
      getUserArticles(token);
    } else {
      setIsCheckingToken(false);
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("articles")) {
      setNewsArticles(JSON.parse(localStorage.getItem("articles")));
      setKeyword(localStorage.getItem("keyword"));
    }
  }, []);
  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={{ currentUser }}>
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
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/saved-news"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isCheckingToken={isCheckingToken}
                    setActiveModal={setActiveModal}
                  >
                    <SavedNews
                      savedNewsArticles={savedNewsArticles}
                      isLoggedIn={isLoggedIn}
                      handleDeleteArticle={handleDeleteArticle}
                      numberOfCards={numberOfCards}
                      handleSeeMoreArticles={handleSeeMoreArticles}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
          {isSearching && (
            <Preloader isSearching={isSearching} nothingFound={nothingFound} />
          )}
          {newsArticles && match && (
            <NewsCardList
              keyword={keyword}
              numberOfCards={numberOfCards}
              newsArticles={newsArticles}
              handleSeeMoreArticles={handleSeeMoreArticles}
              isLoggedIn={isLoggedIn}
              handleSaveArticle={handleSaveArticle}
              handleDeleteArticle={handleDeleteArticle}
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
              handleSignUp={handleSignUp}
              isLoading={isLoading}
            />
          )}
          {activeModal === "signin" && (
            <LoginModal
              isOpen={handleLoginModal}
              onClose={handleCloseModal}
              handleSignIn={handleSignIn}
              handleCloseModal={handleCloseModal}
              buttonText="Sign in"
              altButtonText="Sign up"
              altClick={handleAltClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === "menu" && (
            <MenuModal
              isOpen={handleMenuModal}
              onClose={handleCloseModal}
              handleCloseModal={handleCloseModal}
              onLoginButton={handleLoginModal}
              altClick={handleAltClick}
              onSignout={handleSignOut}
              isLoggedIn={isLoggedIn}
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
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
