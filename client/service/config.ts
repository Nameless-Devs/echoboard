//Development Base Url
const API_BASE_URL = "http://localhost:8080/api";

//Deployment Base Url
// const API_BASE_URL = "https://api.echoboard.site/api"

export const ENDPOINTS = {
  POST_ECHO: `${API_BASE_URL}/echoes`,
  UPVOTE_POST: `${API_BASE_URL}/echoes/{echoBoardId}/upvote`,
  UPVOTE_COMMENT: `${API_BASE_URL}/echoes/{echoBoardId}/comments/{commentId}/upvote`,
  ECHO: `${API_BASE_URL}/echoes/{echoBoardId}`,
  POST_COMMENT: `${API_BASE_URL}/echoes/{echoBoardId}/comments`,
  POST_SOLUTION: `${API_BASE_URL}/echoes/{echoBoardId}/solutions`,
  UPVOTE_SOLUTION: `${API_BASE_URL}/echoes/{echoBoardId}/solutions/{solutionId}/upvote`,
};
