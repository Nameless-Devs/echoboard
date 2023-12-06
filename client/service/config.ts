export const ENDPOINTS = {
  ECHOBOARD: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}`,
  ECHOBOARD_POST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes`,
  ECHOBOARD_UPVOTE: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/upvote`,
  ECHOBOARD_DELETE: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}`,
  ECHOBOARD_EDIT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/edit`,
  ECHOBOARD_BY_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/echoboard`,
  ECHOBOARD_BY_COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/{commentId}/echoboard`,

  COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/{commentId}`,
  COMMENT_UPVOTE: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/{commentId}/upvote`,
  COMMENT_POST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/comments`,

  SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}`,
  SOLUTION_EDIT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/edit`,
  SOLUTION_POST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/solutions`,
  SOLUTION_UPVOTE: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/upvote`,
  SOLUTION_UPDATE_STATUS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}?updateToStage={status}`,
  SOLUTION_VOLUNTEER: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/volunteer`,

  USER: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/info`,
  USER_CHATROOMS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/chatrooms`,
  CHAT_HISTORY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/{chatRoomId}`,

  LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`,
  LOGOUT: `${process.env.NEXT_PUBLIC_BASE_URL}/logout`,
};

export const WEBSOCKET = {
  BASE_URL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`,
};

export const YOUTUBE_LINK = "https://youtu.be/KNVRhe1BvEw";

// example from Marcus
// if(process.env.NEXT_PUBLIC_FF_MY_FEATURE === "ON"){
// alert("WIP");
// }
