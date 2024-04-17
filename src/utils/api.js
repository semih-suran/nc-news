import axios from "axios";

const API_BASE_URL = "https://thenews-lhhv.onrender.com/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const fetchData = async (url, method = "GET", data = null) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = () => fetchData("users");

export const getAllArticles = () => fetchData("articles");

export const getArticlesById = (articleId) =>
  fetchData(`articles/${articleId}`);

export const getArticlesByTopic = (articleTopic) =>
  fetchData(`articles?topic=${articleTopic}`);

export const getAllComments = () => fetchData("comments");

export const getCommentsByArticleId = (articleId) =>
  fetchData(`articles/${articleId}/comments`);

export const updateArticleVotes = (articleId, voteValue) =>
  fetchData(`articles/${articleId}`, "PATCH", { inc_votes: voteValue });

export const postMyComment = (articleId, commentBody) =>
  fetchData(`articles/${articleId}/comments`, "POST", commentBody);

export const deleteCommentsById = (comment_id) =>
  fetchData(`comments/${comment_id}`, "DELETE");

export const makeUserDefault = (username) =>
  fetchData(`users/${username}/makeDefault`, "PATCH");
