import { baseUrl } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error${res.status}`);
}

export const saveArticle = (
  { keyword, title, text, date, source, link, image },
  token
) => {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
    }),
  }).then(checkResponse);
};

export const getArticles = (token) => {
  return fetch(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    });
};

export const deleteArticle = (articleId, token) => {
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
