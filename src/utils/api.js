import axios from "axios";

export const getAllUsers = () => {
  return axios
    .get(`https://thenews-lhhv.onrender.com/api/users`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllArticles = () => {
  return axios
    .get(`https://thenews-lhhv.onrender.com/api/articles`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticlesById = (articleId) => {
  return axios
    .get(`https://thenews-lhhv.onrender.com/api/articles/${articleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticlesByTopic = (articleTopic) => {
  return axios
    .get(`https://thenews-lhhv.onrender.com/api/articles/?${articleTopic}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllComments = () => {
  return axios
    .get(`https://thenews-lhhv.onrender.com/api/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCommentsByArticleId = (articleId) => {
  return axios
    .get(`https://thenews-lhhv.onrender.com/api/articles/${articleId}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
