import { baseUrl } from "./constants";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const saveArticle = (
  { keyword, title, text, date, source, link, image },
  token
) => {
  return request(`${baseUrl}/articles`, {
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
  });
};

export const getArticles = (token) => {
  return request(`${baseUrl}/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data;
  });
};

export const deleteArticle = (articleId, token) => {
  return request(`${baseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
