import axios from "axios";

const API_BASE_URL = "https://thenews-lhhv.onrender.com/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllUsers = () => {
  return axios
    .get(`${API_BASE_URL}users`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllArticles = () => {
  return axios
    .get(`${API_BASE_URL}articles`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticlesById = (articleId) => {
  return axios
    .get(`${API_BASE_URL}articles/${articleId}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticlesByTopic = (articleTopic) => {
  return axiosInstance
    .get(`articles?topic=${articleTopic}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw new Error("Failed to get articles by Topic...");
    });
};

export const getAllComments = () => {
  return axios
    .get(`${API_BASE_URL}comments`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCommentsByArticleId = (articleId) => {
  return axios
    .get(`${API_BASE_URL}articles/${articleId}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const updateArticleVotes = (articleId, voteValue) => {
  return axios
    .patch(`${API_BASE_URL}articles/${articleId}`, {
      inc_votes: voteValue,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const postMyComment = (articleId, commentBody) => {
  return axios
    .post(`${API_BASE_URL}articles/${articleId}/comments`, commentBody)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteCommentsById = (comment_id) => {
  return axios
    .delete(`${API_BASE_URL}comments/${comment_id}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const makeUserDefault = (username) => {
  return axios
    .patch(`${API_BASE_URL}users/${username}/makeDefault`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};
