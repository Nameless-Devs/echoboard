export const ENDPOINTS = {
  POST_ECHO: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes`,
  UPVOTE_POST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/upvote`,
  UPVOTE_COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/{commentId}/upvote`,
  ECHO: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}`,
  POST_COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/comments`,
  POST_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/solutions`,
  UPVOTE_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/upvote`,
  ECHOBOARD_BY_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/echoboard`,
  ECHOBOARD_BY_COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/{commentId}/echoboard`,
  USER: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/info`,
  USER_CHATROOMS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/chatrooms`,
  UPDATE_SOLUTION_STATUS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}?updateToStage={status}`,
  VOLUNTEER_FOR_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/volunteer`,
  SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}`,
  SOLUTION_EDIT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/edit`,
  CHAT_HISTORY: `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/{chatRoomId}`,
  LOGIN: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
  LOGOUT: `${process.env.NEXT_PUBLIC_BASE_URL}/logout`,
  DELETE_ECHOBOARD: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}`,
  UPDATE_ECHOBOARD: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/edit`,
};

export const WEBSOCKET = { 
  BASE_URL: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`,

}

export const YOUTUBE_LINK = "https://youtu.be/5ZnpfD93y64"; 

// example from Marcus
// if(process.env.NEXT_PUBLIC_FF_MY_FEATURE === "ON"){
// alert("WIP");
// } 